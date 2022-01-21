import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSchemaEditorComponent } from './object-schema-editor.component';

describe('ObjectSchemaEditorComponent', () => {
  let component: ObjectSchemaEditorComponent;
  let fixture: ComponentFixture<ObjectSchemaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectSchemaEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectSchemaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
