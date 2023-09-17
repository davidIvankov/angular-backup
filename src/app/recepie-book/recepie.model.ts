import { Ingredient } from "../shared/ingredient.model";

export class Recepie {
    public ingridients: Ingredient[];
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name: string, description: string, imagePath: string, ingridients: Ingredient[]){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingridients = ingridients
    }
}