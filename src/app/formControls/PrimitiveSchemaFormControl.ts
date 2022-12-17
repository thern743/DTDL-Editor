import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PrimitiveSchemaCapabilityModel } from '../models/PrimitiveSchemaCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class PrimitiveSchemaFormControl extends AbstractCapabilityFormControl<PrimitiveSchemaCapabilityModel> {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: PrimitiveSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
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
            // Primitive specific
            schema: [this.model.schema]
        });

        return form;
    }
}