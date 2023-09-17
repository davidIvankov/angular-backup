import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Recepie } from '../recepie.model';
import { RecepieService } from '../recepie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrls: ['./recepie-list.component.css'],
})
export class RecepieListComponent implements OnInit, OnDestroy {
  recepies: Recepie[];
  subscription: Subscription;

  constructor(
    private recepieService: RecepieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.recepieService.recepieArray.subscribe(
      (recepieList: Recepie[]) => {
        this.recepies = recepieList;
      }
    );

    this.recepies = this.recepieService.getRecepie();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNavigateToNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
