import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { MapKeyCapabilityModel } from "../models/MapKeyCapabilityModel";
import { ValidationService } from "../services/validation/validation-service.service";
import { AbstractCapabilityFormControl } from "./AbstractCapabilityFormControl";
import { SchemaService } from "../services/schema/schema.service";

export class MapKeyFormControl extends AbstractCapabilityFormControl<MapKeyCapabilityModel<AbstractSchemaModel>> {
    private _validationService: ValidationService;
    private _schemaService: SchemaService;
    public dialog: MatDialog;
    public schemaFormControl?: AbstractCapabilityFormControl<AbstractSchemaModel>;

    constructor(model: MapKeyCapabilityModel<AbstractSchemaModel>, formBuilder: UntypedFormBuilder, validationService: ValidationService, schemaService: SchemaService, dialog: MatDialog) {
        super(formBuilder);
        this._validationService = validationService;
        this._schemaService = schemaService;
        this.dialog = dialog;
        this.model = model;
        this.schemaFormControl = this.getSchemaFormControl(model.schema);
        this.form = this.toFormGroup(model);
    }

    public toFormGroup(model: MapKeyCapabilityModel<AbstractSchemaModel>): UntypedFormGroup {
        let form =  this.formBuilder.group({
            "@id": [model["@id"], [this._validationService.validDtmi()]],
            displayName: [model.displayName], 
            comment: [model.comment],
            description: [model.description],
            // MapKey specific
            name: [model.name],
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