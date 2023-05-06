import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';
import { PropertyCapabilityModel } from '../models/PropertyCapabilityModel';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { TelemetryCapabilityModel } from '../models/TelemetryCapabilityModel';
import { EditorService } from '../services/editor/editor.service';
import { SchemaService } from '../services/schema/schema.service';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';
import { TelemetryCapabilityFormControl } from '../formControls/TelemetryCapabilityFormControl';

@Component({
  selector: 'schema-semantic-type-unit',
  templateUrl: './schema-semantic-type-unit.component.html',
  styleUrls: ['./schema-semantic-type-unit.component.scss']
})
export class SchemaSemanticTypeUnitComponent implements OnInit, AfterViewInit {
  @Input() public type!: string;
  @Input() public formIndex!: number;
  @Input() public parentForm!: PropertyCapabilityFormControl | TelemetryCapabilityFormControl;
  private _editorService: EditorService;
  private _schemaService: SchemaService;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractSchemaModel> | undefined;
  public schemaDropDownControl: UntypedFormControl = new UntypedFormControl();
  public semanticTypeDropDownControl: UntypedFormControl = new UntypedFormControl();

  constructor(editorService: EditorService, schemaService: SchemaService) { 
    this._editorService = editorService;
    this._schemaService = schemaService;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.setSemanticTypeDropDowns();
    this.setSchemaDropDowns();
  }

  // TODO: Importing a Property/Telemetry model does not allow editing the schema
  //       Because the models are deserialized directly, the factory methods are not called when importing
  //       a model and so the SchemaFormControl value isn't set for `openSchemaEditor()`.
  private setSemanticTypeDropDowns(): void {
    if (this.parentForm.model && this.parentForm.model["@type"] instanceof Array && this.parentForm.model["@type"]?.length > 1) {
      // Only set Semantic Type is it's an additional @type value
      const semanticType = this._editorService.getSemanticTypeFromType(this.parentForm.model["@type"]);
      if (semanticType)
        this.changeSemanticTypeInternal(semanticType);
    }
  }

  private setSchemaDropDowns(): void {
    let model: any;

    // This is not clean.
    if (this.type === "property") {
      model = <PropertyCapabilityModel>this.parentForm?.model;
    } else if (this.type = "telemetry") {
      model = <TelemetryCapabilityModel>this.parentForm?.model;
    } else {
      return;
    }

    if (!model?.schema) return;

    this.schemaFormControl = this.parentForm.schemaFormControl;
    const key = typeof model.schema === "string" ? model.schema : model?.schema["@type"]?.toLowerCase();
    this.schemaDropDownControl.setValue(key);
  }

  // TODO: Passing validSchemaTypes to the FilterPipe doesn't get re-evaluated on changes
  //       Ideally, we'd use the FilterPipe in the component view to filter the array values.
  //       However, the filter function only executes once and is not ever re-evaluated if the view or form changes. 
  public validSchemaTypes = (schemaType: string): boolean => {
    if (this.semanticTypeDropDownControl?.value)
      return ["double", "float", "integer", "long"].indexOf(schemaType.toLowerCase()) > -1;
    else
      return true;
  }
  
  public compareSchemas = (model1: AbstractSchemaModel, model2: AbstractSchemaModel): boolean => {
    return this._schemaService.compareSchemas(model1, model2)
  }

  public getSchemaTypes(): Array<string> {
    return this._schemaService.getSchemaTypes();
  }

  public getSemanticTypes(): Array<string> {
    return this._editorService.getSemanticTypes();
  }

  public getUnits(): string[] | undefined {
    const semanticType = this.semanticTypeDropDownControl?.value;
    if(semanticType) {
      const units = this._editorService.getUnits().get(semanticType);
      return units;
    }

    return undefined;
  }

  public isComplex(schema: string): boolean {
    if (typeof schema == 'string')
      return this._schemaService.getSchemaTypeEnum(schema) == SchemaTypeEnum.Complex;

    return false;
  }

  public changeSemanticType($event: MatSelectChange): void {
    const value = $event.value;
    this.changeSemanticTypeInternal(value);
  }

  public changeSemanticTypeInternal(value: string): void {
    const type = this.parentForm.form.get("type");
    const titleType =  this.toTitleCase(this.type);

    if (["", null, undefined].indexOf(value) > -1) {
      const semanticType = new Array<string>(titleType);
      type?.setValue(semanticType);
      const unit = this.parentForm.form.get("unit");
      unit?.setValue(undefined);
    } else {
      const semanticType = new Array<string>(titleType, value);
      type?.setValue(semanticType);

      const schema = this.parentForm.form.get("schema")?.value;

      if (typeof schema == "string" &&
          ["double", "float", "integer", "long"].indexOf(schema.toLowerCase()) === -1
      ) {
        this.parentForm.form.get("schema")?.setValue(undefined);
        this.schemaDropDownControl.setValue(undefined);
        this.schemaFormControl = undefined;
      }
    }
  }
  
  public changeSchema($event: MatSelectChange): void {
    const value = $event.value;
    this.changeSchemaInternal(value);
  }

  private changeSchemaInternal(value: any): void {
    if (!value) return;
    if (value instanceof AbstractCapabilityFormControl) return;
    const key = value.toLowerCase();
    const schemaType = this._schemaService.getSchemaTypeEnum(key);
    this.parentForm.form.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      const formControl = this._schemaService.createForm(SchemaTypeEnum[schemaType], key);
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    if(this.schemaFormControl) {
      this._editorService.openSchemaEditor(this.parentForm, this.schemaFormControl);
    }
  }

  public toTitleCase(value: string): string {
    return value.replace(
      /\w\S*/g,
      function(txt: string) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );
  }
}

