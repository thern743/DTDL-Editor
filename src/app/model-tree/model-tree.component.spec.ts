import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTreeComponent } from './model-tree.component';

describe('ModelTreeComponent', () => {
  let component: ModelTreeComponent;
  let fixture: ComponentFixture<ModelTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
