import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryItemEditDialogComponent } from './pantry-item-edit-dialog.component';

describe('PantryItemEditDialogComponent', () => {
  let component: PantryItemEditDialogComponent;
  let fixture: ComponentFixture<PantryItemEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantryItemEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantryItemEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
