import { Component, Input, OnInit } from '@angular/core';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { MeasuringUnits } from 'src/app/interfaces/measuring-units';

@Component({
  selector: 'app-pantry-item',
  templateUrl: './pantry-item.component.html',
  styleUrls: ['./pantry-item.component.scss']
})
export class PantryItemComponent implements OnInit {

  constructor() { }
  

  @Input()
  pantryItem : PantryItem = {
    name : "temp",
    section : "none",
    amount : 1,
    unit : {amount : -1, name : "Units"}
  }

  unit : {amount : number, name : string} = {amount: -1, name: "Units"};
  daysRemaining : number = 1;
  ngOnInit(): void {
    this.unit = this.pantryItem.unit;
    
    if (this.pantryItem.expirationDate !== undefined)
    {
      const d = new Date();
      var Difference_In_Time = this.pantryItem.expirationDate.getTime() - d.getTime();
      //this.daysRemaining = 3;
      // To calculate the no. of days between two dates
      this.daysRemaining = Math.round(Difference_In_Time / (1000 * 3600 * 24));
      
    }
  }

}
