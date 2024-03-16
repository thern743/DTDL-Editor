import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { CommandPayloadFormControl } from '../formControls/CommandPayloadFormControl';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { EditorService } from '../services/editor/editor.service';
import { SchemaService } from '../services/schema/schema.service';

@Component({
  selector: 'command-payload',
  templateUrl: './command-payload.component.html',
  styleUrls: ['./command-payload.component.scss']
})
export class CommandPayloadComponent implements OnInit, OnDestroy {
  public commandPayload!: CommandPayloadFormControl;
  public panelOpenState = true;
  public schemaFormControl?: AbstractCapabilityFormControl<AbstractSchemaModel>;
  public schemaDropDownControl: UntypedFormControl = new UntypedFormControl();
  private _schemaService: SchemaService;
  private _editorService: EditorService;

  constructor(
    editorService: EditorService, 
    schemaService: SchemaService,
    @Inject(MAT_DIALOG_DATA) data: CommandPayloadFormControl
  ) { 
    this._editorService = editorService;
    this._schemaService = schemaService;
    this.commandPayload = data;
  }

  public ngOnInit(): void { 
    this.commandPayload.subscribeModelToForm(this.commandPayload.form);
    this.setSchemaDropDown();
  }

  public ngOnDestroy(): void {
    this.commandPayload.unsubscribeModelFromForm();
  }

  // TODO: Importing a CommandPayload model does not allow editing the schema
  //       Because the models are deserialized directly, the factory methods are not called when importing
  //       a model and so the SchemaFormControl value isn't set for `openSchemaEditor()`.
  private setSchemaDropDown(): void {
    let schema = typeof this.commandPayload.model?.schema === 'string' ? this.commandPayload.model.schema : this.commandPayload.model.schema["@type"];
    if (!schema) return;
    this.schemaDropDownControl?.setValue(schema.toLocaleLowerCase());
  }

  public getSchemaTypes(): Array<string> {
    return this._schemaService.getSchemaTypes();
  }

  public compareSchemas = (model1: AbstractSchemaModel, model2: AbstractSchemaModel): boolean => {
    return this._schemaService.compareSchemas(model1, model2)
  }

  public isComplex(schema: string): boolean {
    if (typeof schema == 'string')
      return this._schemaService.getSchemaTypeEnum(schema) == SchemaTypeEnum.Complex;

    return false;
  }

  public changeSchema($event: MatSelectChange): void {
    let value = $event.value;
    this.changeSchemaInternal(value);
  }

  public changeSchemaInternal(value: any): void {
    if (value instanceof AbstractCapabilityFormControl) return;
    let key = value.toLowerCase();
    let schemaType = this._schemaService.getSchemaTypeEnum(key);
    this.commandPayload.form.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this._schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if (formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    if(this.schemaFormControl) {
      this._editorService.openSchemaEditor(this.commandPayload, this.schemaFormControl);
    }
  };
}
