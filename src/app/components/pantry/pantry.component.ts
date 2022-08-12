import { Component, OnInit } from '@angular/core';
import { PantryService } from 'src/app/services/pantry.service';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { groupBy as _groupBy, Dictionary, flatMap as _flatMap } from 'lodash'
import { KeyValuePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PantryItemEditDialogComponent } from '../pantry-item-edit-dialog/pantry-item-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GetUnit, MeasuringUnits } from 'src/app/interfaces/measuring-units';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent implements OnInit {

  constructor(public dialog: MatDialog, private pantryService : PantryService) { }

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

  editPantryItem(_pantryItem : PantryItem) : void {
    let pantryItemOg = this.pantryService.getPantryItem(_pantryItem.name);
    if (pantryItemOg == null)
    {
      return;
    }
    let pantryItem : PantryItem = { ...pantryItemOg};
    const dialogRef = this.dialog.open(PantryItemEditDialogComponent, {
      width: '90%',
      data: pantryItem,
      panelClass: 'my-custom-dialog-class',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        pantryItem = {
          name : result.name,
          section : result.section,
          expirationDate : result.expirationDate,
          amount : result.amount,
          unit : GetUnit(result.units)
        }
        this.pantryService.editItem(pantryItemOg!,pantryItem).subscribe(pantryItems => {
          this.pantryItems = _groupBy(pantryItems, pantryItem => pantryItem.section);
        });  
      }
      else
      {
        this.pantryService.removeItem(pantryItemOg!).subscribe(pantryItems => {
          this.pantryItems = _groupBy(pantryItems, pantryItem => pantryItem.section);
        }); 
      }

    });
  }

  

}
