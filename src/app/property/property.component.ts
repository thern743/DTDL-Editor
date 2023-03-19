import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { UntypedFormControl } from '@angular/forms';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';

@Component({
  selector: 'property-definition',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public property!: PropertyCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractSchemaModel> | undefined;
  public schemaDropDownControl: UntypedFormControl = new UntypedFormControl();
  public semanticTypeDropDownControl: UntypedFormControl = new UntypedFormControl();
  public dialog: MatDialog;

  constructor(dialog: MatDialog) {
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.property.subscribeModelToForm(this.property.form);
    this.syncHeaderFields();
    this.setSchemaAndSemanticTypeDropDowns();
  }

  // TODO: Importing a Property model does not allow editing the schema
  //       Because the models are deserialized directly, the factory methods are not called when importing
  //       a model and so the SchemaFormControl value isn't set for `openSchemaEditor()`.
  private setSchemaAndSemanticTypeDropDowns(): void {
    if (this.property.model?.type instanceof Array && this.property.model.type?.length > 1) {
      // Only set Semantic Type is it's an additional @type value
      let type = this.property.model.type[1];
      this.semanticTypeDropDownControl?.setValue(type);
    }

    let schema = typeof this.property.model?.schema === 'string' ? this.property.model.schema : this.property.model.schema?.type;
    if (!schema) return;
    this.schemaDropDownControl?.setValue(schema.toLocaleLowerCase());
  }

  public syncHeaderFields() {
    const id = this.property.form.get("id");
    const name = this.property.form.get("name");

    id?.valueChanges.subscribe(value => {
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });
  }
}
