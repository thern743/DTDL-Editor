import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { UntypedFormControl } from '@angular/forms';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public telemetry!: TelemetryCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  public schemaFormControl?: AbstractCapabilityFormControl<AbstractSchemaModel>;
  public schemaDropDownControl: UntypedFormControl = new UntypedFormControl();
  public semanticTypeDropDownControl: UntypedFormControl = new UntypedFormControl();
  public dialog: MatDialog;

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.telemetry.subscribeModelToForm(this.telemetry.form);
    this.syncHeaderFields();
    this.setSchemaAndSemanticTypeDropDowns();
  }

  // TODO: Importing a Telemetry model does not allow editing the schema
  //       Because the models are deserialized directly, the factory methods are not called when importing
  //       a model and so the SchemaFormControl value isn't set for `openSchemaEditor()`.
  private setSchemaAndSemanticTypeDropDowns(): void {
    if (this.telemetry.model?.type instanceof Array && this.telemetry.model.type?.length > 1) {
      // Only set Semantic Type is it's an additional @type value
      let type = this.telemetry.model.type[1];
      this.semanticTypeDropDownControl?.setValue(type);
    }

    let schema = typeof this.telemetry.model?.schema === 'string' ? this.telemetry.model.schema : this.telemetry.model.schema?.type;
    if (!schema) return;
    this.schemaDropDownControl?.setValue(schema.toLocaleLowerCase());
  }

  public syncHeaderFields() {
    const id = this.telemetry.form.get("id");
    const name = this.telemetry.form.get("name");

    id?.valueChanges.subscribe(value => {
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });
  }
}