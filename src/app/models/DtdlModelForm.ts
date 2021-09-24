import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DtdlModelForm {
  mainForm = this.fb.group({
    id: [''],
    type: [''],
    displayName: [''],
    name: [''],
    context: [''],
    comment: [''],
    description: [''],
    extends: [''],
    contents: this.fb.array([
      this.fb.control('')
    ])
  });

  commandForm = this.fb.group({
    commandId: [''],
    commandType: [''],
    commandDisplayName: [''],
    commandName: [''],
    commandComment: [''],
    commandDescription: [''],
    commandRequest: [''],
    commandResponse: ['']
  });

  propertyForm = this.fb.group({
    propertyId: [''],
    propertyType: [''],
    propertyDisplayName: [''],
    propertyName: [''],
    propertySchema: [''],
    propertyComment: [''],
    propertyDescription: [''],
    propertyWritable: [''],
    propertySemanticType: ['']
  });

  telemetryForm = this.fb.group({
    telemetryId: [''],
    telemetryType: [''],
    telemetryDisplayName: [''],
    telemetryName: [''],
    telemetrySchema: [''],
    telemetryComment: [''],
    telemetryDescription: [''],
    telemetrySemanticType: ['']
  });
  
  constructor(private fb: FormBuilder) {
  }  
}
