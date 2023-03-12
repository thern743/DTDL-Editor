import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor.service';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { SchemaService } from '../services/schema/schema.service';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { UntypedFormControl } from '@angular/forms';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';

@Component({
  selector: 'telemetry-definition',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public telemetry!: TelemetryCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  private _editorService: EditorService;
  private _schemaService: SchemaService;
  public schemaFormControl?: AbstractCapabilityFormControl<AbstractSchemaModel>;
  public schemaDropDownControl: UntypedFormControl = new UntypedFormControl();
  public semanticTypeDropDownControl: UntypedFormControl = new UntypedFormControl();
  public dialog: MatDialog;

  constructor(editorService: EditorService, schemaService: SchemaService, dialog: MatDialog) {
    this._editorService = editorService;
    this._schemaService = schemaService;
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.telemetry.subscribeModelToForm(this.telemetry.form);
    this.syncHeaderFields();
    this.setSchemaAndSemanticTypeDropDowns();
  }

  // TODO: Importing a Telemetry model does not allow editing the schema
  //       Because the models are deserialized directly, the factory methods are not called when importing
  //       a model and so the SchemaFormControl value isn't set for `openSchemaEditor()`.
  private setSchemaAndSemanticTypeDropDowns(): void {
    if (this.telemetry.model?.type instanceof Array && this.telemetry.model.type?.length > 1) {
      // Only set Semantic Type is it's an additional @type value
      let type = this.telemetry.model.type[1];
      this.semanticTypeDropDownControl?.setValue(type);
    }

    let schema = typeof this.telemetry.model?.schema === 'string' ? this.telemetry.model.schema : this.telemetry.model.schema?.type;
    if (!schema) return;
    this.schemaDropDownControl?.setValue(schema.toLocaleLowerCase());
  }

  public syncHeaderFields() {
    const id = this.telemetry.form.get("id");
    const name = this.telemetry.form.get("name");

    id?.valueChanges.subscribe(value => {
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });
  }

  public getSchemaTypes(): Array<string> {
    return this._schemaService.getSchemaTypes();
  }

  public getSemanticTypes(): Array<string> {
    return this._editorService.getSemanticTypes();
  }

  public getUnits(): string[] | undefined {
    let semanticType = this.semanticTypeDropDownControl?.value;
    if(semanticType) {
      let units = this._editorService.getUnits().get(semanticType);
      return units;
    }

    return undefined;
  }

  public getFormControl(name: string): UntypedFormControl {
    return this.telemetry.form.get(name) as UntypedFormControl;
  }

  public validSchemaTypes = (schemaType: string): boolean => {
    if (this.semanticTypeDropDownControl?.value)
      return ["double", "float", "integer", "long"].indexOf(schemaType.toLowerCase()) > -1;
    else
      return true;
  }

  public changeSemanticType($event: MatSelectChange): void {
    let value = $event.value;
    this.changeSemanticTypeInternal(value);
  }

  private changeSemanticTypeInternal(value: string): void {
    let type = this.telemetry.form.get("type");

    if (["", null, undefined].indexOf(value) > -1) {
      let semanticType = new Array<string>("Telemetry");
      type?.setValue(semanticType);
      let unit = this.telemetry.form.get("unit");
      unit?.setValue(undefined);
    } else {
      let semanticType = new Array<string>("Telemetry", value);
      type?.setValue(semanticType);

      let schema = this.telemetry.form.get("schema")?.value;
      if (["double", "float", "integer", "long"].indexOf(schema.toLowerCase()) === -1) {
        this.telemetry.form.get("schema")?.setValue(undefined);
        this.schemaDropDownControl.setValue(undefined);
        this.schemaFormControl = undefined;
      }
    }
  }

  public isComplex(schema: string): boolean {
    if (typeof schema == 'string')
      return this._schemaService.getSchemaTypeEnum(schema) == SchemaTypeEnum.Complex;

    return false;
  }

  public compareSchemas = (model1: AbstractSchemaModel, model2: AbstractSchemaModel): boolean => {
    return this._schemaService.compareSchemas(model1, model2)
  }

  public changeSchema($event: MatSelectChange): void {
    let value = $event.value;
    this.changeSchemaInternal(value);
  }

  public changeSchemaInternal(value: any): void {
    if (value instanceof AbstractCapabilityFormControl) return;
    let key = value.toLowerCase();
    let schemaType = this._schemaService.getSchemaTypeEnum(key);
    this.telemetry.form.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this._schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if (formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    if (this.schemaFormControl)
      this._schemaService.openSchemaEditor(this.telemetry, this.schemaFormControl)
  }
}