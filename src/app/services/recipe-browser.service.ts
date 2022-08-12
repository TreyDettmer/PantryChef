import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { PantryItem } from '../interfaces/pantry-item';
import { PantryService } from './pantry.service';

export interface RecipeRequestConfig {
  offset: number;
  number: number;
  results: any;
  totalResults: any;
}

@Injectable()
export class RecipeBrowserService {

  constructor(private http: HttpClient, private pantryService : PantryService) {
    this.getPantryItems();
  }

  pantryItems : PantryItem[] = [];
  pantryItemsString : string = "";
  shouldMock : boolean = false;
  isLoadingRecipeInfo : boolean = false;
  getRecipeItems()
  {
    this.getPantryItems();
    let apiKey = "972e5287782548ef9cdfc9235af702f4";
    let URL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=$${this.pantryItemsString}&number=15`
    return this.http.get(URL,{observe: 'response'}).pipe(
      timeout(4000),
      catchError(e => {
        console.log("TOOK TOO LONG")
        // do something on a timeout
        return of(void 0);
      })
    );
  }

  getSingleRecipeIngredients(recipeId : string | number)
  {

    this.isLoadingRecipeInfo = true;
    let apiKey = "972e5287782548ef9cdfc9235af702f4";
    let URL = `https://api.spoonacular.com/recipes/${recipeId.toString()}/information?apiKey=${apiKey}`;
    return this.http.get(URL,{observe: 'response'}).pipe(
      timeout(4000),
      catchError(e => {
        console.log("TOOK TOO LONG")
        // do something on a timeout
        return of(void 0);
      })
    );
  }

  getMultipleRecipeIngredients(recipeIds : string[])
  {
    let recipeIdString = recipeIds.join(",");
    console.log(recipeIdString);

    let apiKey = "972e5287782548ef9cdfc9235af702f4";
    let URL = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=$${recipeIdString}`;
    return this.http.get(URL,{observe: 'response'}).pipe(
      timeout(4000),
      catchError(e => {
        console.log("TOOK TOO LONG")
        // do something on a timeout
        return of(void 0);
      })
    );
  }


  mockGetRecipeItems() 
  {
    return of("Hello World!").pipe(delay(2000));
  }

  getPantryItems()
  {
    this.pantryService.getPantryItems().subscribe(pantryItems => {
      this.pantryItems = pantryItems;
      this.generatePantryItemsString();
    });
  }

  generatePantryItemsString() 
  {
    this.pantryItemsString = "";
    for (let i = 0; i < this.pantryItems.length; i++)
    {
      if (i != this.pantryItems.length - 1)
      {
        this.pantryItemsString += this.pantryItems[i].name.toLocaleLowerCase() + ',+';
      }
      else
      {
        this.pantryItemsString += this.pantryItems[i].name.toLocaleLowerCase() + ',+';
      }
    }
  }
}
