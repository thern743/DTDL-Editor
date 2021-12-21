import { FormBuilder, FormGroup } from "@angular/forms";
import { ComponentCapabilityModel } from '../models/ComponentCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';

export class ComponentCapabilityFormControl extends AbstractCapabilityFormControl<ComponentCapabilityModel>  {
  private _validationService: ValidationService;
  
  constructor(model: ComponentCapabilityModel, validationService: ValidationService, formBuilder: FormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup();
  }
  
  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.ValidDtmi()]],
      type: [this.model.type.typeArray],
      displayName: [this.model.displayName],
      name: [this.model.name],
      comment: [this.model.comment],
      description: [this.model.description],
      // Component specific
      schema: [this.model.schema]
    });

    return form;
  }
}
