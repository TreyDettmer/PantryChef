import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PantryComponent } from './components/pantry/pantry.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RecipeBrowserComponent } from './components/recipe-browser/recipe-browser.component';

const routes: Routes = [
  { path: '', redirectTo: '/pantry', pathMatch: 'full' },
  { path: 'pantry', component: PantryComponent },
  { path: 'recipe-browser', component: RecipeBrowserComponent },
  { path: 'calendar', component: CalendarComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
