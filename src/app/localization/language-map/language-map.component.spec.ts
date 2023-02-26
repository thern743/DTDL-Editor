import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageMapComponent } from './language-map.component';

describe('LanguageMapComponent', () => {
  let component: LanguageMapComponent;
  let fixture: ComponentFixture<LanguageMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
