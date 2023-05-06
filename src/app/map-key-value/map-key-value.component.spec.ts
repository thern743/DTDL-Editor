import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapKeyValueComponent } from './map-key-value.component';

describe('MapKeyValueComponent', () => {
  let component: MapKeyValueComponent;
  let fixture: ComponentFixture<MapKeyValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapKeyValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapKeyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
