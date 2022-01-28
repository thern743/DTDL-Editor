import { FormBuilder, FormGroup } from "@angular/forms";
import { ICapabilityModel } from '../models/ICapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { RelationshipCapabilityModel } from '../models/RelationshipCapabilityModel';
import { PropertyCapabilityFormControl } from './PropertyCapabilityFormControl';
import { ICapabilityFormControl } from './ICapabilityFormControl';
import { PropertyCapabilityModel } from "../models/PropertyCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";

export class RelationshipCapabilityFormControl extends AbstractCapabilityFormControl<RelationshipCapabilityModel> {
  public properties: PropertyCapabilityFormControl[];
  
  private _validationService: ValidationService;
  
  constructor(model: RelationshipCapabilityModel, validationService: ValidationService, formBuilder: FormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this.properties = new Array<PropertyCapabilityFormControl>();
    this.mapModelSubProperties(model);
    this.model = model;
    this.form = this.toFormGroup();
  }
  
  private mapModelSubProperties(model: RelationshipCapabilityModel): void {
    model.properties.map((capability: ICapabilityModel) => {
      let formControl!: ICapabilityFormControl<ICapabilityModel>;
            
      switch(capability.type[0]) {
        case "Property":          
          formControl = new PropertyCapabilityFormControl(capability as PropertyCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Command":          
        case "Telemetry":          
        case "Component":          
        case "Relationship":          
        default:
          break;
      }

      this.properties.push(<PropertyCapabilityFormControl>formControl);
    });
  }

  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.ValidDtmi()]],
      type: [this.model.type],
      displayName: [this.model.displayName],
      name: [this.model.name],
      comment: [this.model.comment],
      description: [this.model.description],
      // Relationship specific
      minMultiplicity: [this.model.minMultiplicity],
      maxMultiplicity: [this.model.maxMultiplicity],
      target: [this.model.target],
      writable: [this.model.writable],
      properties: this.formBuilder.array([...this.model.properties])
    });

    return form;
  }
}
