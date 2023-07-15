import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MapValueFormControl } from '../../formControls/MapValueFormControl';
import { SchemaService } from '../../services/schema/schema.service';
import { UntypedFormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from 'src/app/formControls/AbstractCapabilityFormControl';
import { MapSchemaFormControl } from 'src/app/formControls/schemas/MapSchemaFormControl';
import { AbstractSchemaModel } from 'src/app/models/AbstractSchemaModel';
import { MapValueCapabilityModel } from 'src/app/models/MapValueCapabilityModel';
import { SchemaTypeEnum } from 'src/app/models/SchemaTypeEnum';
import { EditorService } from 'src/app/services/editor/editor.service';

@Component({
  selector: 'map-value',
  templateUrl: './map-value.component.html',
  styleUrls: ['./map-value.component.scss']
})
export class MapValueComponent implements OnInit, AfterViewInit {
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
    if (!this.parentForm.mapValue) return;
    let model = <MapValueCapabilityModel<AbstractSchemaModel>>this.parentForm.mapValue?.model;
    if (!model?.schema) return;

    this.schemaFormControl = this.parentForm.mapValue.schemaFormControl;
    const key = typeof model.schema === "string" ? model.schema : model?.schema["@type"];
    this.schemaDropDownControl.setValue(key.toLocaleLowerCase());
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
    const formControl = this._schemaService.createMapForm(SchemaTypeEnum[SchemaTypeEnum.MapValue], key);
    this.schemaFormControl = formControl;
    this.parentForm.mapValue = formControl as MapValueFormControl;
    this.parentForm.form.get("mapValue")?.setValue(formControl?.model);
  }

  public openSchemaEditor($event: any): void {
    $event.stopImmediatePropagation();
    if(this.schemaFormControl) {
      const ctl = this.schemaFormControl as MapValueFormControl;
      if (ctl.schemaFormControl === undefined) return;
      this._editorService.openSchemaEditor(this.parentForm, ctl.schemaFormControl);
    }
  }

  public nameChanged($event: any) {
    let model = this.parentForm.form.get("mapValue")?.value as MapValueCapabilityModel<AbstractSchemaModel>;
    if (!model) return;
    model["name"] = $event.target.value;
    this.parentForm.mapValue.form.get("name")?.setValue($event.target.value);
  }

  public toTitleCase(value: string): string {
    return this._editorService.toTitleCase(value);
  }
}