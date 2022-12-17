import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimitiveSchemaComponent } from './primitive-schema.component';

describe('GenericSchemaComponent', () => {
  let component: PrimitiveSchemaComponent;
  let fixture: ComponentFixture<PrimitiveSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimitiveSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimitiveSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
