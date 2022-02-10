import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

export interface ISchemaEditor {
    dialog: MatDialog;
    openSchemaEditor(parentForm: FormGroup, schemaName: string): void;
}