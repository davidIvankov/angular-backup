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
  private closeSub: Subscription = new Subscription();

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
    if (!this.authForm.valid) {
      return;
    }
    let authObs: Observable<AuthResponse>;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.isLoading = true;
    if (this.isSignupMode) {
      authObs = this.authService.signUp(email, password);
    } else {
      authObs = this.authService.login(email, password);
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recepie']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.createErrorComponent(errorMessage);
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }

  private createErrorComponent(message: string) {
    const alertElementRef = this.alertHost.viewContainerRef;
    alertElementRef.clear();
    const elementRef = alertElementRef.createComponent(AlertComponent);
    elementRef.instance.message = message;
    this.closeSub.add(
      elementRef.instance.closed.subscribe(() => {
        this.closeSub.unsubscribe();
        alertElementRef.clear();
      })
    );
  }

  ngOnDestroy(): void {
    this.closeSub.unsubscribe();
  }
}
