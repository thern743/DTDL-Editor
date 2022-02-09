import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumValueComponent } from './enum-value.component';

describe('EnumValueComponent', () => {
  let component: EnumValueComponent;
  let fixture: ComponentFixture<EnumValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
