import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit, OnDestroy {
  @Input() public formIndex!: [number, number];
  @Input() public telemetry!: TelemetryCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  public dialog: MatDialog;

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.telemetry.subscribeModelToForm(this.telemetry.form);
    this.syncHeaderFields();
  }

  public ngOnDestroy(): void {
    this.telemetry.unsubscribeModelFromForm();
  }

  public syncHeaderFields() {
    const id = this.telemetry.form.get("@id");
    const name = this.telemetry.form.get("name");

    id?.valueChanges.subscribe(value => {
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });
  }
}