import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recepie } from '../recepie-book/recepie.model';
import { inject } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Observable } from 'rxjs';
import { RecepieService } from '../recepie-book/recepie.service';

export const recepieResolverService: ResolveFn<Recepie[]> = function (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Recepie[] | Promise<Recepie[]> | Observable<Recepie[]> {
  return inject(RecepieService).getRecepie().length > 0
    ? inject(RecepieService).getRecepie()
    : inject(DataStorageService).getRecepies();
};
