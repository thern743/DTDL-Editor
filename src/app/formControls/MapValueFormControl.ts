import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { MapValueCapabilityModel } from "../models/MapValueCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapValueFormControl extends AbstractCapabilityFormControl<MapValueCapabilityModel<AbstractCapabilityModel>> {
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
}