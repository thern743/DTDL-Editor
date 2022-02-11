import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericSchemaComponent } from '../generic-schema/generic-schema.component';
import { GenericSchemaCapbilityModel } from '../models/GenericSchemaCapbilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class GenericSchemaFormControl extends AbstractCapabilityFormControl<GenericSchemaCapbilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: GenericSchemaCapbilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
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
            // Generic specific
            schemaType: [this.model.schema]
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup, schemaName: string = "schema"): void {
        var schema = parentForm.get(schemaName)?.value as GenericSchemaCapbilityModel;

        this.dialog.open(GenericSchemaComponent, { 
            data: schema
        })
        .afterClosed()
        .subscribe((result: GenericSchemaCapbilityModel) => {
            if (result) {
                parentForm.get(schemaName)?.setValue(result);
            } 
        });
    }
}