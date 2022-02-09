import { FormBuilder, FormGroup } from "@angular/forms";
import { MapKey } from "../models/MapKey";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapKeyFormControl extends AbstractCapabilityFormControl<MapKey> {
    private _validationService: ValidationService;

    constructor(model: MapKey, formBuilder: FormBuilder, validationService: ValidationService,) {
        super(formBuilder);
        this._validationService = validationService;
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
}