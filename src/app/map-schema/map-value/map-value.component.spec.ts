import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapValueComponent } from './map-value.component';

describe('MapValueComponent', () => {
  let component: MapValueComponent;
  let fixture: ComponentFixture<MapValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
