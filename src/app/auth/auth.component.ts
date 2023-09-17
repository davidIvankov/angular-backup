import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isSignupMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}
  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  onToggleSubmitButton() {
    this.isSignupMode = !this.isSignupMode;
  }

  onHandleError() {
    this.error = null;
  }
  onSubmit() {
    let authObs: Observable<AuthResponse>;
    if (!this.authForm.valid) {
      return;
    } else {
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;
      this.isLoading = true;
      this.isSignupMode
        ? (authObs = this.authService.signUp(email, password))
        : (authObs = this.authService.login(email, password));
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['recepie']);
      },
      (error) => {
        console.log(error);
        this.error = error;
        this.createErrorComponent(error);
        this.isLoading = false;
      }
    );
  }

  private createErrorComponent(message: string) {
    const alertElementRef = this.alertHost.viewContainerRef;
    alertElementRef.clear();
    const elementRef = alertElementRef.createComponent(AlertComponent);
    elementRef.instance.message = message;
    this.closeSub = elementRef.instance.closed.subscribe(() => {
      this.closeSub.unsubscribe();
      alertElementRef.clear();
    });
  }

  ngOnDestroy(): void {
    this.closeSub.unsubscribe();
  }
}
