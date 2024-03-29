import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryItemComponent } from './pantry-item.component';

describe('PantryItemComponent', () => {
  let component: PantryItemComponent;
  let fixture: ComponentFixture<PantryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
