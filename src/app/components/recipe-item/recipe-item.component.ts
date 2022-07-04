import { Component, Input, OnInit } from '@angular/core';
import { RecipeItem } from 'src/app/interfaces/recipe-item';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {


  @Input()
  recipeItem : RecipeItem = {
    name : "None",
  }

  ingredientsList : string = "";
  constructor() { }

  ngOnInit(): void {
    this.initializeIngredientsList();
  }

  initializeIngredientsList() : void 
  {
    if (this.recipeItem.ingredients)
    {
      for (let pantryItem of this.recipeItem.ingredients)
      {
        this.ingredientsList += pantryItem.name + ", ";
      }
    }
  }

}
