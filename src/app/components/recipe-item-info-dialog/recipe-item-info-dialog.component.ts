import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetUnit } from 'src/app/interfaces/measuring-units';
import { RecipeItem } from 'src/app/interfaces/recipe-item';
import { PantryService } from 'src/app/services/pantry.service';
import { RecipeBrowserService } from 'src/app/services/recipe-browser.service';
import { UnitConversionService } from 'src/app/services/unit-conversion.service';

@Component({
  selector: 'app-recipe-item-info-dialog',
  templateUrl: './recipe-item-info-dialog.component.html',
  styleUrls: ['./recipe-item-info-dialog.component.scss']
})
export class RecipeItemInfoDialogComponent implements OnInit {

  loadStatus : string = "loading";
  recipeData : any;
  missingIngredients : {ingredient: string, neededAmount: string, ownedAmount: string}[] = [];
  debugging : boolean = false;
  constructor(
    public dialogRef: MatDialogRef<RecipeItemInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recipeItem: RecipeItem,
    private formBuilder: FormBuilder,
    public recipeBrowserService : RecipeBrowserService,
    public pantryService : PantryService,
    public unitConversionService : UnitConversionService
  ) {
    
  }

  ngOnInit(): void {
    this.focusRecipe(this.recipeItem);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getFakeRecipeData()
  {
    return {
      "vegetarian": true,
      "vegan": false,
      "glutenFree": false,
      "dairyFree": false,
      "veryHealthy": false,
      "cheap": false,
      "veryPopular": false,
      "sustainable": false,
      "lowFodmap": false,
      "weightWatcherSmartPoints": 6,
      "gaps": "no",
      "preparationMinutes": -1,
      "cookingMinutes": -1,
      "aggregateLikes": 1,
      "healthScore": 7,
      "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      "license": "CC BY 3.0",
      "sourceName": "Foodista",
      "pricePerServing": 79.95,
      "extendedIngredients": [
          {
              "id": 9040,
              "aisle": "Produce",
              "image": "bananas.jpg",
              "consistency": "SOLID",
              "name": "bananas",
              "nameClean": "ripe banana",
              "original": "2 large Firm bananas, sliced",
              "originalName": "Firm bananas, sliced",
              "amount": 2,
              "unit": "large",
              "meta": [
                  "firm",
                  "sliced"
              ],
              "measures": {
                  "us": {
                      "amount": 2,
                      "unitShort": "large",
                      "unitLong": "larges"
                  },
                  "metric": {
                      "amount": 2,
                      "unitShort": "large",
                      "unitLong": "larges"
                  }
              }
          },
          {
              "id": 19206,
              "aisle": "Baking",
              "image": "vanilla-pudding.png",
              "consistency": "SOLID",
              "name": "instant vanilla pudding mix",
              "nameClean": "instant vanilla pudding mix",
              "original": "1 small Instant sugar-free vanilla pudding mix",
              "originalName": "Instant sugar-free vanilla pudding mix",
              "amount": 1,
              "unit": "small",
              "meta": [
                  "sugar-free"
              ],
              "measures": {
                  "us": {
                      "amount": 1,
                      "unitShort": "small",
                      "unitLong": "small"
                  },
                  "metric": {
                      "amount": 1,
                      "unitShort": "small",
                      "unitLong": "small"
                  }
              }
          },
          {
              "id": 10118617,
              "aisle": "Sweet Snacks",
              "image": "graham-crackers.jpg",
              "consistency": "SOLID",
              "name": "low fat graham crackers",
              "nameClean": "low fat graham crackers",
              "original": "12 Reduced-fat graham crackers",
              "originalName": "Reduced-fat graham crackers",
              "amount": 12,
              "unit": "",
              "meta": [
                  "reduced-fat"
              ],
              "measures": {
                  "us": {
                      "amount": 12,
                      "unitShort": "",
                      "unitLong": ""
                  },
                  "metric": {
                      "amount": 12,
                      "unitShort": "",
                      "unitLong": ""
                  }
              }
          },
          {
              "id": 1180,
              "aisle": "Milk, Eggs, Other Dairy",
              "image": "sour-cream.jpg",
              "consistency": "SOLID",
              "name": "nonfat sour cream",
              "nameClean": "nonfat sour cream",
              "original": "8 ounces Nonfat sour cream",
              "originalName": "Nonfat sour cream",
              "amount": 8,
              "unit": "ounces",
              "meta": [
                  "sour"
              ],
              "measures": {
                  "us": {
                      "amount": 8,
                      "unitShort": "oz",
                      "unitLong": "ounces"
                  },
                  "metric": {
                      "amount": 226.796,
                      "unitShort": "g",
                      "unitLong": "grams"
                  }
              }
          },
          {
              "id": 1085,
              "aisle": "Milk, Eggs, Other Dairy",
              "image": "milk.jpg",
              "consistency": "LIQUID",
              "name": "skim milk",
              "nameClean": "fat free milk",
              "original": "2 3/4 cups Cold skim milk",
              "originalName": "Cold skim milk",
              "amount": 2.75,
              "unit": "cups",
              "meta": [
                  "cold"
              ],
              "measures": {
                  "us": {
                      "amount": 2.75,
                      "unitShort": "cups",
                      "unitLong": "cups"
                  },
                  "metric": {
                      "amount": 650.617,
                      "unitShort": "ml",
                      "unitLong": "milliliters"
                  }
              }
          }
      ],
      "id": 634098,
      "title": "Banana Graham Dessert",
      "readyInMinutes": 45,
      "servings": 6,
      "sourceUrl": "http://www.foodista.com/recipe/LH7BZVY4/banana-graham-dessert",
      "openLicense": -1,
      "image": "https://spoonacular.com/recipeImages/634098-556x370.jpg",
      "imageType": "jpg",
      "summary": "The recipe Banana Graham Dessert could satisfy your Southern craving in about <b>45 minutes</b>. This recipe makes 6 servings with <b>210 calories</b>, <b>7g of protein</b>, and <b>2g of fat</b> each. For <b>79 cents per serving</b>, this recipe <b>covers 7%</b> of your daily requirements of vitamins and minerals. 1 person has tried and liked this recipe. A mixture of skim milk, instant vanilla pudding mix, graham crackers, and a handful of other ingredients are all it takes to make this recipe so scrumptious. It is a good option if you're following a <b>vegetarian</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 44%</b>. This score is pretty good. Try <a href=\"https://spoonacular.com/recipes/marshmallow-graham-dessert-389060\">Marshmallow Graham Dessert</a>, <a href=\"https://spoonacular.com/recipes/blueberry-graham-dessert-379830\">Blueberry Graham Dessert</a>, and <a href=\"https://spoonacular.com/recipes/apple-graham-dessert-367077\">Apple Graham Dessert</a> for similar recipes.",
      "cuisines": [
          "Southern"
      ],
      "dishTypes": [],
      "diets": [
          "lacto ovo vegetarian"
      ],
      "occasions": [],
      "winePairing": {
          "pairedWines": [
              "riesling",
              "sparkling wine",
              "zinfandel"
          ],
          "pairingText": "Southern on the menu? Try pairing with Riesling, Sparkling Wine, and Zinfandel. In general, there are a few rules that will help you pair wine with southern food. Food-friendly riesling or sparkling white wine will work with many fried foods, while zinfandel is great with barbecued fare. The Dr. H. Thanisch (Erben Müller-Burggraef) Berncasteler Doctor Riesling Kabinett with a 4 out of 5 star rating seems like a good match. It costs about 28 dollars per bottle.",
          "productMatches": [
              {
                  "id": 2051764,
                  "title": "Dr. H. Thanisch (Erben Müller-Burggraef) Berncasteler Doctor Riesling Kabinett",
                  "description": "The wine shows a pronounced bouquet of very ripe red and yellow fruits with exotic and slightly spicy notes with well-integrated acidity. The slatey minerality so typical of the Mosel adds further complexity.This wine matches delicate foods excellently. Try this wine with veal, shellfish, roasted poultry or fish.",
                  "price": "$27.99",
                  "imageUrl": "https://spoonacular.com/productImages/2051764-312x231.jpg",
                  "averageRating": 0.8,
                  "ratingCount": 5,
                  "score": 0.7375,
                  "link": "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fdr-h-thanisch-erben-muller-burggraef-berncasteler-doctor-riesling-kabinett-2016%2F355888"
              }
          ]
      },
      "instructions": "<ol><li>In a mixing bowl, beat pudding mix and milk on low speed for 2 minutes.</li><li>Fold in sour cream. Let stand for 5 minutes. In a 3-qt. bowl, layer a third of the gra ham crackers, bananas and pudding mix ture. Repeat layers twice.</li><li>Refrigerate.</li></ol>",
      "analyzedInstructions": [
          {
              "name": "",
              "steps": [
                  {
                      "number": 1,
                      "step": "In a mixing bowl, beat pudding mix and milk on low speed for 2 minutes.Fold in sour cream.",
                      "ingredients": [
                          {
                              "id": 10119206,
                              "name": "pudding mix",
                              "localizedName": "pudding mix",
                              "image": ""
                          },
                          {
                              "id": 1056,
                              "name": "sour cream",
                              "localizedName": "sour cream",
                              "image": "sour-cream.jpg"
                          },
                          {
                              "id": 1077,
                              "name": "milk",
                              "localizedName": "milk",
                              "image": "milk.png"
                          }
                      ],
                      "equipment": [
                          {
                              "id": 405907,
                              "name": "mixing bowl",
                              "localizedName": "mixing bowl",
                              "image": "mixing-bowl.jpg"
                          }
                      ],
                      "length": {
                          "number": 2,
                          "unit": "minutes"
                      }
                  },
                  {
                      "number": 2,
                      "step": "Let stand for 5 minutes. In a 3-qt. bowl, layer a third of the gra ham crackers, bananas and pudding mix ture. Repeat layers twice.Refrigerate.",
                      "ingredients": [
                          {
                              "id": 10119206,
                              "name": "pudding mix",
                              "localizedName": "pudding mix",
                              "image": ""
                          },
                          {
                              "id": 18621,
                              "name": "crackers",
                              "localizedName": "crackers",
                              "image": "crackers.jpg"
                          },
                          {
                              "id": 9040,
                              "name": "banana",
                              "localizedName": "banana",
                              "image": "bananas.jpg"
                          },
                          {
                              "id": 10151,
                              "name": "ham",
                              "localizedName": "ham",
                              "image": "ham-whole.jpg"
                          }
                      ],
                      "equipment": [
                          {
                              "id": 404783,
                              "name": "bowl",
                              "localizedName": "bowl",
                              "image": "bowl.jpg"
                          }
                      ],
                      "length": {
                          "number": 5,
                          "unit": "minutes"
                      }
                  }
              ]
          }
      ],
      "originalId": null,
      "spoonacularSourceUrl": "https://spoonacular.com/banana-graham-dessert-634098"
  };
  }

  focusRecipe(recipeItem : RecipeItem)
  {
    if (this.recipeBrowserService.isLoadingRecipeInfo == false)
    {
      this.loadStatus = "loading";
      if (this.debugging)
      {
        this.recipeData = this.getFakeRecipeData();
        this.HandleRecipeData();
        return;
      }
      this.recipeBrowserService.getSingleRecipeIngredients(recipeItem.id).subscribe((response : any) => {
        this.recipeBrowserService.isLoadingRecipeInfo = false;
        if (response)
        {
          
          if (response.status === 402)
          {
            console.error("Reached API Quota limit! response below")
            console.log(response);
            this.loadStatus = "error";
            return;
          }
          this.recipeData = response.body;
          this.HandleRecipeData();
          return;
        }

        
      })
    }





    // this.recipeBrowserService.getMultipleRecipeIngredients(ids).subscribe(response => {
    //   if (response)
    //   {
    //     if (response.status === 402)
    //     {
    //       console.error("Reached API Quota limit! response below")
    //       console.log(response);
    //       this.browserStatus = "error"; 
    //       return;
    //     }
    //     for (let recipe of response.body as Array<any>)
    //     {
    //       for (let extendedIngredient of recipe.extendedIngredients)
    //       {
    //         // check if we have this ingredient
    //         let ownedIngredient =  this.pantryService.getPantryItem(extendedIngredient.name);
    //         if (!ownedIngredient)
    //         {
    //           continue;
    //         }
    //         let amount : number = extendedIngredient.measures.us.amount;
    //         let unit : string = extendedIngredient.measures.us.unitShort;
    //         console.log(`Ingredient: ${ownedIngredient.name}, Amount: ${amount} ${unit}`);
    //         console.log(`Ingredient: ${ownedIngredient.name}, Amount: ${amount} ${GetUnit(unit).name}`);
    //       }
    //     }
        

    //   }
    // })
  }

  HandleRecipeData()
  {
    console.log(this.recipeData);
    let compatibleIngredients = [];
    let questionableIngredients = [];
    for (let extendedIngredient of this.recipeData.extendedIngredients)
    {
      // check if we have this ingredient
      let ownedIngredient =  this.pantryService.getPantryItem(extendedIngredient.name);
      if (!ownedIngredient)
      {
        continue;
      }
      let amount : number = extendedIngredient.measures.us.amount;
      let unit : string = extendedIngredient.measures.us.unitShort;
      //console.log(`Ingredient: ${ownedIngredient.name}, Amount: ${amount} ${unit}`);
      console.log(`Ingredient: ${ownedIngredient.name}, Amount: ${amount} ${GetUnit(unit).name}, OwnedAmount: ${ownedIngredient.amount} ${ownedIngredient.unit.name}`);

      let convertedUnits = this.unitConversionService.convertUnits(amount,GetUnit(unit),ownedIngredient.unit);
      if (convertedUnits == -1)
      {
        questionableIngredients.push({ingredient: `${ownedIngredient.name}`, neededAmount: `${amount}`, ownedAmount: `${ownedIngredient.amount}`})
        continue;
      }
      console.log(`Ingredient: ${ownedIngredient.name}, ConvertedAmount: ${convertedUnits}, OwnedAmount: ${ownedIngredient.amount} ${ownedIngredient.unit.name}`);
      if (ownedIngredient.amount - convertedUnits >= 0)
      {
        compatibleIngredients.push({ingredient: `${ownedIngredient.name}`, neededAmount: `${amount}`, ownedAmount: `${ownedIngredient.amount}`})
      }
      else
      {
        this.missingIngredients.push({ingredient: `${ownedIngredient.name}`, neededAmount: `${amount} ${ownedIngredient.unit.name}`, ownedAmount: `${ownedIngredient.amount} ${ownedIngredient.unit.name}`})
      }
    }
    console.log("Questionable: " +  questionableIngredients.toString());
    console.log("Compatible: " +  compatibleIngredients.toString());
    
    this.loadStatus = "loaded";
  }

  madeRecipe()
  {
    
  }
}
