import { Component } from '@angular/core';
import { PantryService } from './services/pantry.service';
import { RecipeBrowserService } from './services/recipe-browser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PantryService, RecipeBrowserService]
})
export class AppComponent {
  title = 'Cooking With The Mama';
}
