import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryItemInfoDialogComponent } from './pantry-item-info-dialog.component';

describe('PantryItemInfoDialogComponent', () => {
  let component: PantryItemInfoDialogComponent;
  let fixture: ComponentFixture<PantryItemInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantryItemInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantryItemInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
