import { Component, OnInit } from '@angular/core';
import { delay } from 'lodash';
import { GetUnit, MeasuringUnits } from 'src/app/interfaces/measuring-units';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { RecipeItem } from 'src/app/interfaces/recipe-item';
import { PantryService } from 'src/app/services/pantry.service';
import { RecipeBrowserService, RecipeRequestConfig } from 'src/app/services/recipe-browser.service';
import { UnitConversionService } from 'src/app/services/unit-conversion.service';

@Component({
  selector: 'app-recipe-browser',
  templateUrl: './recipe-browser.component.html',
  styleUrls: ['./recipe-browser.component.scss']
})
export class RecipeBrowserComponent implements OnInit {


  recipeItems : RecipeItem[];
  browserStatus : string = "none";
  isLoadingRecipeInfo : boolean = false;
  debugging : boolean = false;

  sampleIngredients : PantryItem[] = [
    {name:"Apple",section:"Produce",expirationDate:new Date(),amount:2,unit:GetUnit("Units")},
    {name:"Banana", section: "Produce",expirationDate:new Date(),amount:2,unit:GetUnit("Units")},
    {name: "Cheese", section: "Dairy",expirationDate:new Date(), amount:0.5, unit: GetUnit("Cups")},
    {name: "Milk", section: "Dairy",expirationDate:new Date(),amount:3, unit: GetUnit("Cups")},
    {name: "Sour cream", section: "Dairy",expirationDate:new Date(), amount: 6, unit: GetUnit("Oz")},
    {name: "Pasta sauce", section: "Condiments",expirationDate:new Date(), amount: 36, unit: GetUnit("Oz")},
    {name: "Cereal", section: "Breakfast",expirationDate:new Date(), amount: 64, unit: GetUnit("Oz")},
    {name: "Oatmeal", section: "Breakfast",expirationDate:new Date(), amount: 3, unit: GetUnit("Cups")}
  ]

  constructor(private recipeBrowserService : RecipeBrowserService, private pantryService : PantryService, private unitConversionService : UnitConversionService) {
    this.recipeItems = [
      // {
      //   name:"Pizza", 
      //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
      //   ingredients: this.sampleIngredients.slice(1,3),
      //   image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/ec/25/1a/awesome-plate-of-nachos.jpg"      
      // },
      // {
      //   name:"Fried Rice", 
      //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
      //   ingredients: this.sampleIngredients.slice(1,5),
      //   image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/ec/25/1a/awesome-plate-of-nachos.jpg"      
      // },
      // {
      //   name:"Chicken and Dumplings", 
      //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
      //   ingredients: this.sampleIngredients.slice(2,5),
      //   image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/ec/25/1a/awesome-plate-of-nachos.jpg"      
      // },
      // {
      //   name:"Salmon Dinner", 
      //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
      //   ingredients: this.sampleIngredients.slice(3,6),
      //   image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/ec/25/1a/awesome-plate-of-nachos.jpg"      
      // },

    ];
  }

  ngOnInit(): void {
  }

  getFakeRecipeItemss()
  {
    return [
      {
        name:"Pizza", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
        ingredients: this.sampleIngredients.slice(1,3),
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/ec/25/1a/awesome-plate-of-nachos.jpg"      
      },
      {
        name:"Fried Rice", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
        ingredients: this.sampleIngredients.slice(1,5),
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/ec/25/1a/awesome-plate-of-nachos.jpg"      
      },
      {
        name:"Chicken and Dumplings", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
        ingredients: this.sampleIngredients.slice(2,5),
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/ec/25/1a/awesome-plate-of-nachos.jpg"      
      },
      {
        name:"Salmon Dinner", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
        ingredients: this.sampleIngredients.slice(3,6),
        image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/ec/25/1a/awesome-plate-of-nachos.jpg"      
      },
    ]
  }


  getFakeResponseBody()
  {
    return [
      {
          "id": 638604,
          "title": "Chilled Swiss Oatmeal",
          "image": "https://spoonacular.com/recipeImages/638604-312x231.jpg",
          "imageType": "jpg",
          "usedIngredientCount": 4,
          "missedIngredientCount": 3,
          "missedIngredients": [
              {
                  "id": 1001119,
                  "amount": 6,
                  "unit": "oz",
                  "unitLong": "ounces",
                  "unitShort": "oz",
                  "aisle": "Milk, Eggs, Other Dairy",
                  "name": "vanilla yogurt",
                  "original": "6 oz low-fat vanilla yogurt (if using plain yogurt, add honey for sweetness)",
                  "originalName": "low-fat vanilla yogurt (if using plain yogurt, add honey for sweetness)",
                  "meta": [
                      "plain",
                      "low-fat",
                      "for sweetness",
                      "(if using yogurt, add honey )"
                  ],
                  "extendedName": "low fat plain vanilla yogurt",
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/vanilla-yogurt.png"
              },
              {
                  "id": 9078,
                  "amount": 2,
                  "unit": "tablespoon",
                  "unitLong": "tablespoons",
                  "unitShort": "Tbsp",
                  "aisle": "Produce",
                  "name": "cranberry",
                  "original": "2-3 tablespoon dried cranberry or raisins",
                  "originalName": "dried cranberry or raisins",
                  "meta": [
                      "dried"
                  ],
                  "extendedName": "dried cranberry",
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/cranberries.jpg"
              },
              {
                  "id": 12155,
                  "amount": 1,
                  "unit": "tablespoon",
                  "unitLong": "tablespoon",
                  "unitShort": "Tbsp",
                  "aisle": "Nuts;Baking",
                  "name": "walnuts",
                  "original": "1 tablespoon walnuts",
                  "originalName": "walnuts",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/walnuts.jpg"
              }
          ],
          "usedIngredients": [
              {
                  "id": 8121,
                  "amount": 0.5,
                  "unit": "cup",
                  "unitLong": "cups",
                  "unitShort": "cup",
                  "aisle": "Cereal",
                  "name": "old-fashioned oatmeal",
                  "original": "1/2 cup old-fashioned oatmeal (may use steel cut but not the instant kind)",
                  "originalName": "old-fashioned oatmeal (may use steel cut but not the instant kind)",
                  "meta": [
                      "instant",
                      "(may use steel cut but not the kind)"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/porridge-or-cream-of-wheat.png"
              },
              {
                  "id": 1077,
                  "amount": 0.33333334,
                  "unit": "cup",
                  "unitLong": "cups",
                  "unitShort": "cup",
                  "aisle": "Milk, Eggs, Other Dairy",
                  "name": "milk",
                  "original": "1/3 cup milk",
                  "originalName": "milk",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/milk.png"
              },
              {
                  "id": 9003,
                  "amount": 1,
                  "unit": "small",
                  "unitLong": "small",
                  "unitShort": "small",
                  "aisle": "Produce",
                  "name": "apple",
                  "original": "1 small apple, chopped",
                  "originalName": "apple, chopped",
                  "meta": [
                      "chopped"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
              },
              {
                  "id": 9040,
                  "amount": 1,
                  "unit": "small",
                  "unitLong": "small",
                  "unitShort": "small",
                  "aisle": "Produce",
                  "name": "banana",
                  "original": "1 small banana, chopped",
                  "originalName": "banana, chopped",
                  "meta": [
                      "chopped"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
              }
          ],
          "unusedIngredients": [
              {
                  "id": 1041009,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Cheese",
                  "name": "cheese",
                  "original": "cheese",
                  "originalName": "cheese",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
              },
              {
                  "id": 1056,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Milk, Eggs, Other Dairy",
                  "name": "cream",
                  "original": "sour cream",
                  "originalName": "sour cream",
                  "meta": [
                      "sour"
                  ],
                  "extendedName": "sour cream",
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/sour-cream.jpg"
              },
              {
                  "id": 10011549,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Pasta and Rice",
                  "name": "pasta sauce",
                  "original": "pasta sauce",
                  "originalName": "pasta sauce",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/tomato-sauce-or-pasta-sauce.jpg"
              },
              {
                  "id": 8029,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Cereal",
                  "name": "cereal",
                  "original": "cereal",
                  "originalName": "cereal",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/rice-crispy-cereal.png"
              }
          ],
          "likes": 7
      },
      {
          "id": 634098,
          "title": "Banana Graham Dessert",
          "image": "https://spoonacular.com/recipeImages/634098-312x231.jpg",
          "imageType": "jpg",
          "usedIngredientCount": 3,
          "missedIngredientCount": 2,
          "missedIngredients": [
              {
                  "id": 19206,
                  "amount": 1,
                  "unit": "small",
                  "unitLong": "small",
                  "unitShort": "small",
                  "aisle": "Baking",
                  "name": "instant vanilla pudding mix",
                  "original": "1 small Instant sugar-free vanilla pudding mix",
                  "originalName": "Instant sugar-free vanilla pudding mix",
                  "meta": [
                      "sugar-free"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/vanilla-pudding.png"
              },
              {
                  "id": 10118617,
                  "amount": 12,
                  "unit": "",
                  "unitLong": "",
                  "unitShort": "",
                  "aisle": "Sweet Snacks",
                  "name": "low fat graham crackers",
                  "original": "12 Reduced-fat graham crackers",
                  "originalName": "Reduced-fat graham crackers",
                  "meta": [
                      "reduced-fat"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/graham-crackers.jpg"
              }
          ],
          "usedIngredients": [
              {
                  "id": 9040,
                  "amount": 2,
                  "unit": "large",
                  "unitLong": "larges",
                  "unitShort": "large",
                  "aisle": "Produce",
                  "name": "bananas",
                  "original": "2 large Firm bananas, sliced",
                  "originalName": "Firm bananas, sliced",
                  "meta": [
                      "firm",
                      "sliced"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg"
              },
              {
                  "id": 1180,
                  "amount": 8,
                  "unit": "ounces",
                  "unitLong": "ounces",
                  "unitShort": "oz",
                  "aisle": "Milk, Eggs, Other Dairy",
                  "name": "nonfat sour cream",
                  "original": "8 ounces Nonfat sour cream",
                  "originalName": "Nonfat sour cream",
                  "meta": [
                      "sour"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/sour-cream.jpg"
              },
              {
                  "id": 1085,
                  "amount": 2.75,
                  "unit": "cups",
                  "unitLong": "cups",
                  "unitShort": "cup",
                  "aisle": "Milk, Eggs, Other Dairy",
                  "name": "skim milk",
                  "original": "2 3/4 cups Cold skim milk",
                  "originalName": "Cold skim milk",
                  "meta": [
                      "cold"
                  ],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/milk.jpg"
              }
          ],
          "unusedIngredients": [
              {
                  "id": 9003,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Produce",
                  "name": "$apple",
                  "original": "$apple",
                  "originalName": "$apple",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
              },
              {
                  "id": 1041009,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Cheese",
                  "name": "cheese",
                  "original": "cheese",
                  "originalName": "cheese",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
              },
              {
                  "id": 10011549,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Pasta and Rice",
                  "name": "pasta sauce",
                  "original": "pasta sauce",
                  "originalName": "pasta sauce",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/tomato-sauce-or-pasta-sauce.jpg"
              },
              {
                  "id": 8029,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Cereal",
                  "name": "cereal",
                  "original": "cereal",
                  "originalName": "cereal",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/rice-crispy-cereal.png"
              },
              {
                  "id": 8121,
                  "amount": 1,
                  "unit": "serving",
                  "unitLong": "serving",
                  "unitShort": "serving",
                  "aisle": "Cereal",
                  "name": "oatmeal",
                  "original": "oatmeal",
                  "originalName": "oatmeal",
                  "meta": [],
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/rolled-oats.jpg"
              }
          ],
          "likes": 1
      }
  ]
  }

  getFakeRecipeItems($event: MouseEvent) : void
  {
    let body = this.getFakeResponseBody();
    for (let recipe of body as Array<any>)
    {
      let missingIngredients : string[] = [];
      for (let i = 0; i < recipe.missedIngredients.length;i++)
      {
        missingIngredients.push(recipe.missedIngredients[i].name)
      }
      let ownedIngredients : PantryItem[] = [];
      for (let i = 0; i < recipe.usedIngredients.length; i++)
      {
        let ownedIngredient =  this.pantryService.getPantryItem(recipe.usedIngredients[i].name);
        if (ownedIngredient != null)
        {
          ownedIngredients.push(ownedIngredient as PantryItem);
        }
      }
      console.log(recipe);
      this.recipeItems.push({
        name: recipe.title,
        ownedIngredients: ownedIngredients,
        missingIngredients: missingIngredients,
        image: recipe.image,
        id: recipe.id
      })
    }
  }

  getRecipeItems($event: MouseEvent) : void
  {
    if (this.debugging)
    {
      this.getFakeRecipeItems($event);
      return;
    }

    this.browserStatus = "searching";
    ($event.target as HTMLButtonElement).disabled = true;
    this.recipeBrowserService.getRecipeItems().subscribe(response  => {
      
      if (response)
      {
        if (response.status === 402)
        {
          console.error("Reached API Quota limit! response below")
          console.log(response);
          this.browserStatus = "error";
          ($event.target as HTMLButtonElement).disabled = false;
          return;
        }
        ($event.target as HTMLButtonElement).disabled = false;
        console.log(response);
        let ids : string[] = [];
        for (let recipe of response.body as Array<any>)
        {
          let missingIngredients : string[] = [];
          for (let i = 0; i < recipe.missedIngredients.length;i++)
          {
            missingIngredients.push(recipe.missedIngredients[i].name)
          }
          let ownedIngredients : PantryItem[] = [];
          for (let i = 0; i < recipe.usedIngredients.length; i++)
          {
            let ownedIngredient =  this.pantryService.getPantryItem(recipe.usedIngredients[i].name);
            if (ownedIngredient != null)
            {
              ownedIngredients.push(ownedIngredient as PantryItem);
            }
          }
          ids.push(`${recipe.id}`)
          console.log(recipe);
          this.recipeItems.push({
            name: recipe.title,
            ownedIngredients: ownedIngredients,
            missingIngredients: missingIngredients,
            image: recipe.image,
            id: recipe.id
          })
        }
        this.browserStatus = "none";
        
      }
    });
  }


  
  

}
