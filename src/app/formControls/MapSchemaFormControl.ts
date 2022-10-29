import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MapSchemaComponent } from '../map-schema/map-schema.component';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { ISchemaEditor } from '../models/ISchemaEditor';
import { MapSchemaCapabilityModel } from '../models/MapSchemaCapabilityModel';
import { ValidationService } from '../services/validation/validation-service.service';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { MapKeyFormControl } from './MapKeyFormControl';
import { MapValueFormControl } from './MapValueFormControl';

/**
 * Form control contains the mapping between the form and the backing model 
 */
export class MapSchemaFormControl extends AbstractCapabilityFormControl<MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;
    public mapKey!: MapKeyFormControl;
    public mapValue!: MapValueFormControl;

    constructor(model: MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.mapModelSubProperties(model);
        this.model = model;        
        this.form = this.toFormGroup();          
    }

    private mapModelSubProperties(model: MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>): void { 
      this.mapKey = new MapKeyFormControl(model.mapKey, this.formBuilder, this._validationService, this.dialog);        
      this.mapValue = new MapValueFormControl(model.mapValue, this.formBuilder, this._validationService, this.dialog);
    }    

    public toFormGroup(): FormGroup { 
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.ValidDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // Map specific
            mapKey: this.mapKey.form,
            mapValue: this.mapValue.form
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup, schemaName: string = "schema"): void {
        var schema = parentForm.get(schemaName)?.value as MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>;
    
        this.dialog.open(MapSchemaComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: MapSchemaCapabilityModel<AbstractCapabilityModel, AbstractCapabilityModel>) => {
          if (result) {
            parentForm.get(schemaName)?.setValue(result);
          } 
        });
    }
}