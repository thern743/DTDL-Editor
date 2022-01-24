import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSchemaComponent } from './object-schema.component';

describe('ObjectSchemaEditorComponent', () => {
  let component: ObjectSchemaComponent;
  let fixture: ComponentFixture<ObjectSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
