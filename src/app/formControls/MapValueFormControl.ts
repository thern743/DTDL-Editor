import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapValueFormControl extends AbstractCapabilityFormControl<MapValueCapabilityModel<AbstractSchemaModel>> {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: MapValueCapabilityModel<AbstractSchemaModel>, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.mapModelSubProperties(model);
        this.model = model;
        this.form = this.toFormGroup();
    }

    private mapModelSubProperties(model: MapValueCapabilityModel<AbstractSchemaModel>): void {
      // NOOP
    } 

    public toFormGroup(): FormGroup {
        let form =  this.formBuilder.group({
            id: [this.model.id, [this._validationService.validDtmi()]],
            displayName: [this.model.displayName], 
            comment: [this.model.comment],
            description: [this.model.description],
            // MapValue specific
            name: [this.model.name],
            schema: [this.model.schema]
        });

        return form;
    }
}