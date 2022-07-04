import { Component, OnInit } from '@angular/core';
import { delay } from 'lodash';
import { MeasuringUnits } from 'src/app/interfaces/measuring-units';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { RecipeItem } from 'src/app/interfaces/recipe-item';
import { RecipeBrowserService, RecipeRequestConfig } from 'src/app/services/recipe-browser.service';

@Component({
  selector: 'app-recipe-browser',
  templateUrl: './recipe-browser.component.html',
  styleUrls: ['./recipe-browser.component.scss']
})
export class RecipeBrowserComponent implements OnInit {


  recipeItems : RecipeItem[];
  browserStatus : string = "none";

  sampleIngredients : PantryItem[] = [
    {name:"Apple",section:"Produce",expirationDate:new Date(2022,5,26),amount:2,unit:MeasuringUnits.Units},
    {name:"Banana", section: "Produce",expirationDate:new Date(2022,5,26),amount:2,unit:MeasuringUnits.Units},
    {name: "Cheese", section: "Dairy",expirationDate:new Date(2022,5,26), amount:0.5, unit: MeasuringUnits.Cup},
    {name: "Milk", section: "Dairy",expirationDate:new Date(2022,5,26),amount:3, unit: MeasuringUnits.Cup},
    {name: "Sour cream", section: "Dairy",expirationDate:new Date(2022,5,26), amount: 6, unit: MeasuringUnits.Oz},
    {name: "Pasta sauce", section: "Condiments",expirationDate:new Date(2022,5,26), amount: 36, unit: MeasuringUnits.Oz},
    {name: "Cereal", section: "Breakfast",expirationDate:new Date(2022,5,26), amount: 64, unit: MeasuringUnits.Oz},
    {name: "Oatmeal", section: "Breakfast",expirationDate:new Date(2022,5,26), amount: 3, unit: MeasuringUnits.Cup}
  ]

  constructor(private recipeBrowserService : RecipeBrowserService) {
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

  getFakeRecipeItems()
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


  getRecipeItems($event: MouseEvent) : void
  {
    this.browserStatus = "searching";
    ($event.target as HTMLButtonElement).disabled = true;
    this.recipeBrowserService.mockGetRecipeItems().subscribe((response : any)  => {
      if (typeof response === 'string')
      {
        this.recipeItems = [];       
        this.recipeItems.push(...this.getFakeRecipeItems());
        ($event.target as HTMLButtonElement).disabled = false;
        this.browserStatus = "none"
        return;
      }
      return;
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
        this.browserStatus = "none";
        ($event.target as HTMLButtonElement).disabled = false;
        for (let recipe of response.body as Array<any>)
        {
          console.log(recipe);
          this.recipeItems.push({
            name: recipe.title,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac diam fringilla ipsum malesuada vestibulum in sed ligula.",
            ingredients: this.sampleIngredients.slice(3,6),
            image: recipe.image
          })
        }
        //Object.keys(response.body as Object).forEach(key => console.log(key));
        
      }
    });
  }
  

}
