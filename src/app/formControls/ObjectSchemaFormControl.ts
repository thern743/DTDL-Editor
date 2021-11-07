import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

    public subscribeModelToForm(): void {
        console.groupCollapsed("Creating Subscriptions");
  
        Object.keys(this.form.controls).forEach(key => {        
          console.debug(key);
  
          let control = this.form.controls[key];        
          
          if(!(control instanceof FormArray)) {          
            control.valueChanges.subscribe(
              (value) => {
                (<any>this.model)[key] = value;
            }, (error: Error) => {
                console.error("Error in subscription: %o", error);
            });
          }
        })
    };

    public toFormGroup() : FormGroup { 
        this.form =  this.formBuilder.group({
            id: [this.model.id],
            name: [this.model.name], 
            description: [this.model.description],
            displayName: [this.model.displayName], 
            comment: [this.model.comment], 
            schema: [this.model.schema], 
            fields: this.formBuilder.array([...this.model.fields])
        });
        return this.form
    }
}