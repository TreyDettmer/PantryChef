import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PantryComponent } from './components/pantry/pantry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { PantryItemComponent } from './components/pantry-item/pantry-item.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PantryItemAdderComponent } from './components/pantry-item-adder/pantry-item-adder.component';
import { PantryItemAdderDialogComponent } from './components/pantry-item-adder-dialog/pantry-item-adder-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule, } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select';
import { HeadingComponent } from './components/heading/heading.component'
import { HttpClientModule } from '@angular/common/http';
import { RecipeBrowserComponent } from './components/recipe-browser/recipe-browser.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';


@NgModule({
  declarations: [
    AppComponent,
    PantryComponent,
    PantryItemComponent,
    CalendarComponent,
    NavbarComponent,
    PantryItemAdderComponent,
    PantryItemAdderDialogComponent,
    HeadingComponent,
    RecipeBrowserComponent,
    RecipeItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
