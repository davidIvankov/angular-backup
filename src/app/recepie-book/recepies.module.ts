import { NgModule } from '@angular/core';
import { RecepieBookComponent } from './recepie-book.component';
import { RecepieListComponent } from './recepie-list/recepie-list.component';
import { RecepieItemComponent } from './recepie-list/recepie-item/recepie-item.component';
import { RecepieDetailComponent } from './recepie-detail/recepie-detail.component';
import { RecepieNotSelectedComponent } from './recepie-not-selected/recepie-not-selected.component';
import { RecepieEditComponent } from './recepie-edit/recepie-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecepiesRoutingModule } from './recepies-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecepieBookComponent,
    RecepieListComponent,
    RecepieItemComponent,
    RecepieDetailComponent,
    RecepieNotSelectedComponent,
    RecepieEditComponent,
  ],
  imports: [RecepiesRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [
    RecepieBookComponent,
    RecepieListComponent,
    RecepieItemComponent,
    RecepieDetailComponent,
    RecepieNotSelectedComponent,
    RecepieEditComponent,
  ],
})
export class RecepiesModule {}
