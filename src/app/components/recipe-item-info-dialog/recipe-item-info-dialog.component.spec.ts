import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemInfoDialogComponent } from './recipe-item-info-dialog.component';

describe('RecipeItemInfoDialogComponent', () => {
  let component: RecipeItemInfoDialogComponent;
  let fixture: ComponentFixture<RecipeItemInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeItemInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
