import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumSchemaComponent } from './enum-schema.component';

describe('EnumSchemaComponent', () => {
  let component: EnumSchemaComponent;
  let fixture: ComponentFixture<EnumSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnumSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
