import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdNameHeaderComponent } from './id-name-header-component';

describe('IdNameHeaderComponent', () => {
  let component: IdNameHeaderComponent;
  let fixture: ComponentFixture<IdNameHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdNameHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdNameHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
