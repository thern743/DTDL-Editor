import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArraySchemaComponent } from './array-schema.component';

describe('ArraySchemaComponent', () => {
  let component: ArraySchemaComponent;
  let fixture: ComponentFixture<ArraySchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArraySchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArraySchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
