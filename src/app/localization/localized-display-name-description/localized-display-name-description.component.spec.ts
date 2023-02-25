import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizedDisplayNameDescriptionComponent } from './localized-display-name-description.component';

describe('LocalizedDisplayNameDescriptionComponent', () => {
  let component: LocalizedDisplayNameDescriptionComponent;
  let fixture: ComponentFixture<LocalizedDisplayNameDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizedDisplayNameDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizedDisplayNameDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
