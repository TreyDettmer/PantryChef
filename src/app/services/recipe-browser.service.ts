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
    this.getPantryItems()
  }

  pantryItems : PantryItem[] = [];
  pantryItemsString : string = "";
  getRecipeItems()
  {

    return this.mockGetRecipeItems();
    let apiKey = "972e5287782548ef9cdfc9235af702f4";
    let URL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=$${this.pantryItemsString}&number=4`
    let temp = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2"
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=pasta&maxFat=25&number=2`
    return this.http.get(URL,{observe: 'response'}).pipe(
      timeout(2000),
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
