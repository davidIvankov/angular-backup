import { RouterModule, Routes } from '@angular/router';
import { RecepieBookComponent } from './recepie-book/recepie-book.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecepieDetailComponent } from './recepie-book/recepie-detail/recepie-detail.component';
import { RecepieNotSelectedComponent } from './recepie-book/recepie-not-selected/recepie-not-selected.component';
import { RecepieEditComponent } from './recepie-book/recepie-edit/recepie-edit.component';
import { recepieResolverService } from './shared/recepies-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'recepie',
    component: RecepieBookComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecepieNotSelectedComponent },
      { path: 'new', component: RecepieEditComponent },
      {
        path: ':id',
        component: RecepieDetailComponent,
        resolve: [recepieResolverService],
      },
      {
        path: ':id/edit',
        component: RecepieEditComponent,
        resolve: [recepieResolverService],
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
