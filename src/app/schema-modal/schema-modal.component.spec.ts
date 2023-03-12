import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaModalComponent } from './schema-modal.component';

describe('SchemaModalComponent', () => {
  let component: SchemaModalComponent;
  let fixture: ComponentFixture<SchemaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
