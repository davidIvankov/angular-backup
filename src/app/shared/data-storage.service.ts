import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecepieService } from '../recepie-book/recepie.service';
import { Recepie } from '../recepie-book/recepie.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recepieService: RecepieService,
    private authService: AuthService
  ) {}

  storeRecepies() {
    this.http
      .put(
        'https://ng-recepiebook-be593-default-rtdb.europe-west1.firebasedatabase.app/recepies.json',
        this.recepieService.getRecepie()
      )
      .subscribe((response) => console.log(response));
  }

  getRecepies() {
    return this.http
      .get<Recepie[]>(
        'https://ng-recepiebook-be593-default-rtdb.europe-west1.firebasedatabase.app/recepies.json'
      )
      .pipe(
        map((recepies) => {
          return recepies.map((recepie) => {
            return {
              ...recepie,
              ingridients: recepie.ingridients ? recepie.ingridients : [],
            };
          });
        }),
        tap((recepies) => this.recepieService.setRecepies(recepies))
      );
  }
}
