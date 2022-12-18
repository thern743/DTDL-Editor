import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArraySchemaCapabilityModel } from '../models/ArraySchemaCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class ArraySchemaFormControl extends AbstractCapabilityFormControl<ArraySchemaCapabilityModel> {
    private _validationService: ValidationService;
    public dialog: MatDialog;
    
    constructor(model: ArraySchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.mapModelSubProperties(model);
        this.model = model; 
        this.form = this.toFormGroup();          
    }

    private mapModelSubProperties(arrayModel: ArraySchemaCapabilityModel): void {  
      // NOOP
    }

    public toFormGroup(): FormGroup { 
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.validDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // Array specific
            elementSchema: [this.model.elementSchema]
        });

        return form;
    }
}