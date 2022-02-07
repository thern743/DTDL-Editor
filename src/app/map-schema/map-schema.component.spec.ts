import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSchemaComponent } from './map-schema.component';

describe('MapSchemaComponent', () => {
  let component: MapSchemaComponent;
  let fixture: ComponentFixture<MapSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
