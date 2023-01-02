import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPayloadComponent } from './command-payload.component';

describe('CommandPayloadComponent', () => {
  let component: CommandPayloadComponent;
  let fixture: ComponentFixture<CommandPayloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandPayloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandPayloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
