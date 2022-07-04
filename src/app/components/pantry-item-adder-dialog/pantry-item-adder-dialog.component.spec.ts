import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryItemAdderDialogComponent } from './pantry-item-adder-dialog.component';

describe('PantryItemAdderDialogComponent', () => {
  let component: PantryItemAdderDialogComponent;
  let fixture: ComponentFixture<PantryItemAdderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantryItemAdderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantryItemAdderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
