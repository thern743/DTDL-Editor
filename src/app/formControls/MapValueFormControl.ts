import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapValueFormControl extends AbstractCapabilityFormControl<MapValueCapabilityModel<AbstractSchemaModel>> {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: MapValueCapabilityModel<AbstractSchemaModel>, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.model = model;
        this.form = this.toFormGroup(model);
    }

    public toFormGroup(model: MapValueCapabilityModel<AbstractSchemaModel>): UntypedFormGroup {
        let form =  this.formBuilder.group({
            id: [model["@id"], [this._validationService.validDtmi()]],
            displayName: [model.displayName], 
            comment: [model.comment],
            description: [model.description],
            // MapValue specific
            name: [model.name],
            schema: [model.schema]
        });

        return form;
    }
}