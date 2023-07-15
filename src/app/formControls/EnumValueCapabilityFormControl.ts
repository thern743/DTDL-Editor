import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { EnumValueCapabilityModel } from "../models/EnumValueCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class EnumValueCapabilityFormControl extends AbstractCapabilityFormControl<EnumValueCapabilityModel> {
    private _validationService: ValidationService;
    public dialog: MatDialog;

    constructor(model: EnumValueCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this.dialog = dialog;
        this.model = model;
        this.form = this.toFormGroup(model);
    }

    public toFormGroup(model: EnumValueCapabilityModel): UntypedFormGroup {
        let form =  this.formBuilder.group({
            "@id": [model["@id"], [this._validationService.validDtmi()]],
            displayName: [model.displayName], 
            comment: [model.comment],
            description: [model.description],
            // Enum specific
            name: [model.name],
            enumValue: [model.enumValue]
        });

        return form;
    }
}