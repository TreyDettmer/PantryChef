import { Component, OnInit } from '@angular/core';
import { PantryService } from 'src/app/services/pantry.service';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { groupBy as _groupBy, Dictionary, flatMap as _flatMap } from 'lodash'
import { KeyValuePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent implements OnInit {

  constructor(private pantryService : PantryService) { }

  pantryItems : Dictionary<PantryItem[]> = {};
  ngOnInit(): void {
    this.pantryService.getPantryItems().subscribe(pantryItems => {
      this.pantryItems = _groupBy(pantryItems, pantryItem => pantryItem.section);
    });
  }

  addPantryItem(pantryItem : PantryItem) : void
  {

    this.pantryService.addItem(pantryItem).subscribe(pantryItem => {
      let temp = _flatMap(this.pantryItems);
      temp.push(pantryItem);
      this.pantryItems = _groupBy(temp, pantryItem => pantryItem.section);

    });
  }

  drop(event: CdkDragDrop<any>,section : any) {
    moveItemInArray(this.pantryItems[section.key], event.previousIndex, event.currentIndex);    
  }

  

}
