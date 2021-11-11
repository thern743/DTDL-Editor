import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSnackbarComponent } from './success-snackbar.component';

describe('SuccessSnackbarComponent', () => {
  let component: SuccessSnackbarComponent;
  let fixture: ComponentFixture<SuccessSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
