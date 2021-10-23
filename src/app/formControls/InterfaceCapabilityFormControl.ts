import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { CommandCapabilityFormControl } from "./CommandCapabilityFormControl";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { InterfaceCapabilityDto } from '../models/InterfaceCapabilityModel';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from "./ICapabilityFormControl";

export class InterfaceCapabilityFormControl extends AbstractCapabilityFormControl<InterfaceCapabilityDto> {
  public contents: ICapabilityFormControl<ICapabilityModel>[];
  
  constructor(formBuilder: FormBuilder) {  
    super(formBuilder);
    this.contents = new Array<ICapabilityFormControl<ICapabilityModel>>();
    this.model = new InterfaceCapabilityDto();    
    this.toFormGroup();
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
    let capabilities = [...this.model.contents].filter(x => x.type === type);
    return capabilities;
  }

  public toFormGroup(): FormGroup {
    this.form = this.formBuilder.group({
      index: [this.index],
      id: [this.model.id],
      type: [this.model.type],
      displayName: [this.model.displayName],
      name: [this.model.name],
      comment: [this.model.comment],
      description: [this.model.description],
      // Interface specific
      context: [this.model.context],
      extends: [this.model.extends],
      contents: this.formBuilder.array([...this.model.contents])
    });

    return this.form;
  }

  public getValue(): ICapabilityModel {
    return this.model;
  }  
}