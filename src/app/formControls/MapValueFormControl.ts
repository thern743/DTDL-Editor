import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueComponent } from "../map-schema/map-value/map-value.component";
import { ISchemaEditor } from "../models/ISchemaEditor";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapValueFormControl extends AbstractCapabilityFormControl<MapValueCapabilityModel> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: MapValueCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
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
            // MapValue specific
            name: [this.model.name],
            schema: [this.model.schema]
        });

        return form;
    }

    public openSchemaEditor(parentForm: FormGroup): void {
        var schema = parentForm.get("mapValue")?.value as MapValueCapabilityModel;
    
        this.dialog.open(MapValueComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: MapValueCapabilityModel) => {
          if (result) {
            parentForm.get("mapValue")?.setValue(result);
          } 
        });
    }
}