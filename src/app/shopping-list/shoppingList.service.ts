import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingridientAdded = new Subject<Ingredient[]>();
  ingridientToEdit = new Subject<number>();
  private ingridiants: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ];

  getSingleIngridient(index: number) {
    return this.ingridiants[index];
  }

  editIngridient(index: number, newIngredient: Ingredient) {
    this.ingridiants[index] = newIngredient;
    this.ingridientAdded.next(this.ingridiants);
  }

  getIngridiant() {
    return this.ingridiants.slice();
  }

  addIngridient(ingridient: string, quantity: number) {
    this.ingridiants.push(new Ingredient(ingridient, quantity));
    this.ingridientAdded.next(this.ingridiants.slice());
  }

  deleteIngridient(index: number) {
    this.ingridiants.splice(index, 1);
    this.ingridientAdded.next(this.ingridiants.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingridiants = [...ingredients, ...this.ingridiants];
  }
}
