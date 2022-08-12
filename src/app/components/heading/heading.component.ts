import { Component, Input, OnInit } from '@angular/core';
import { PantryService } from 'src/app/services/pantry.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  constructor(private pantryService : PantryService) { }

  @Input() heading : string = "";

  ngOnInit(): void {
  }

  clearPantry()
  {
    if (confirm("You are about to clear your pantry! Click cancel to abort this action"))
    {
      this.pantryService.clearPantry();
    }
  }

}
