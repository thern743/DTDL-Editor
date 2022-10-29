import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericSchemaComponent } from '../generic-schema/generic-schema.component';
import { BooleanSchemaCapabilityModel } from '../models/BooleanSchemaCapabilityModel';
import { GenericSchemaCapabilityModel } from '../models/GenericSchemaCapabilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class BooleanSchemaFormControl extends AbstractCapabilityFormControl<BooleanSchemaCapabilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: BooleanSchemaCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this.dialog = dialog;
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

    public openSchemaEditor(parentForm: FormGroup, schemaName: string = "schema"): void {
        var schema = parentForm.get(schemaName)?.value as GenericSchemaCapabilityModel;
        schema.schema = "Boolean";
    
        this.dialog.open(GenericSchemaComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: GenericSchemaCapabilityModel) => {
          if (result) {
            parentForm.get(schemaName)?.setValue(result);
          } 
        });
    }
}