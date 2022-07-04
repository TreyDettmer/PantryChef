import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryItemAdderComponent } from './pantry-item-adder.component';

describe('PantryItemAdderComponent', () => {
  let component: PantryItemAdderComponent;
  let fixture: ComponentFixture<PantryItemAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantryItemAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantryItemAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
