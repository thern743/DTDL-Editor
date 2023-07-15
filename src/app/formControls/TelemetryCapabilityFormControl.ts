import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { TelemetryCapabilityModel } from '../models/TelemetryCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { SchemaService } from "../services/schema/schema.service";

export class TelemetryCapabilityFormControl extends AbstractCapabilityFormControl<TelemetryCapabilityModel> {  
  private _validationService: ValidationService;
  private _schemaService: SchemaService;
  public schemaFormControl?: AbstractCapabilityFormControl<AbstractSchemaModel>;
  
  constructor(interfaceInstance: InterfaceCapabilityFormControl, model: TelemetryCapabilityModel, validationService: ValidationService, schemaService: SchemaService, formBuilder: UntypedFormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this._schemaService = schemaService;
    this.model = model;
    this.form = this.toFormGroup(model);
    this.interface = interfaceInstance;
  }

  public toFormGroup(model: TelemetryCapabilityModel): UntypedFormGroup {
    let form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Telemetry specific
      name: [model.name],
      schema: [model.schema],
      unit: [model.unit]
    });

    return form;
  }

  private getSchemaFormControl(schema: string | AbstractSchemaModel): AbstractCapabilityFormControl<AbstractSchemaModel> | undefined {
    const formControl = this._schemaService.getSchemaFormControl(schema);
    return formControl;
  }

  private getSchemaFormGroup(schema: string | AbstractSchemaModel): FormGroup | FormControl | undefined {
    if (typeof schema === "string")
      return new FormControl(schema);
      
    const formGroup = this.schemaFormControl?.toFormGroup(schema);
    return formGroup;
  }
}

