import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNavComponent } from './file-nav.component';

describe('FileNavComponent', () => {
  let component: FileNavComponent;
  let fixture: ComponentFixture<FileNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
