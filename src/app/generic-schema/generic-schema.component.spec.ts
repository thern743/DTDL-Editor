import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSchemaComponent } from './generic-schema.component';

describe('GenericSchemaComponent', () => {
  let component: GenericSchemaComponent;
  let fixture: ComponentFixture<GenericSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
