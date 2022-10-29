import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapKeyComponent } from "../map-schema/map-key/map-key.component";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { ISchemaEditor } from "../models/ISchemaEditor";
import { MapKeyCapabilityModel } from "../models/MapKeyCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapKeyFormControl extends AbstractCapabilityFormControl<MapKeyCapabilityModel<AbstractCapabilityModel>> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: MapKeyCapabilityModel<AbstractCapabilityModel>, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.mapModelSubProperties(model);
        this.model = model;
        this.form = this.toFormGroup();
    }

    private mapModelSubProperties(model: MapKeyCapabilityModel<AbstractCapabilityModel>): void {
      // NOOP
    }

    public toFormGroup(): FormGroup {
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.ValidDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // MapKey specific
            name: [this.model.name],
            schema: [this.model.schema]
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup, schemaName: string = "mapKey"): void {
        var schema = parentForm.get(schemaName)?.value as MapKeyCapabilityModel<AbstractCapabilityModel>;
    
        this.dialog.open(MapKeyComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: MapKeyCapabilityModel<AbstractCapabilityModel>) => {
          if (result) {
            parentForm.get(schemaName)?.setValue(result);
          } 
        });
    }
}