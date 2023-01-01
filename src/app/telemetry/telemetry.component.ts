import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { SchemaService } from '../services/schema/schema.service';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { FormControl } from '@angular/forms';

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
  public dialog: MatDialog;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel> | undefined;
  public schemaDropDownControl: FormControl = new FormControl();
  public semanticTypeDropDownControl: FormControl = new FormControl();

  constructor(editorService: EditorService, schemaService: SchemaService, dialog: MatDialog) {
    this._editorService = editorService;
    this._schemaService = schemaService;
    this.dialog = dialog;
  }

  public ngOnInit(): void {
    this.telemetry.subscribeModelToForm();
    this.syncHeaderFields();
    this.setSchemaDropDown();
  }

  private setSchemaDropDown(): void {
    let schema = "";

    if (typeof this.telemetry.model.schema === 'string') {
      schema = this.telemetry.model.schema;
    } else if (this.telemetry.model.schema instanceof Object) {
      if (this.telemetry.model.schema.type instanceof Array) {
        schema = this.telemetry.model.schema.type[0];
      } else {
        schema = this.telemetry.model.schema.type;
      }
    }

    this.schemaDropDownControl?.setValue(schema?.toLocaleLowerCase());

    let type = this.telemetry.model.type instanceof Array ? this.telemetry.model.type[1] : this.telemetry.model.type;
    this.semanticTypeDropDownControl?.setValue(type);
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
    let schemaTypes = new Array<string>();

    this._schemaService.schemaFactory.formRegistry.get("Primitive")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    this._schemaService.schemaFactory.formRegistry.get("Complex")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    return schemaTypes;
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

  public validSchemaTypes = (schemaType: string): boolean => {
    if (this.semanticTypeDropDownControl?.value)
      return ["double", "float", "integer", "long"].indexOf(schemaType.toLowerCase()) > -1;
    else
      return true;
  }

  public changeSemanticType($event: MatSelectChange): void {
    let type = this.telemetry.form.get("type");

    if (["", null, undefined].indexOf($event.value) > -1) {
      let semanticType = new Array<string>("Telemetry");
      type?.setValue(semanticType);
      let unit = this.telemetry.form.get("unit");
      unit?.setValue(undefined);
    } else {
      let semanticType = new Array<string>("Telemetry", $event.value);
      type?.setValue(semanticType);

      let schema = this.telemetry.form.get("schema")?.value;
      if (["double", "float", "integer", "long"].indexOf(schema?.toLowerCase()) === -1) {
        this.telemetry.form.get("schema")?.setValue(undefined);
        this.schemaDropDownControl.setValue(undefined);
        this.schemaFormControl = undefined;
      }
    }
  }

  public isComplex(schema: string): boolean {
    if (typeof schema == 'string')
      return this._schemaService.getSchemaType(schema) == SchemaTypeEnum.Complex;

    return false;
  }

  public compareSchemas = (model1: AbstractCapabilityModel, model2: AbstractCapabilityModel): boolean => {
    return this._schemaService.compareSchemas(model1, model2)
  }

  public changeSchema($event: MatSelectChange): void {
    if ($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this._schemaService.getSchemaType(key);
    this.telemetry.form.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this._schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if (formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    if (this.schemaFormControl)
      this._schemaService.openSchemaEditor(this.telemetry.form, this.schemaFormControl)
  }
}