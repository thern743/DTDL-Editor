import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { PropertyCapabilityModel } from '../models/PropertyCapabilityModel';
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from './AbstractCapabilityFormControl';
import { InterfaceCapabilityFormControl } from "./InterfaceCapabilityFormControl";
import { SchemaService } from "../services/schema/schema.service";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";

export class PropertyCapabilityFormControl extends AbstractCapabilityFormControl<PropertyCapabilityModel> {
  private _validationService: ValidationService;
  private _schemaService: SchemaService;
  public schemaFormControl?: AbstractCapabilityFormControl<AbstractSchemaModel>;
  
  constructor(interfaceInstance: InterfaceCapabilityFormControl, model: PropertyCapabilityModel, validationService: ValidationService, schemaService: SchemaService, formBuilder: UntypedFormBuilder) {  
    super(formBuilder);
    this._validationService = validationService;
    this._schemaService = schemaService;
    this.model = model;
    this.schemaFormControl = this.getSchemaFormControl(model.schema);
    this.form = this.toFormGroup(model);
    this.interface = interfaceInstance;
  }

  public toFormGroup(model: PropertyCapabilityModel): UntypedFormGroup {
    const form = this.formBuilder.group({
      "@id": [model["@id"], [this._validationService.validDtmi()]],
      "@type": [model["@type"]],
      displayName: [model.displayName],
      comment: [model.comment],
      description: [model.description],
      // Property specific
      name: [model.name],
      unit: [model.unit],
      writable: [model.writable],
      schema: this.getSchemaFormGroup(model.schema)
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
