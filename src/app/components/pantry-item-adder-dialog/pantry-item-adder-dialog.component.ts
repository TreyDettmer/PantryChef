import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { PantrySections } from 'src/app/interfaces/pantry-sections';
import { MeasuringUnits } from 'src/app/interfaces/measuring-units';


@Component({
  selector: 'app-pantry-item-adder-dialog',
  templateUrl: './pantry-item-adder-dialog.component.html',
  styleUrls: ['./pantry-item-adder-dialog.component.scss']
})
export class PantryItemAdderDialogComponent implements OnInit {

  ngOnInit(): void {
  }

  pantryItemForm = this.formBuilder.group({
    name: ['',[Validators.required]],
    section: ['',[Validators.required]],
    expirationDate: ['',[Validators.required]],
    amount: ['',[Validators.required]],
    units: ['',[Validators.required]],
  });

  pantrySections : any = Object.keys(PantrySections);
  measuringUnits : any = MeasuringUnits;

  constructor(
    public dialogRef: MatDialogRef<PantryItemAdderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PantryItem,
    private formBuilder: FormBuilder,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() : void 
  {
    if (this.pantryItemForm.valid)
    {
      console.warn('Your order has been submitted', this.pantryItemForm.value);
      this.dialogRef.close(this.pantryItemForm.value);
    }
    else
    {
      console.log("invalid form")
    }

  }
}
