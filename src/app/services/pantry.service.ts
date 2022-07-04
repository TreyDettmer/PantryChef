import { Injectable } from '@angular/core';
import { PantryItem } from '../interfaces/pantry-item';
import { groupBy as _groupBy, Dictionary } from 'lodash';
import { of, Observable } from "rxjs"; 
import { MeasuringUnits } from '../interfaces/measuring-units';

@Injectable()

export class PantryService {

  pantryItems : PantryItem[] = [];

  constructor() {
  }

  intializePantryItems()
  {
    this.pantryItems.push(
      {name:"Apple",section:"Produce",expirationDate:new Date(2022,5,26),amount:2,unit:MeasuringUnits.Units},
      {name:"Banana", section: "Produce",expirationDate:new Date(2022,5,26),amount:2,unit:MeasuringUnits.Units},
      {name: "Cheese", section: "Dairy",expirationDate:new Date(2022,5,26), amount:0.5, unit: MeasuringUnits.Cup},
      {name: "Milk", section: "Dairy",expirationDate:new Date(2022,5,26),amount:3, unit: MeasuringUnits.Cup},
      {name: "Sour cream", section: "Dairy",expirationDate:new Date(2022,5,26), amount: 6, unit: MeasuringUnits.Oz},
      {name: "Pasta sauce", section: "Condiments",expirationDate:new Date(2022,5,26), amount: 36, unit: MeasuringUnits.Oz},
      {name: "Cereal", section: "Breakfast",expirationDate:new Date(2022,5,26), amount: 64, unit: MeasuringUnits.Oz},
      {name: "Oatmeal", section: "Breakfast",expirationDate:new Date(2022,5,26), amount: 3, unit: MeasuringUnits.Cup}
    )
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
    return of(pantryItem);
  }
}
