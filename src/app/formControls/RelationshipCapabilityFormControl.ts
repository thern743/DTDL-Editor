import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ICapabilityModel } from '../models/interfaces/ICapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { RelationshipCapabilityModel } from '../models/RelationshipCapabilityModel';
import { PropertyCapabilityFormControl } from './PropertyCapabilityFormControl';
import { ICapabilityFormControl } from './ICapabilityFormControl';
import { PropertyCapabilityModel } from "../models/PropertyCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";

export class RelationshipCapabilityFormControl extends AbstractCapabilityFormControl<RelationshipCapabilityModel> {
  public properties: PropertyCapabilityFormControl[];
  
  private _validationService: ValidationService;
  
  constructor(interfaceInstance: InterfaceCapabilityFormControl, model: RelationshipCapabilityModel, validationService: ValidationService, formBuilder: UntypedFormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.properties = this.mapModelSubProperties(model);
    this.form = this.toFormGroup(model);
    this.interface = interfaceInstance;
  }
  
  private mapModelSubProperties(model: RelationshipCapabilityModel): Array<PropertyCapabilityFormControl> {
    let properties = new Array<PropertyCapabilityFormControl>();

    model.properties.map((capability: ICapabilityModel) => {
      let formControl!: ICapabilityFormControl<ICapabilityModel>;
            
      switch(capability.type[0]) {
        case "Property":          
          formControl = new PropertyCapabilityFormControl(this.interface, capability as PropertyCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Command":          
        case "Telemetry":          
        case "Component":          
        case "Relationship":          
        default:
          break;
      }

      properties.push(<PropertyCapabilityFormControl>formControl);
    });

    return properties;
  }

  public toFormGroup(model: RelationshipCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      type: [model.type],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Relationship specific
      name: [model.name],
      minMultiplicity: [model.minMultiplicity],
      maxMultiplicity: [model.maxMultiplicity],
      target: [model.target],
      writable: [model.writable],
      properties: this.getCapabilityFormArray()
    });

    return form;
  }

  private getCapabilityFormArray(): UntypedFormArray {
    let formArray = this.formBuilder.array([]);
    
    this.properties.forEach((capability: AbstractCapabilityFormControl<AbstractCapabilityModel>) => {
      const formGroup = capability.toFormGroup(capability.model);
      formArray.push(formGroup);
    });

    return formArray;
  }
}
