import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ObjectSchemaModel } from '../models/ObjectSchemaModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class ObjectSchemaFormControl extends AbstractCapabilityFormControl<ObjectSchemaModel>{
    private _validationService: ValidationService;
    public formBuilder: FormBuilder; 
    public fields: ObjectSchemaFormControl[];
    public model: ObjectSchemaModel;
    public form!: FormGroup;

    constructor(model: ObjectSchemaModel, formBuilder: FormBuilder, validationService: ValidationService) {
        super(formBuilder);
        this.formBuilder = formBuilder; 
        this.fields = new Array<ObjectSchemaFormControl>();
        this.model = model; 
        this.form = this.toFormGroup();
        this._validationService = validationService;   
    }

    public toFormGroup() : FormGroup { 
        this.form =  this.formBuilder.group({
            id: [this.model.id],
            description: [this.model.description],
            displayName: [this.model.displayName], 
            comment: [this.model.comment], 
            schema: [this.model.schema], 
            fields: this.formBuilder.array([...this.model.fields])
        });
        return this.form
    }
}