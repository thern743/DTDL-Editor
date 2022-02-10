import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapKeyComponent } from "../map-schema/map-key/map-key.component";
import { ISchemaEditor } from "../models/ISchemaEditor";
import { MapKeyCapabilityModel } from "../models/MapKeyCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapKeyFormControl extends AbstractCapabilityFormControl<MapKeyCapabilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: MapKeyCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
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
            // MapKey specific
            name: [this.model.name],
            schema: [this.model.schema]
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup): void {
        var schema = parentForm.get("mapKey")?.value as MapKeyCapabilityModel;
    
        this.dialog.open(MapKeyComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: MapKeyCapabilityModel) => {
          if (result) {
            parentForm.get("mapKey")?.setValue(result);
          } 
        });
    }
}