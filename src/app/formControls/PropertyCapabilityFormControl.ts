import { FormBuilder, FormGroup } from "@angular/forms";
import { PropertyCapabilityModel } from '../models/PropertyCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

export class PropertyCapabilityFormControl extends AbstractCapabilityFormControl<PropertyCapabilityModel> {
  private _validationService: ValidationService;
  
  constructor(model: PropertyCapabilityModel, validationService: ValidationService, formBuilder: FormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup();
  }

  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.validDtmi()]],
      type: [this.model.type],
      displayName: [this.model.displayName],
      comment: [this.model.comment],
      description: [this.model.description],
      // Property specific
      name: [this.model.name],
      schema: [],
      semanticType: [this.model.semanticType],
      unit: [this.model.unit],
      writable: [this.model.writable]
    });

    return form;
  }
}
