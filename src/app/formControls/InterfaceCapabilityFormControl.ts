import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { InterfaceCapabilityModel } from '../models/InterfaceCapabilityModel';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from "./ICapabilityFormControl";
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
  public contents!: ICapabilityFormControl<ICapabilityModel>[];
  
  constructor(model: InterfaceCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService) {  
    super(formBuilder);
    this._validationService = validationService;
    this.mapModelSubProperties(model);
    this.model = model;
    this.form = this.toFormGroup();
  }

  private mapModelSubProperties(interfaceModel: InterfaceCapabilityModel): void {
    this.contents = new Array<ICapabilityFormControl<ICapabilityModel>>();

    interfaceModel.contents?.map((subModel: ICapabilityModel) => {
      let formControl!: ICapabilityFormControl<ICapabilityModel>;
            
      switch(subModel.type[0]) {
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

      this.contents.push(formControl);
    });
  }
  
  get commands(): ICapabilityModel[] {        
    return this.capabilityByType("Command");
  }

  get properties(): ICapabilityModel[] {
    return this.capabilityByType("Property");
  }

  get telemetries(): ICapabilityModel[] {
    return this.capabilityByType("Telemetry");
  }

  get components(): ICapabilityModel[] {
    return this.capabilityByType("Component");
  }

  get relationships(): ICapabilityModel[] {
    return this.capabilityByType("Relationship");
  }

  private capabilityByType(type: string): ICapabilityModel[] {    
    let capabilities = this.model.contents.filter(x => x.type.indexOf(type) > -1);
    return capabilities;
  }

  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.validDtmi()]],
      type: [this.model.type],
      displayName: [this.model.displayName],
      comment: [this.model.comment],
      description: [this.model.description],
      // Interface specific
      context: [this.model.context],
      extends: [this.model.extends],
      contents: this.formBuilder.array([...this.model.contents])
    });

    return form;
  }
}