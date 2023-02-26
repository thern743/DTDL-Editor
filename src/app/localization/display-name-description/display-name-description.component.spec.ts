import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNameDescriptionComponent } from './display-name-description.component';

describe('DisplayNameDescriptionComponent', () => {
  let component: DisplayNameDescriptionComponent;
  let fixture: ComponentFixture<DisplayNameDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayNameDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNameDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
