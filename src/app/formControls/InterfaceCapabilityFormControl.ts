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
  public contents: ICapabilityFormControl<ICapabilityModel>[];
  private _validationService: ValidationService;
  public baseDtmi: FormControl;
  
  constructor(model: InterfaceCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService) {  
    super(formBuilder);
    this._validationService = validationService;
    this.contents = new Array<ICapabilityFormControl<ICapabilityModel>>();
    this.mapModelSubProperties(model);
    this.model = model;
    this.form = this.toFormGroup();
    this.baseDtmi = new FormControl("dtmi:com:example;1");
  }

  private mapModelSubProperties(model: InterfaceCapabilityModel): void {
    model.contents.map((model: ICapabilityModel) => {
      let formControl!: ICapabilityFormControl<ICapabilityModel>;
            
      switch(model.type) {
        case "Property":          
          formControl = new PropertyCapabilityFormControl(model as PropertyCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Command":
          formControl = new CommandCapabilityFormControl(model as CommandCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Telemetry":
          formControl = new TelemetryCapabilityFormControl(model as TelemetryCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Component":
          formControl = new ComponentCapabilityFormControl(model as ComponentCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Relationship":
          formControl = new RelationshipCapabilityFormControl(model as RelationshipCapabilityModel, this._validationService, this.formBuilder);
          break;
        default:
          throw new Error("Invalid capability type '" + model.type + "'");          
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
    let capabilities = this.model.contents.filter(x => x.type === type);
    return capabilities;
  }

  public toFormGroup(): FormGroup {
    let form = this.formBuilder.group({
      id: [this.model.id, [this._validationService.ValidDtmi()]],
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