import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeasuringUnits } from 'src/app/interfaces/measuring-units';
import { PantryItem } from 'src/app/interfaces/pantry-item';
import { PantrySections } from 'src/app/interfaces/pantry-sections';

@Component({
  selector: 'app-pantry-item-edit-dialog',
  templateUrl: './pantry-item-edit-dialog.component.html',
  styleUrls: ['./pantry-item-edit-dialog.component.scss']
})
export class PantryItemEditDialogComponent implements OnInit {

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
  measuringUnits = MeasuringUnits;
  selected : string = "";
  defaultUnit : string = "";
  constructor(
    public dialogRef: MatDialogRef<PantryItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PantryItem,
    private formBuilder: FormBuilder,
  ) {
    this.defaultUnit = data.unit.name;
    console.log(data.unit.name);
    this.pantryItemForm.controls['name'].setValue(data.name);
    this.pantryItemForm.controls['section'].setValue(data.section);
    this.pantryItemForm.controls['amount'].setValue(data.amount);
    this.pantryItemForm.controls['units'].setValue(this.defaultUnit);
    this.pantryItemForm.controls['expirationDate'].setValue(data.expirationDate);
    
  }

  getEnumKeyByEnumValue(myEnum: any, enumValue: number | undefined): string {
    if (enumValue == undefined)
    {
      return '';
    }
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : '';
  }

  

  onSubmit() : void 
  {
    if (this.pantryItemForm.valid)
    {
      this.dialogRef.close(this.pantryItemForm.value);
    }
    else
    {
      alert("Invalid info");
    }

  }

  onDelete() : void
  {
    this.dialogRef.close(null);
  }
}
