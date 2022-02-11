import { FormBuilder, FormGroup } from '@angular/forms';
import { DateSchemaCapabilityModel } from '../models/DateSchemaCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class DateSchemaFormControl extends AbstractCapabilityFormControl<DateSchemaCapabilityModel>{
    private _validationService: ValidationService;

    constructor(model: DateSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService) {
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