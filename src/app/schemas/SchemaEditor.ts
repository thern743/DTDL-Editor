import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { ISchemaEditor } from "../models/ISchemaEditor";

export class SchemaEditor implements ISchemaEditor {
  public dialog!: MatDialog;

  public openSchemaEditor(parentForm: FormGroup, schemaFormControl: AbstractCapabilityFormControl<AbstractCapabilityModel>): void {
    var schemaModel = schemaFormControl?.model;
    let componentType = schemaModel?.resolveSchemaComponentType();

    this.dialog
      .open(componentType, { data: schemaModel })
      .afterClosed()
      .subscribe((result: FormGroup) => {
        if (result) {
          parentForm?.setValue(result);
        }
      });
  }
}