import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ICapabilityModel } from '../models/interfaces/ICapabilityModel';
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { RelationshipCapabilityModel } from '../models/RelationshipCapabilityModel';
import { PropertyCapabilityFormControl } from './PropertyCapabilityFormControl';
import { ICapabilityFormControl } from './ICapabilityFormControl';
import { PropertyCapabilityModel } from "../models/PropertyCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";
import { SchemaService } from "../services/schema/schema.service";

export class RelationshipCapabilityFormControl extends AbstractCapabilityFormControl<RelationshipCapabilityModel> {
  public properties: PropertyCapabilityFormControl[];
  private _validationService: ValidationService;
  private _schemaService: SchemaService;

  constructor(interfaceInstance: InterfaceCapabilityFormControl, model: RelationshipCapabilityModel, validationService: ValidationService, schemaService: SchemaService, formBuilder: UntypedFormBuilder) {
    super(formBuilder);
    this._validationService = validationService;
    this._schemaService = schemaService;
    this.model = model;
    this.form = this.toFormGroup(model);
    this.properties = this.getPropertiesFormControls(model);
    this.interface = interfaceInstance;
  }

  public toFormGroup(model: RelationshipCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Relationship specific
      name: [model.name],
      minMultiplicity: [model.minMultiplicity],
      maxMultiplicity: [model.maxMultiplicity],
      target: [model.target],
      writable: [model.writable]
    });

    return form;
  }

  private getPropertiesFormControls(model: RelationshipCapabilityModel): Array<PropertyCapabilityFormControl> {
    let properties = new Array<PropertyCapabilityFormControl>();

    model.properties.map((capability: ICapabilityModel) => {
      let formControl!: ICapabilityFormControl<ICapabilityModel>;

      const type = capability["@type"][0].toLocaleLowerCase();
    
      switch (type) {
        case "property":
          formControl = new PropertyCapabilityFormControl(this.interface, capability as PropertyCapabilityModel, this._validationService, this._schemaService, this.formBuilder);
          break;
        case "command":
        case "telemetry":
        case "component":
        case "relationship":
        default:
          break;
      }

      properties.push(<PropertyCapabilityFormControl>formControl);
    });

    return properties;
  }
}
