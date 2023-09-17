import { Component, OnInit } from '@angular/core';
import { Recepie } from '../recepie.model';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { RecepieService } from '../recepie.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-recepie-detail',
  templateUrl: './recepie-detail.component.html',
  styleUrls: ['./recepie-detail.component.css'],
})
export class RecepieDetailComponent implements OnInit {
  detailedRecepie: Recepie;
  index: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private recepieService: RecepieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onDelete() {
    this.recepieService.deleteRecepie(this.index);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddToList() {
    this.shoppingListService.addIngredients(this.detailedRecepie.ingridients);
  }
  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.index = value['id'] - 1;
      this.detailedRecepie = this.recepieService.getOne(value['id'] - 1);
    });
  }

  OnRedirectToUpdate() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
