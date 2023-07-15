import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ComponentCapabilityModel } from '../models/ComponentCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";

export class ComponentCapabilityFormControl extends AbstractCapabilityFormControl<ComponentCapabilityModel>  {
  private _validationService: ValidationService;
  
  constructor(interfaceInstance: InterfaceCapabilityFormControl, model: ComponentCapabilityModel, validationService: ValidationService, formBuilder: UntypedFormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.form = this.toFormGroup(model);
    this.interface = interfaceInstance;
  }
  
  public toFormGroup(model: ComponentCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      name: [model.name],
      comment: [model.comment],
      description: [model.description],
      // Component specific
      schema: [model.schema]
    });

    return form;
  }
}
