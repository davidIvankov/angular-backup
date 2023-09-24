import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepieBookComponent } from './recepie-book.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecepieNotSelectedComponent } from './recepie-not-selected/recepie-not-selected.component';
import { RecepieEditComponent } from './recepie-edit/recepie-edit.component';
import { RecepieDetailComponent } from './recepie-detail/recepie-detail.component';
import { recepieResolverService } from '../shared/recepies-resolver.service';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepiesRoutingModule {}
