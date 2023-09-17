import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Header } from './Header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecepieBookComponent } from './recepie-book/recepie-book.component';
import { RecepieListComponent } from './recepie-book/recepie-list/recepie-list.component';
import { RecepieItemComponent } from './recepie-book/recepie-list/recepie-item/recepie-item.component';
import { RecepieDetailComponent } from './recepie-book/recepie-detail/recepie-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { RecepieNotSelectedComponent } from './recepie-book/recepie-not-selected/recepie-not-selected.component';
import { RecepieEditComponent } from './recepie-book/recepie-edit/recepie-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    Header,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecepieBookComponent,
    RecepieListComponent,
    RecepieItemComponent,
    RecepieDetailComponent,
    DropdownDirective,
    RecepieNotSelectedComponent,
    RecepieEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
