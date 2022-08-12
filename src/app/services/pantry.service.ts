import { Injectable } from '@angular/core';
import { PantryItem } from '../interfaces/pantry-item';
import { groupBy as _groupBy, Dictionary } from 'lodash';
import { of, Observable } from "rxjs"; 
import { GetUnit, MeasuringUnits } from '../interfaces/measuring-units';
import { UnitConversionService } from './unit-conversion.service';

@Injectable()

export class PantryService {

  pantryItems : PantryItem[] = [];

  constructor(private unitConversionService : UnitConversionService) {
  }

  intializePantryItems()
  {
    
    if (localStorage.getItem("pantryItems") !== null)
    {
      try {
        this.pantryItems = JSON.parse(localStorage.getItem("pantryItems") as string);
        this.fixLocallyStoredPantryItems();
      }
      catch {
        this.pantryItems = [];
      }
      
    }
    else
    {
      this.pantryItems = [];
      // this.pantryItems.push(
      //   {name:"Apple",section:"Produce",expirationDate:new Date(),amount:2,unit:GetUnit("Units")},
      //   {name:"Banana", section: "Produce",expirationDate:new Date(),amount:2,unit:GetUnit("Units")},
      //   {name: "Cheese", section: "Dairy",expirationDate:new Date(), amount:0.5, unit: GetUnit("Cups")},
      //   {name: "Milk", section: "Dairy",expirationDate:new Date(),amount:3, unit: GetUnit("Cups")},
      //   {name: "Sour cream", section: "Dairy",expirationDate:new Date(), amount: 6, unit: GetUnit("Oz")},
      //   {name: "Pasta sauce", section: "Condiments",expirationDate:new Date(), amount: 36, unit: GetUnit("Oz")},
      //   {name: "Cereal", section: "Breakfast",expirationDate:new Date(), amount: 64, unit: GetUnit("Oz")},
      //   {name: "Oatmeal", section: "Breakfast",expirationDate:new Date(), amount: 3, unit: GetUnit("Cups")}
      // )
    }
    localStorage.setItem("pantryItems",JSON.stringify(this.pantryItems));
  }

  fixLocallyStoredPantryItems()
  {
    for (let item of this.pantryItems)
    {
      item.expirationDate = new Date( JSON.parse(JSON.stringify(item.expirationDate)));
    }
  }
   
  getPantryItem(name : string) : PantryItem | null
  {
    for (let i = 0; i < this.pantryItems.length; i++)
    {
      if (name.toLowerCase().trim().includes(  this.pantryItems[i].name.toLowerCase().trim()))
      {
        return this.pantryItems[i];
      }
    }
    return null;
  }

  getPantryItems() : Observable<PantryItem[]> 
  {
    if (this.pantryItems.length == 0)
    {
      this.intializePantryItems();
    }

    return  of(this.pantryItems);
  }

  addItem(pantryItem : PantryItem) : Observable<PantryItem>
  {
    this.pantryItems.push(pantryItem);
    localStorage.setItem("pantryItems",JSON.stringify(this.pantryItems)) 
    return of(pantryItem);
  }

  removeItem(pantryItem : PantryItem | null) : Observable<PantryItem[]>
  {
    if (pantryItem === null)
    {
      return of([]);
    }
    let index = this.pantryItems.indexOf(pantryItem);
    if (index >= 0)
    {
      this.pantryItems.splice(index,1);
    }
    localStorage.setItem("pantryItems",JSON.stringify(this.pantryItems)) 
    return of(this.pantryItems);
  }

  editItem(originalPantryItem : PantryItem, newPantryItem : PantryItem)  : Observable<PantryItem[]>
  {
    let index = this.pantryItems.indexOf(originalPantryItem);
    if (index >= 0)
    {
      this.pantryItems[index] = {...newPantryItem};
    }
    localStorage.setItem("pantryItems",JSON.stringify(this.pantryItems)) 
    return  of(this.pantryItems);
  }

  checkForValidIngredientAmounts(recipeIngredients : PantryItem[]) : boolean
  {
    for (let i = 0; i < recipeIngredients.length; i++)
    {
      let recipeIngredient = recipeIngredients[i];
      let pantryItem = this.getPantryItem(recipeIngredient.name);
      if (!pantryItem)
      {
        // unable to find item in pantry
        return false;
      }
      if (!recipeIngredient.unit || !pantryItem.unit)
      {
        // no unit for one of items
        return false;
      }
      if (recipeIngredient.unit.name == "Units" && pantryItem.unit.name != "Units")
      {
        // MeasuringUnits.Units can't be converted to another unit type
        return false;
      }
      let pantryToRecipeUnits = this.unitConversionService.convertUnits(pantryItem.amount!,pantryItem.unit,recipeIngredient.unit);
      if (recipeIngredient.amount! - pantryItem.amount! <= 0)
      {
        alert(`Issue with ingredient ${pantryItem.name}: 
          Amount required is ${recipeIngredient.amount} ${recipeIngredient.unit} 
          but you only have ${pantryItem.amount} ${pantryItem.unit}`);
        return false;
      }

      
    }
    return true;
  }

  clearPantry()
  {
    this.pantryItems = [];
    localStorage.removeItem("pantryItems");
    window.location.reload();
  }
}
