import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdNameHeaderComponentComponent } from './id-name-header-component.component';

describe('IdNameHeaderComponentComponent', () => {
  let component: IdNameHeaderComponentComponent;
  let fixture: ComponentFixture<IdNameHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdNameHeaderComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdNameHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
