import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation/validation-service.service';
import { CommandCapabilityFormControl } from '../formControls/CommandCapabilityFormControl';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommandPayloadComponent } from '../command-payload/command-payload.component';
import { SchemaService } from '../services/schema/schema.service';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { CommandPayloadFormControl } from '../formControls/CommandPayloadFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';

@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit, OnDestroy {
  @Input() public formIndex!: [number, number];
  @Input() public command!: CommandCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  private _schemaService: SchemaService
  private _validationService: ValidationService;
  public requestFormControl?: AbstractCapabilityFormControl<AbstractSchemaModel>;
  public responseFormControl?: AbstractCapabilityFormControl<AbstractSchemaModel>;
  public requestTextControl: UntypedFormControl = new UntypedFormControl();
  public responseTextControl: UntypedFormControl = new UntypedFormControl();
  public dialog: MatDialog;

  constructor(schemaService: SchemaService, validationService: ValidationService, dialog: MatDialog) {
    this._schemaService = schemaService;
    this._validationService = validationService;
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.command.subscribeModelToForm(this.command.form);
    this.syncHeaderFields();
    this.setPayloadControls();
  }

  public ngOnDestroy(): void {
    this.command.unsubscribeModelFromForm();
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
    const id = this.command.form.get("@id");
    const name = this.command.form.get("name");

    id?.valueChanges.subscribe(value => {
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });
  }

  public getFormControl(name: string): UntypedFormControl {
    return this.command.form.get(name) as UntypedFormControl;
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
