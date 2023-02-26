import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";
import { PropertyCapabilityFormControl } from "./PropertyCapabilityFormControl";
import { CommandCapabilityFormControl } from "./CommandCapabilityFormControl";
import { ComponentCapabilityFormControl } from "./ComponentCapabilityFormControl";
import { RelationshipCapabilityFormControl } from "./RelationshipCapabilityFormControl";
import { TelemetryCapabilityFormControl } from "./TelemetryCapabilityFormControl";
import { RelationshipCapabilityModel } from "../models/RelationshipCapabilityModel";
import { CommandCapabilityModel } from "../models/CommandCapabilityModel";
import { ComponentCapabilityModel } from "../models/ComponentCapabilityModel";
import { PropertyCapabilityModel } from "../models/PropertyCapabilityModel";
import { TelemetryCapabilityModel } from "../models/TelemetryCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";

export class InterfaceCapabilityFormControl extends AbstractCapabilityFormControl<InterfaceCapabilityModel> {
  private _validationService: ValidationService;
  public contents!: Array<AbstractCapabilityFormControl<AbstractCapabilityModel>>;
  
  constructor(model: InterfaceCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.contents = this.mapModelSubProperties(model);
    this.form = this.toFormGroup(model);
  }

  private mapModelSubProperties(interfaceModel: InterfaceCapabilityModel): Array<AbstractCapabilityFormControl<AbstractCapabilityModel>> {
    let contents = new Array<AbstractCapabilityFormControl<AbstractCapabilityModel>>();

    interfaceModel.contents?.map((subModel: AbstractCapabilityModel) => {
      let formControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;
      
      let type = typeof subModel.type === 'string' ? new Array<string>(subModel.type) : subModel.type;

      switch(type[0]) {
        case "Property":          
          formControl = new PropertyCapabilityFormControl(subModel as PropertyCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Command":
          formControl = new CommandCapabilityFormControl(subModel as CommandCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Telemetry":
          formControl = new TelemetryCapabilityFormControl(subModel as TelemetryCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Component":
          formControl = new ComponentCapabilityFormControl(subModel as ComponentCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Relationship":
          formControl = new RelationshipCapabilityFormControl(subModel as RelationshipCapabilityModel, this._validationService, this.formBuilder);
          break;
        default:
          throw new Error("Invalid capability type '" + subModel.type + "'");          
      }

      contents.push(formControl);
    });

    return contents;
  }
  
  get commands(): AbstractCapabilityModel[] {        
    return this.capabilityByType("Command");
  }

  get properties(): AbstractCapabilityModel[] {
    return this.capabilityByType("Property");
  }

  get telemetries(): AbstractCapabilityModel[] {
    return this.capabilityByType("Telemetry");
  }

  get components(): AbstractCapabilityModel[] {
    return this.capabilityByType("Component");
  }

  get relationships(): AbstractCapabilityModel[] {
    return this.capabilityByType("Relationship");
  }

  private capabilityByType(type: string): AbstractCapabilityModel[] {    
    let capabilities = this.model.contents.filter(x => x.type.indexOf(type) > -1);
    return capabilities;
  }

  public toFormGroup(model: InterfaceCapabilityModel): FormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      type: [model.type],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Interface specific
      context: [model.context],
      extends: [model.extends],
      contents: this.getCapabilityFormArray()
    });

    return form;
  }

  private getCapabilityFormArray(): FormArray {
    let formArray = this.formBuilder.array([]);
    
    this.contents.forEach((capability: AbstractCapabilityFormControl<AbstractCapabilityModel>) => {
      const formGroup = capability.toFormGroup(capability.model);
      formArray.push(formGroup);
    });

    return formArray;
  }
}