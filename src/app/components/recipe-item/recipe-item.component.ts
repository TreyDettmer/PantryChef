import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { RecipeItem } from 'src/app/interfaces/recipe-item';
import { PantryService } from 'src/app/services/pantry.service';
import { RecipeBrowserService } from 'src/app/services/recipe-browser.service';
import { UnitConversionService } from 'src/app/services/unit-conversion.service';
import { PantryItemInfoDialogComponent } from '../pantry-item-info-dialog/pantry-item-info-dialog.component';
import { RecipeItemInfoDialogComponent } from '../recipe-item-info-dialog/recipe-item-info-dialog.component';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {


  @Input()
  recipeItem : RecipeItem = {
    name : "None",
    id : '0'
  }

  ingredientsListString : string = "";
  ownedIngredientsList : PantryItem[] = [];
  constructor(public dialog: MatDialog, private pantryService : PantryService,
     private recipeBrowserService : RecipeBrowserService,
     private unitConversionService : UnitConversionService, 
     private viewContainerRef : ViewContainerRef) { }

  ngOnInit(): void {
    this.initializeIngredientsList();
  }

  initializeIngredientsList() : void 
  {
    if (this.recipeItem.ownedIngredients)
    {
      for (let i = 0; i < this.recipeItem.ownedIngredients.length; i++)
      {

        if (i == this.recipeItem.ownedIngredients.length - 1)
        {
          this.ingredientsListString += this.recipeItem.ownedIngredients[i].name;
        }
        else
        {
          this.ingredientsListString += this.recipeItem.ownedIngredients[i].name + ", ";
        }
      }
    }
  }

  openIngredientInfoDialog(ingredient : PantryItem)
  {
    this.dialog.open(PantryItemInfoDialogComponent, {
      width: '90%',
      data: ingredient,
      panelClass: 'my-custom-dialog-class',
    });
  }

  openRecipeInfoDialog()
  {
    let recipeItemInfoDialog = this.dialog.open(RecipeItemInfoDialogComponent, {
      width: '90%',
      data: this.recipeItem,
      panelClass: 'my-custom-dialog-class',
      viewContainerRef: this.viewContainerRef
    });
    // recipeItemInfoDialog.componentInstance.pantryService = this.pantryService;
    // recipeItemInfoDialog.componentInstance.recipeBrowserService = this.recipeBrowserService;
    // recipeItemInfoDialog.componentInstance.unitConversionService = this.unitConversionService;
    
  }

}
