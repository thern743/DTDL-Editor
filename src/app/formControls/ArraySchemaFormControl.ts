import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArraySchemaCapabilityModel } from '../models/ArraySchemaCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

export class ArraySchemaFormControl extends AbstractCapabilityFormControl<ArraySchemaCapabilityModel> {
    private _validationService: ValidationService;
    public dialog: MatDialog;
    
    constructor(model: ArraySchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.model = model; 
        this.form = this.toFormGroup(model);          
    }

    public toFormGroup(model: ArraySchemaCapabilityModel): FormGroup { 
        let form =  this.formBuilder.group({
            id: [model.id, [this._validationService.validDtmi()]],
            displayName: [model.displayName], 
            comment: [model.comment],
            description: [model.description],
            // Array specific
            elementSchema: [model.elementSchema]
        });

        return form;
    }
}