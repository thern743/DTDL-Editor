import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EnumSchemaComponent } from '../enum-schema/enum-schema.component';
import { EnumSchemaCapbilityModel } from '../models/EnumSchemaCapbilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class EnumSchemaFormControl extends AbstractCapabilityFormControl<EnumSchemaCapbilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: EnumSchemaCapbilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.model = model; 
        this.form = this.toFormGroup();          
    }

    public toFormGroup(): FormGroup { 
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.ValidDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // Enum specific
            enumValues: this.formBuilder.array([...this.model.enumValues]),
            valueSchema: [this.model.valueSchema]
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup): void {
        var schema = parentForm.get("schema")?.value as EnumSchemaCapbilityModel;
    
        this.dialog.open(EnumSchemaComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: EnumSchemaCapbilityModel) => {
          if (result) {
            parentForm.get("schema")?.setValue(result);
          } 
        });
    }
}