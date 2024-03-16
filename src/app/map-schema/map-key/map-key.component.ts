import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { SchemaTypeEnum } from '../../models/SchemaTypeEnum';
import { EditorService } from '../../services/editor/editor.service';
import { SchemaService } from '../../services/schema/schema.service';
import { MapKeyFormControl } from '../../formControls/MapKeyFormControl';
import { MapValueFormControl } from '../../formControls/MapValueFormControl';
import { MapKeyCapabilityModel } from '../../models/MapKeyCapabilityModel';
import { MapValueCapabilityModel } from '../../models/MapValueCapabilityModel';
import { MapSchemaFormControl } from 'src/app/formControls/schemas/MapSchemaFormControl';
import { AbstractCapabilityFormControl } from 'src/app/formControls/AbstractCapabilityFormControl';
import { AbstractSchemaModel } from 'src/app/models/AbstractSchemaModel';

@Component({
  selector: 'map-key',
  templateUrl: './map-key.component.html',
  styleUrls: ['./map-key.component.scss']
})
export class MapKeyComponent implements OnInit, AfterViewInit {  
  @Input() 
  public parentForm!: MapSchemaFormControl;
  public panelOpenState: boolean = false;
  private _editorService: EditorService;
  private _schemaService: SchemaService;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractSchemaModel> | undefined;
  public schemaDropDownControl: UntypedFormControl = new UntypedFormControl();
  public nameFormControl: UntypedFormControl = new UntypedFormControl();

  constructor(editorService: EditorService, schemaService: SchemaService) { 
    this._editorService = editorService;
    this._schemaService = schemaService;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.setSchemaDropDowns();
  }

  public stopPropagation($event: Event): void {    
    $event.stopImmediatePropagation();    
  }

  private setSchemaDropDowns(): void {
    let model: any;
    let formControl: MapKeyFormControl | MapValueFormControl;
    formControl = this.parentForm.mapKey;
    model = <MapKeyCapabilityModel<AbstractSchemaModel>>formControl?.model;

    if (!model?.schema) return;

    this.schemaFormControl = formControl.schemaFormControl;
    const key = typeof model.schema === "string" ? model.schema : model?.schema["@type"]?.toLowerCase();
    this.schemaDropDownControl.setValue(key.toLocaleLowerCase());
  }
  
  public compareSchemas = (model1: AbstractSchemaModel, model2: AbstractSchemaModel): boolean => {
    return this._schemaService.compareSchemas(model1, model2)
  }

  public getSchemaTypes(): Array<string> {
    return new Array<string>("string"); 
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
    const formControl = this._schemaService.createMapForm(SchemaTypeEnum[SchemaTypeEnum.MapKey], key);
    this.schemaFormControl = formControl;
    this.parentForm.mapKey = formControl as MapKeyFormControl;
    this.parentForm.form.get("mapKey")?.setValue(formControl?.model);
  }

  public nameChanged($event: any) {
    let model = this.parentForm.form.get("mapKey")?.value as MapKeyCapabilityModel<AbstractSchemaModel>;
    if (!model) return;
    model["name"] = $event.target.value;
    this.parentForm.mapKey.form.get("name")?.setValue($event.target.value);
  }

  public toTitleCase(value: string): string {
    return this._editorService.toTitleCase(value);
  }
}