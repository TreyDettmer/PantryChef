import { Component, OnInit } from '@angular/core';
import { groupBy as _groupBy, Dictionary, flatMap as _flatMap } from 'lodash';
import { Day } from 'src/app/interfaces/day';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { PantryService } from 'src/app/services/pantry.service';
import * as _ from "lodash";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {

  

  constructor(private pantryService : PantryService) { }

  days : Day[] = [];
  date : string = "";
  pantryItems : Dictionary<PantryItem[]> = {};
  firstDayBuffer : number = 0;
  lastDayBuffer : number = 0;
  currentDate : Date = new Date();
  itemsInFocus : PantryItem[] = []

  ngOnInit(): void {

    this.pantryService.getPantryItems().subscribe(pantryItems => {
      console.log(pantryItems);
      this.pantryItems = _groupBy(pantryItems, pantryItem => pantryItem.section);
      this.initializeCalendar();
    });
    
  }

  initializeCalendar()
  {
    this.days = [];
    this.getFirstOfMonth();  
    this.getLastDayBuffer();
    this.populateCalendar();
    this.linkItemsToDays();
  }

  getDaysInMonth() : number 
  { 
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate()
  }

  linkItemsToDays() : void 
  {
    _.forOwn(this.pantryItems, (sectionItems, sectionTitle) => {
      for (let itemIndex = 0; itemIndex < sectionItems.length; itemIndex++)
      {
        let item = sectionItems[itemIndex];
        if (item.expirationDate)
        {
          if (item.expirationDate.getMonth() == this.currentDate.getMonth())
          {
            let expirationDay = item.expirationDate.getDate();
            let dayInArray = this.days.find((day) => {
              return day.day === expirationDay;
            });
            if (!dayInArray)
            {
              continue;
            }
            dayInArray.items.push(item);
            


          }
        }
      }
     } );
  }

  /** populates calendar */
  populateCalendar() : void
  {
    for (let i = 0; i < 42; i++)
    {
      this.days.push({items:[]});
    }
    for (let i = this.firstDayBuffer; i-(this.firstDayBuffer-1) <= new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate(); i++)
    {
      this.days[i].day = i-(this.firstDayBuffer-1);
    }
  }

  /** returns day of week of first of month */
  getFirstOfMonth() : number 
  {
    let dt = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),1);
    this.firstDayBuffer = dt.getDay();
    return dt.getDay();
  }

  getLastDayBuffer()
  {
    this.lastDayBuffer = (this.firstDayBuffer + new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate()) % 7;
  }

  clickedOnDay(dayIndex : number) : void
  {
    if (this.days[dayIndex]?.items)
    {
      this.itemsInFocus = this.days[dayIndex]?.items!;
    }
    else
    {
      this.itemsInFocus = [];
    }
  }

  switchCurrentDate(forward : boolean)
  {
    const actualCurrentDate = new Date();
    if (forward == true)
    {
      if (this.currentDate.getMonth() == 0 && actualCurrentDate.getMonth() == 11)
      {
        return;
      }
      if ( this.currentDate.getMonth() - (actualCurrentDate.getMonth()) <= 0)
      {
        if (this.currentDate.getMonth() + 1 == 12)
        {
          this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
          this.currentDate.setMonth(0);
        }
        else
        {
          this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        }
        this.itemsInFocus = [];
        this.initializeCalendar();
        
      }
    }
    else
    {
      if (this.currentDate.getMonth() == 11 && actualCurrentDate.getMonth() == 0)
      {
        return;
      }
      if ( actualCurrentDate.getMonth() - this.currentDate.getMonth() <= 0)
      {
        if (this.currentDate.getMonth() - 1 == -1)
        {
          this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
          this.currentDate.setMonth(11);
        }
        else
        {
          this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        }
        this.itemsInFocus = [];
        this.initializeCalendar();
        
      }
    }

    
  }

}
