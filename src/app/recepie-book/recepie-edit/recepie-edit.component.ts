import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecepieService } from '../recepie.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recepie-edit',
  templateUrl: './recepie-edit.component.html',
  styleUrls: ['./recepie-edit.component.css'],
})
export class RecepieEditComponent implements OnInit {
  id: number;
  isEditMode: boolean = false;
  recepieForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recepieService: RecepieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.isEditMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.isEditMode);
    if (this.isEditMode) {
      this.recepieService.editRecepie(this.id, this.recepieForm.value);
    } else this.recepieService.addRecepie(this.recepieForm.value);
    this.onNavigateBack();
  }

  onDeleteIngridient(index: number) {
    (<FormArray>this.recepieForm.get('ingridients')).removeAt(index);
  }

  onNavigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addIngridientControl() {
    (<FormArray>this.recepieForm.get('ingridients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]+[0-9]*$/),
        ]),
      })
    );
  }

  get controls() {
    return (<FormArray>this.recepieForm.get('ingridients')).controls;
  }

  private initForm() {
    let recepieName = '';
    let recepieDescription = '';
    let imgPath = '';
    let ingridents = new FormArray([]);

    if (this.isEditMode) {
      const recepie = this.recepieService.getOne(this.id - 1);
      recepieName = recepie.name;
      recepieDescription = recepie.description;
      imgPath = recepie.imagePath;
      if (recepie.ingridients) {
        recepie.ingridients.forEach((ingridient: Ingredient) => {
          ingridents.push(
            new FormGroup({
              name: new FormControl(ingridient.name, Validators.required),
              amount: new FormControl(ingridient.amount, [
                Validators.required,
                Validators.pattern(/^[0-9]+[0-9]*$/),
              ]),
            })
          );
        });
      }
    }

    this.recepieForm = new FormGroup({
      name: new FormControl(recepieName, Validators.required),
      imagePath: new FormControl(imgPath, Validators.required),
      description: new FormControl(recepieDescription, Validators.required),
      ingridients: ingridents,
    });
  }
}
