import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { GenericSchemaComponent } from "../generic-schema/generic-schema.component";
import { EnumValueCapabilityModel } from "../models/EnumValueCapabilityModel";
import { GenericSchemaCapabilityModel } from "../models/GenericSchemaCapabilityModel";
import { ISchemaEditor } from "../models/ISchemaEditor";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class EnumValueCapabilityFormControl extends AbstractCapabilityFormControl<EnumValueCapabilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: EnumValueCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.model = model;
        this.form = this.toFormGroup();
    }

    public toFormGroup(): FormGroup {
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.ValidDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // Enum specific
            name: [this.model.name],
            enumValue: [this.model.enumValue]
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup, schemaName: string = "schema"): void {
        var schema = parentForm.get(schemaName)?.value as GenericSchemaCapabilityModel;
        schema.schema = "EnumValue";
    
        this.dialog.open(GenericSchemaComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: GenericSchemaCapabilityModel) => {
          if (result) {
            parentForm.get(schemaName)?.setValue(result);
          } 
        });
    }
}