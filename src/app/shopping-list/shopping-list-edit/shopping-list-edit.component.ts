import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') formContent: NgForm;
  subscription: Subscription;
  editedItemIndex: number;
  editedItem: Ingredient;
  isEditMode: boolean = false;

  constructor(private shoppingListService: ShoppingListService) {
    this.subscription = shoppingListService.ingridientToEdit.subscribe(
      (index: number) => {
        this.isEditMode = true;
        this.editedItemIndex = index;
        this.editedItem = shoppingListService.getSingleIngridient(index);
        this.formContent.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnInit(): void {}

  onAddToIngridients() {
    const newIngredient = new Ingredient(
      this.formContent.value.name,
      this.formContent.value.amount
    );
    if (this.isEditMode) {
      this.shoppingListService.editIngridient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngridient(
        this.formContent.value.name,
        this.formContent.value.amount
      );
    }
    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteIngridient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.formContent.reset();
    this.isEditMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
