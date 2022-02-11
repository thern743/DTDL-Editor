import { FormBuilder, FormGroup } from '@angular/forms';
import { FloatSchemaCapabilityModel } from '../models/FloatSchemaCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class FloatSchemaFormControl extends AbstractCapabilityFormControl<FloatSchemaCapabilityModel>{
    private _validationService: ValidationService;

    constructor(model: FloatSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService) {
        super(formBuilder);
        this._validationService = validationService;
        this.model = model; 
        this.form = this.toFormGroup();          
    }

    public toFormGroup() : FormGroup { 
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.ValidDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description]
        });

        return form;
    }
}