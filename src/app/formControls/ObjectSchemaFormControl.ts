import { FormBuilder, FormGroup } from '@angular/forms';
import { ObjectSchemaModel } from '../models/ObjectSchemaModel';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class ObjectSchemaFormControl {
    formBuilder: FormBuilder; 
    public fields: ObjectSchemaFormControl[];
    model: ObjectSchemaModel;
    form!: FormGroup;

    constructor(model: ObjectSchemaModel, formBuilder: FormBuilder) {
        this.formBuilder = formBuilder; 
        this.fields = new Array<ObjectSchemaFormControl>();
        this.model = model; 
        this.form = this.toFormGroup();
    }

    public toFormGroup() : FormGroup { 
        this.form =  this.formBuilder.group({
            id: [this.model.id],
            name: [this.model.name], 
            description: [this.model.description],
            displayName: [this.model.displayName], 
            comment: [this.model.comment], 
            schema: [this.model.schema], 
            fields: this.formBuilder.array(this.model.fields)
        });
        return this.form
    }
}