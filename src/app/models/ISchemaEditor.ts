import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "./AbstractCapabilityModel";

export interface ISchemaEditor {
    dialog: MatDialog;
    openSchemaEditor(parentForm: FormGroup, schemaFormControl: AbstractCapabilityFormControl<AbstractCapabilityModel>): void;
}