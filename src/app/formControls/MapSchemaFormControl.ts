import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MapSchemaComponent } from '../map-schema/map-schema.component';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { MapSchemaCapbilityModel } from '../models/MapSchemaCapbilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class MapSchemaFormControl extends AbstractCapabilityFormControl<MapSchemaCapbilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: MapSchemaCapbilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
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
            // Map specific
            mapKey: [this.model.mapKey],
            mapValue: [this.model.mapValue]
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup, schemaName: string = "schema"): void {
        var schema = parentForm.get(schemaName)?.value as MapSchemaCapbilityModel;
    
        this.dialog.open(MapSchemaComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: MapSchemaCapbilityModel) => {
          if (result) {
            parentForm.get(schemaName)?.setValue(result);
          } 
        });
    }
}