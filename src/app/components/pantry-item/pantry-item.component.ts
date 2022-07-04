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
  measuringUnits = MeasuringUnits;

  @Input()
  pantryItem : PantryItem = {
    name : "temp",
    section : "none"
  }

  unit : string = "";
  daysRemaining : number = 1;
  ngOnInit(): void {
    this.unit = this.pantryItem?.unit ? MeasuringUnits[this.pantryItem?.unit] : "Units";// MeasuringUnits[this.pantryItem?.unit ? this.pantryItem?.unit : -1];
    if (this.pantryItem.expirationDate)
    {
      const d = new Date();
      var Difference_In_Time = this.pantryItem.expirationDate.getTime() - d.getTime();
  
      // To calculate the no. of days between two dates
      this.daysRemaining = Math.max(0,Math.round(Difference_In_Time / (1000 * 3600 * 24)));
      
    }
  }



}
