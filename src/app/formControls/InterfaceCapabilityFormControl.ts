import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
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
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { ArraySchemaCapabilityModel } from "../models/schemas/ArraySchemaCapabilityModel";
import { MapSchemaCapabilityModel } from "../models/schemas/MapSchemaCapabilityModel";
import { EnumSchemaCapabilityModel } from "../models/schemas/EnumSchemaCapabilityModel";
import { ObjectSchemaCapabilityModel } from "../models/schemas/ObjectSchemaCapabilityModel";
import { MatDialog } from "@angular/material/dialog";
import { ArraySchemaFormControl } from "./schemas/ArraySchemaFormControl";
import { EnumSchemaFormControl } from "./schemas/EnumSchemaFormControl";
import { MapSchemaFormControl } from "./schemas/MapSchemaFormControl";
import { ObjectSchemaFormControl } from "./schemas/ObjectSchemaFormControl";

export class InterfaceCapabilityFormControl extends AbstractCapabilityFormControl<InterfaceCapabilityModel> {
  private _validationService: ValidationService;
  public contents!: Array<AbstractCapabilityFormControl<AbstractCapabilityModel>>;
  public schemas!: Array<AbstractCapabilityFormControl<AbstractSchemaModel>>;
  private _dialog: MatDialog;
  
  constructor(model: InterfaceCapabilityModel, formBuilder: UntypedFormBuilder, validationService: ValidationService, dialog: MatDialog) {  
    super(formBuilder);
    this._validationService = validationService;
    this.model = model;
    this.contents = this.mapContents(model);
    this.schemas = this.mapSchemas(model);
    this.form = this.toFormGroup(model);
    this._dialog = dialog;
  }

  private mapContents(interfaceModel: InterfaceCapabilityModel): Array<AbstractCapabilityFormControl<AbstractCapabilityModel>> {
    let contents = new Array<AbstractCapabilityFormControl<AbstractCapabilityModel>>();

    interfaceModel.contents?.forEach((capability: AbstractCapabilityModel) => {
      let formControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;
      
      let type = typeof capability.type === 'string' ? new Array<string>(capability.type) : capability.type;

      switch(type[0]) {
        case "Property":          
          formControl = new PropertyCapabilityFormControl(this, capability as PropertyCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Command":
          formControl = new CommandCapabilityFormControl(this,capability as CommandCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Telemetry":
          formControl = new TelemetryCapabilityFormControl(this,capability as TelemetryCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Component":
          formControl = new ComponentCapabilityFormControl(this,capability as ComponentCapabilityModel, this._validationService, this.formBuilder);
          break;
        case "Relationship":
          formControl = new RelationshipCapabilityFormControl(this,capability as RelationshipCapabilityModel, this._validationService, this.formBuilder);
          break;
        default:
          throw new Error("Invalid capability type '" + capability.type + "'");          
      }

      contents.push(formControl);
    });

    return contents;
  }

  private mapSchemas(interfaceModel: InterfaceCapabilityModel): Array<AbstractCapabilityFormControl<AbstractSchemaModel>> { 
    let schemas = new Array<AbstractCapabilityFormControl<AbstractSchemaModel>>();

    interfaceModel.schemas?.forEach((schema: AbstractSchemaModel) => {
      let formControl!: AbstractCapabilityFormControl<AbstractSchemaModel>;
      let type = typeof schema.type === 'string' ? new Array<string>(schema.type) : schema.type;
      
      if (type == undefined) return;

      switch(type[0]) {
        case "array":          
          formControl = new ArraySchemaFormControl(schema as ArraySchemaCapabilityModel, this._validationService, this.formBuilder, this._dialog);
          break;
        case "map":
          formControl = new MapSchemaFormControl(schema as MapSchemaCapabilityModel<AbstractSchemaModel, AbstractSchemaModel>, this._validationService, this.formBuilder, this._dialog);
          break;
        case "enum":
          formControl = new EnumSchemaFormControl(schema as EnumSchemaCapabilityModel, this._validationService, this.formBuilder, this._dialog);
          break;
        case "object":
          formControl = new ObjectSchemaFormControl(schema as ObjectSchemaCapabilityModel, this._validationService, this.formBuilder, this._dialog);
          break;
        default:
          throw new Error("Invalid schema type '" + schema.type + "'");          
      }

      schemas.push(formControl);
    });

    return schemas;
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

  public toFormGroup(model: InterfaceCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      id: [model.id, [this._validationService.validDtmi()]],
      type: [model.type],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Interface specific
      context: [model.context],
      extends: [model.extends],
      contents: this.getCapabilityFormArray(),
      schemas: this.getSchemasFormArray()
    });

    return form;
  }

  private getCapabilityFormArray(): UntypedFormArray {
    let formArray = this.formBuilder.array([]);
    
    this.contents.forEach((capability: AbstractCapabilityFormControl<AbstractCapabilityModel>) => {
      const formGroup = capability.toFormGroup(capability.model);
      formArray.push(formGroup);
    });

    return formArray;
  }

  private getSchemasFormArray(): UntypedFormArray {
    let formArray = this.formBuilder.array([]);
    
    this.schemas.forEach((schema: AbstractCapabilityFormControl<AbstractSchemaModel>) => {
      const formGroup = schema.toFormGroup(schema.model);
      formArray.push(formGroup);
    });

    return formArray;
  }
}