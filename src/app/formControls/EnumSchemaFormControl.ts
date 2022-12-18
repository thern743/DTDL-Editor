import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EnumSchemaCapabilityModel } from '../models/EnumSchemaCapabilityModel';
import { EnumValueCapabilityModel } from '../models/EnumValueCapabilityModel';
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

    constructor(model: EnumSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.mapModelSubProperties(model);        
        this.model = model; 
        this.form = this.toFormGroup();          
    }

    private mapModelSubProperties(enumModel: EnumSchemaCapabilityModel): void {  
      this.enumValues = new Array<EnumValueCapabilityFormControl>();

      enumModel.enumValues?.map((subModel: EnumValueCapabilityModel) => {
        this.enumValues.push(new EnumValueCapabilityFormControl(subModel, this.formBuilder, this._validationService, this.dialog));
      });
    }
    
    public toFormGroup(): FormGroup { 
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.validDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // Enum specific
            valueSchema: [this.model.valueSchema],
            enumValues: this.formBuilder.array(this.enumValues)            
        });

        return form;
    }
}