import { FormBuilder, FormGroup } from "@angular/forms";
import { MapValue } from "../models/MapValue";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";

export class MapValueFormControl extends AbstractCapabilityFormControl<MapValue> {
    private _validationService: ValidationService;;

    constructor(model: MapValue, formBuilder: FormBuilder, validationService: ValidationService,) {
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
            // MapValue specific
            name: [this.model.name],
            schema: [this.model.schema]
        });

        return form;
    }
}