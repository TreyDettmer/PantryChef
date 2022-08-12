import { Component } from '@angular/core';
import { PantryService } from './services/pantry.service';
import { RecipeBrowserService } from './services/recipe-browser.service';
import { UnitConversionService } from './services/unit-conversion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PantryService, RecipeBrowserService, UnitConversionService]
})
export class AppComponent {
  title = 'PantryChef';
}
