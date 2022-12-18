import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BooleanSchemaCapabilityModel } from '../models/BooleanSchemaCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class BooleanSchemaFormControl extends AbstractCapabilityFormControl<BooleanSchemaCapabilityModel> {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: BooleanSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this.dialog = dialog;
        this._validationService = validationService;
        this.model = model; 
        this.form = this.toFormGroup();          
    }

    public toFormGroup() : FormGroup { 
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.validDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description]
        });

        return form;
    }
}