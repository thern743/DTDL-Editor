import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractCapabilityFormControl } from "../formControls/AbstractCapabilityFormControl";
import { AbstractCapabilityModel } from "../models/AbstractCapabilityModel";
import { ValidationService } from "./validation/validation-service.service";

export interface IFormFactory {
    createForm(type: string, name: string): AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
    getFormsRegistry(): Map<string, Map<string, (model: AbstractCapabilityModel, formBuilder: FormBuilder, validationService: ValidationService, dialog: MatDialog) => AbstractCapabilityFormControl<AbstractCapabilityModel>>>;
    getModelsRegistry(): Map<string, Map<string, (id: string) => AbstractCapabilityModel>>;
}