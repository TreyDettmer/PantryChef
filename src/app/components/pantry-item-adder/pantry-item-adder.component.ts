import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { PantryItemAdderDialogComponent } from '../pantry-item-adder-dialog/pantry-item-adder-dialog.component';
import { PantryService } from 'src/app/services/pantry.service';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { GetUnit, MeasuringUnits } from 'src/app/interfaces/measuring-units';


@Component({
  selector: 'app-pantry-item-adder',
  templateUrl: './pantry-item-adder.component.html',
  styleUrls: ['./pantry-item-adder.component.scss']
})
export class PantryItemAdderComponent implements OnInit {
  
  constructor(public dialog: MatDialog, private pantryService : PantryService) { }

  @Input() addPantryItem!: (pantryItem : PantryItem) => void;

  ngOnInit(): void {
  }

  openDialog() : void {
    const dialogRef = this.dialog.open(PantryItemAdderDialogComponent, {
      width: '90%',
      data: {name: "Sugar", section: "baking"},
      panelClass: 'my-custom-dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        const pantryItem = {
          name: result.name,
          section: result.section,
          expirationDate: new Date(result.expirationDate),
          amount: result.amount,
          unit: GetUnit(result.units)
        }
        this.addPantryItem(pantryItem);
      }

    });
  }

}
