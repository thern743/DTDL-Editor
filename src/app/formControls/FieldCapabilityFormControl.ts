import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FieldCapabilityModel } from '../models/FieldCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class FieldCapabilityFormControl extends AbstractCapabilityFormControl<FieldCapabilityModel>{
    private _validationService: ValidationService;

    constructor(model: FieldCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService) {
        super(formBuilder);
        this.formBuilder = formBuilder; 
        this._validationService = validationService;
        this.model = model; 
        this.form = this.toFormGroup();          
    }

    public toFormGroup() : UntypedFormGroup { 
        let form =  this.formBuilder.group({
            "@id": [this.model["@id"], [this._validationService.validDtmi()]],
            displayName: [this.model.displayName],              
            comment: [this.model.comment],
            description: [this.model.description],
            // Field specific
            name: [this.model.name],
            schema: [this.model.schema]
        });

        return form;
    }
}