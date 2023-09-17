import { Recepie } from './recepie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecepieService {
  private recepies: Recepie[] = [];

  recepieArray = new Subject<Recepie[]>();
  getRecepie() {
    return this.recepies.slice();
  }

  setRecepies(recepies: Recepie[]) {
    this.recepies = recepies;
    this.recepieArray.next(this.recepies.slice());
  }

  addRecepie(newRecepie: Recepie) {
    this.recepies.push(newRecepie);
    this.recepieArray.next(this.recepies);
  }

  editRecepie(index: number, newRecepie: Recepie) {
    this.recepies[index - 1] = newRecepie;
    this.recepieArray.next(this.recepies);
  }

  deleteRecepie(index: number) {
    this.recepies.splice(index, 1);
    this.recepieArray.next(this.recepies);
  }
  getOne(id: number) {
    return this.recepies[id];
  }
}
