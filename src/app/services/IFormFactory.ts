import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractSchemaModel } from "../models/AbstractSchemaModel";
import { ValidationService } from "./validation/validation-service.service";

export interface IFormFactory {
    createForm(type: string, name: string): AbstractCapabilityFormControl<AbstractSchemaModel> | undefined;
    getFormsRegistry(): Map<string, Map<string, (model: AbstractSchemaModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractSchemaModel>>>;
    getModelsRegistry(): Map<string, Map<string, (id: string) => AbstractSchemaModel>>;
}