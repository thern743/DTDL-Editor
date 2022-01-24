import { FormBuilder, FormGroup } from '@angular/forms';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ObjectSchemaCapbilityModel } from '../models/ObjectSchemaCapbilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { ICapabilityFormControl } from './ICapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class ObjectSchemaFormControl extends AbstractCapabilityFormControl<ObjectSchemaCapbilityModel>{
    private _validationService: ValidationService;
    public fields!: ICapabilityFormControl<ICapabilityModel>[];

    constructor(model: ObjectSchemaCapbilityModel, formBuilder: FormBuilder, validationService: ValidationService) {
        super(formBuilder);
        this._validationService = validationService;
        this.fields = new Array<ICapabilityFormControl<ICapabilityModel>>();
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