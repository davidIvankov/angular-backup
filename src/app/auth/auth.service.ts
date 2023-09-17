import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
const apiKeys: string = 'AIzaSyDQugR_It24K5Gh5goyk0s5AB6tihNoc0M';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private logoutTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKeys}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((authRes) => this.handleAutentication(authRes))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKeys}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((authRes) => this.handleAutentication(authRes))
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    else {
      const oldUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._expirationDate)
      );
      if (oldUser.token) {
        this.user.next(oldUser);
        this.router.navigate(['/recepie']);
        this.autoLogout(
          new Date(userData._expirationDate).getTime() - new Date().getTime()
        );
      }
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/auth']);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  private handleAutentication(authData: AuthResponse) {
    const expirationDateMiliSecs = +authData.expiresIn * 1000;
    const userData = new User(
      authData.email,
      authData.localId,
      authData.idToken,
      new Date(
        new Date().getTime() + new Date(expirationDateMiliSecs).getTime()
      )
    );
    this.user.next(userData);
    this.autoLogout(expirationDateMiliSecs);
    console.log(userData);

    localStorage.setItem('userData', JSON.stringify(userData));
  }

  private autoLogout(reaminingTime: number) {
    console.log(reaminingTime);
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, reaminingTime);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email alredy exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(() => errorMessage);
  }
}
