import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArraySchemaComponent } from '../array-schema/array-schema.component';
import { ArraySchemaCapbilityModel } from '../models/ArraySchemaCapbilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class ArraySchemaFormControl extends AbstractCapabilityFormControl<ArraySchemaCapbilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: ArraySchemaCapbilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
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
            // Array specific
            elementSchema: [this.model.elementSchema]
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup): void {
        var schema = parentForm.get("elementSchema")?.value as ArraySchemaCapbilityModel;
    
        this.dialog.open(ArraySchemaComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: ArraySchemaCapbilityModel) => {
          if (result) {
            parentForm.get("elementSchema")?.setValue(result);
          } 
        });
    }
}