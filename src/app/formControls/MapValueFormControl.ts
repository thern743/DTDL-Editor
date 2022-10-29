import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MapValueComponent } from "../map-schema/map-value/map-value.component";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { ISchemaEditor } from "../models/ISchemaEditor";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapValueFormControl extends AbstractCapabilityFormControl<MapValueCapabilityModel<AbstractCapabilityModel>> implements ISchemaEditor {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: MapValueCapabilityModel<AbstractCapabilityModel>, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.mapModelSubProperties(model);
        this.model = model;
        this.form = this.toFormGroup();
    }

    private mapModelSubProperties(model: MapValueCapabilityModel<AbstractCapabilityModel>): void {
      // NOOP
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

    public openSchemaEditor(parentForm: FormGroup, schemaName: string = "mapValue"): void {
        var schema = parentForm.get(schemaName)?.value as MapValueCapabilityModel<AbstractCapabilityModel>;
    
        this.dialog.open(MapValueComponent, { 
          data: schema
        })
        .afterClosed()
        .subscribe((result: MapValueCapabilityModel<AbstractCapabilityModel>) => {
          if (result) {
            parentForm.get(schemaName)?.setValue(result);
          } 
        });
    }
}