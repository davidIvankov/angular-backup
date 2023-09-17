import { Component, Output, OnInit } from '@angular/core';

import { Recepie } from './recepie.model';
import { RecepieService } from './recepie.service';

@Component({
  selector: 'app-recepie-book',
  templateUrl: './recepie-book.component.html',
  styleUrls: ['./recepie-book.component.css'],
  providers: [],
})
export class RecepieBookComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
