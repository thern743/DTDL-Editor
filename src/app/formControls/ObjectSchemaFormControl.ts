import { FormBuilder, FormGroup } from '@angular/forms';
import { ObjectSchemaCapbilityModel } from '../models/ObjectSchemaCapbilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { FieldCapabilityFormControl } from './FieldCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class ObjectSchemaFormControl extends AbstractCapabilityFormControl<ObjectSchemaCapbilityModel>{
    private _validationService: ValidationService;
    public fields!: FieldCapabilityFormControl[];

    constructor(model: ObjectSchemaCapbilityModel, formBuilder: FormBuilder, validationService: ValidationService) {
        super(formBuilder);
        this._validationService = validationService;
        this.fields = new Array<FieldCapabilityFormControl>();
        this.model = model; 
        this.form = this.toFormGroup();          
    }

    public toFormGroup() : FormGroup { 
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.ValidDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // Object Schema Specific
            fields: this.formBuilder.array([])
        });

        return form;
    }
}