import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EnumValueCapabilityModel } from '../models/EnumValueCapabilityModel';
import { EnumSchemaCapabilityModel } from '../models/schemas/EnumSchemaCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { EnumValueCapabilityFormControl } from './EnumValueCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class EnumSchemaFormControl extends AbstractCapabilityFormControl<EnumSchemaCapabilityModel> {
    private _validationService: ValidationService;
    public dialog: MatDialog;
    public enumValues!: Array<EnumValueCapabilityFormControl>;

    constructor(model: EnumSchemaCapabilityModel, validationService: ValidationService, formBuilder: FormBuilder, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.model = model; 
        this.enumValues = this.mapModelSubProperties(model);        
        this.form = this.toFormGroup(model);          
    }

    private mapModelSubProperties(enumModel: EnumSchemaCapabilityModel): Array<EnumValueCapabilityFormControl> {  
      let enumValues = new Array<EnumValueCapabilityFormControl>();

      enumModel.enumValues?.map((subModel: EnumValueCapabilityModel) => {
        enumValues.push(new EnumValueCapabilityFormControl(subModel, this.formBuilder, this._validationService, this.dialog));
      });

      return enumValues;
    }
    
    public toFormGroup(model: EnumSchemaCapabilityModel): FormGroup { 
        let form =  this.formBuilder.group({
            id: [model.id, [this._validationService.validDtmi()]],
            displayName: [model.displayName], 
            comment: [model.comment],
            description: [model.description],
            // Enum specific
            valueSchema: [model.valueSchema],
            enumValues: this.formBuilder.array(this.enumValues)            
        });

        return form;
    }
}