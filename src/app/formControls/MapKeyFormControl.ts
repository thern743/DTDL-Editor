import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { MapKeyCapabilityModel } from "../models/MapKeyCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapKeyFormControl extends AbstractCapabilityFormControl<MapKeyCapabilityModel<AbstractSchemaModel>> {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: MapKeyCapabilityModel<AbstractSchemaModel>, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.model = model;
        this.form = this.toFormGroup(model);
    }

    public toFormGroup(model: MapKeyCapabilityModel<AbstractSchemaModel>): FormGroup {
        let form =  this.formBuilder.group({
            id: [model.id, [this._validationService.validDtmi()]],
            displayName: [model.displayName], 
            comment: [model.comment],
            description: [model.description],
            // MapKey specific
            name: [model.name],
            schema: [model.schema]
        });

        return form;
    }
}