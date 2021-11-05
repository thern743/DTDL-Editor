import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimativeSchemaComponent } from './primative-schema.component';

describe('PrimativeSchemaComponent', () => {
  let component: PrimativeSchemaComponent;
  let fixture: ComponentFixture<PrimativeSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimativeSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimativeSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
