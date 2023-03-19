import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaSemanticTypeUnitComponent } from './schema-semantic-type-unit.component';

describe('SchemaSemanticTypeUnitComponent', () => {
  let component: SchemaSemanticTypeUnitComponent;
  let fixture: ComponentFixture<SchemaSemanticTypeUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaSemanticTypeUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaSemanticTypeUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
