import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service'
import { ValidationService } from '../services/validation/validation-service.service';
import { CommandCapabilityFormControl } from '../formControls/CommandCapabilityFormControl';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommandPayloadComponent } from '../command-payload/command-payload.component';
import { SchemaService } from '../services/schema/schema.service';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { CommandPayloadFormControl } from '../formControls/CommandPayloadFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { LocalizationFormControl } from '../formControls/LocalizationFormControl';
import { DisplayNameDescriptionLanguageMap } from '../models/DisplayNameDescriptionLanguageMap';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public command!: CommandCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  public displayNameDescription!: LocalizationFormControl;
  private _schemaService: SchemaService
  private _validationService: ValidationService;
  public requestFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
  public responseFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
  public requestTextControl: FormControl = new FormControl();
  public responseTextControl: FormControl = new FormControl();
  public dialog: MatDialog;

  constructor(schemaService: SchemaService, validationService: ValidationService, settingsService: SettingsService, formBuilder: FormBuilder, dialog: MatDialog) {
    this._schemaService = schemaService;
    this._validationService = validationService;
    this.dialog = dialog;
    const model = new DisplayNameDescriptionLanguageMap();
    this.displayNameDescription = new LocalizationFormControl(model, settingsService, validationService, formBuilder);
  }

  public ngOnInit(): void {
    this.command.subscribeModelToForm(this.command.form);
    this.syncHeaderFields();
    this.setPayloadControls();
  }

  private setPayloadControls(): void {
    if (this.command.model.request) {
      // Create and call a factory method that takes in a model instead
      this.requestFormControl = new CommandPayloadFormControl(this.command.model.request, this.command.formBuilder, this._validationService, this.dialog);
      this.requestTextControl.setValue(this.command.model.request.name);
    } else {
      this.requestFormControl = this._schemaService.createForm("Utility", "commandPayload")
    }

    if (this.command.model.response) {
      // Create and call a factory method that takes in a model instead
      this.responseFormControl = new CommandPayloadFormControl(this.command.model.response, this.command.formBuilder, this._validationService, this.dialog);
      this.responseTextControl.setValue(this.command.model.response.name);
    } else {
      this.responseFormControl = this._schemaService.createForm("Utility", "commandPayload")
    }
  }

  public syncHeaderFields() {
    const id = this.command.form.get("id");
    const name = this.command.form.get("name");

    id?.valueChanges.subscribe(value => {
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });
  }

  public getFormControl(name: string): FormControl {
    return this.command.form.get(name) as FormControl;
  }

  public openRequestSchemaEditor(): void {
    this.dialog
      .open(CommandPayloadComponent, {
        data: this.responseFormControl,
        height: "60%",
        width: "50%"
      })
      .afterClosed()
      .subscribe((result: CommandPayloadFormControl) => {
        if (result) {
          this.requestFormControl = result;
          this.command.form?.get("request")?.setValue(result.model);
          this.requestTextControl.setValue(result.model.name);
        }
      });
  }

  public openResponseSchemaEditor(): void {
    this.dialog
      .open(CommandPayloadComponent, {
        data: this.responseFormControl,
        height: "60%",
        width: "50%"
      })
      .afterClosed()
      .subscribe((result: CommandPayloadFormControl) => {
        if (result) {
          this.responseFormControl = result;
          this.command.form?.get("response")?.setValue(result.model);
          this.responseTextControl.setValue(result.model.name);
        }
      });
  }
}
