import { Component, Input, OnInit} from '@angular/core';
import { Recepie } from '../../recepie.model';
import { RecepieService } from '../../recepie.service';

@Component({
  selector: 'app-recepie-item',
  templateUrl: './recepie-item.component.html',
  styleUrls: ['./recepie-item.component.css']
})
export class RecepieItemComponent implements OnInit {
  @Input() index: number
  recepie: Recepie;
  constructor(private recepieService: RecepieService){}
  ngOnInit(): void {
    this.recepie = this.recepieService.getOne(this.index)
  }
}
