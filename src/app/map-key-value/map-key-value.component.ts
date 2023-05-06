import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { EditorService } from '../services/editor/editor.service';
import { SchemaService } from '../services/schema/schema.service';
import { MapKeyFormControl } from '../formControls/MapKeyFormControl';
import { MapValueFormControl } from '../formControls/MapValueFormControl';
import { MapKeyCapabilityModel } from '../models/MapKeyCapabilityModel';
import { MapValueCapabilityModel } from '../models/MapValueCapabilityModel';
import { MapSchemaFormControl } from '../formControls/schemas/MapSchemaFormControl';

@Component({
  selector: 'map-key-value',
  templateUrl: './map-key-value.component.html',
  styleUrls: ['./map-key-value.component.scss']
})
export class MapKeyValueComponent implements OnInit, AfterViewInit {
  @Input() public title!: string;
  @Input() public type!: string;
  @Input() public parentForm!: MapSchemaFormControl;
  private _editorService: EditorService;
  private _schemaService: SchemaService;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractSchemaModel> | undefined;
  public schemaDropDownControl: UntypedFormControl = new UntypedFormControl();

  constructor(editorService: EditorService, schemaService: SchemaService) { 
    this._editorService = editorService;
    this._schemaService = schemaService;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.setSchemaDropDowns();
  }

  private setSchemaDropDowns(): void {
    let model: any;
    let formControl: MapKeyFormControl | MapValueFormControl;

    // This is not clean.
    if (this.type === "mapKey") {
      formControl = this.parentForm.mapKey;
      model = <MapKeyCapabilityModel<AbstractSchemaModel>>formControl?.model;
    } else if (this.type = "mapValue") {
      formControl = this.parentForm.mapValue;
      model = <MapValueCapabilityModel<AbstractSchemaModel>>formControl?.model;
    } else {
      return;
    }

    if (!model?.schema) return;

    this.schemaFormControl = formControl.schemaFormControl;
    const key = typeof model.schema === "string" ? model.schema : model?.schema["@type"]?.toLowerCase();
    this.schemaDropDownControl.setValue(key);
  }
  
  public compareSchemas = (model1: AbstractSchemaModel, model2: AbstractSchemaModel): boolean => {
    return this._schemaService.compareSchemas(model1, model2)
  }

  public getSchemaTypes(): Array<string> {
    return this._schemaService.getSchemaTypes();
  }

  public isComplex(schema: string): boolean {
    if (typeof schema == 'string')
      return this._schemaService.getSchemaTypeEnum(schema) == SchemaTypeEnum.Complex;

    return false;
  }

  public changeSchema($event: MatSelectChange): void {
    const value = $event.value;
    this.changeSchemaInternal(value);
  }

  private changeSchemaInternal(value: any): void {
    if (!value) return;
    if (value instanceof AbstractCapabilityFormControl) return;
    const key = value.toLowerCase();

    if (this.type == "mapKey") {
      const formControl = this._schemaService.createMapForm(SchemaTypeEnum[SchemaTypeEnum.MapKey], key);
      this.schemaFormControl = formControl;
      this.parentForm.form.get("mapKey")?.setValue(formControl?.model);
    } else if (this.type == "mapValue") {
      const formControl = this._schemaService.createMapForm(SchemaTypeEnum[SchemaTypeEnum.MapValue], key);
      this.schemaFormControl = formControl;
      this.parentForm.form.get("mapValue")?.setValue(formControl?.model);
    }
  }

  public openSchemaEditor(): void {
    if(this.schemaFormControl) {
      this._editorService.openSchemaEditor(this.parentForm, this.schemaFormControl);
    }
  }

  public toTitleCase(value: string): string {
    return this._editorService.toTitleCase(value);
  }
}


