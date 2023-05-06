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
  private _previousSemanticType: string = "";

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

  private setSemanticTypeDropDowns(): void {
    if (this.parentForm.model && this.parentForm.model["@type"] instanceof Array && this.parentForm.model["@type"]?.length > 1) {
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

  public getSemanticTypes(): Array<string> | undefined {
    const schemaType = this.schemaDropDownControl?.value;
    if(["double", "float", "integer", "long"].indexOf(schemaType) > -1) {
      const semanticTypes = this._editorService.semanticTypes;
      return semanticTypes;
    }

    return undefined;
  }

  public getUnits(): Array<string> | undefined {
    const semanticType = this.semanticTypeDropDownControl?.value;
    if(semanticType) {
      const units = this._editorService.units.get(semanticType);
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
    const typeForm = this.parentForm.form.get("type");
    const typesArray = (typeForm?.value instanceof Array) ? typeForm.value : new Array<string>(typeForm?.value);
    const idx = typesArray.indexOf(this._previousSemanticType);
    
    if(idx > -1)
      typesArray.splice(idx, 1);

    if (["", null, undefined].indexOf(value) > -1) {
      typeForm?.setValue(typesArray);
      const unitForm = this.parentForm.form.get("unit");
      unitForm?.setValue(undefined);
    } else {
      // When model is imported value already exist in the array so we just need to set the dropdown.
      if (typesArray.indexOf(value) === -1)
        typesArray.push(value);
      else
        this.semanticTypeDropDownControl.setValue(value);

      typeForm?.setValue(typesArray);

      const schema = this.parentForm.form.get("schema")?.value;

      if (typeof schema === "string" &&
          ["double", "float", "integer", "long"].indexOf(schema.toLowerCase()) === -1
      ) {
        this.parentForm.form.get("schema")?.setValue(undefined);
        this.schemaDropDownControl.setValue(undefined);
        this.schemaFormControl = undefined;
      }
    }

    this._previousSemanticType = value;
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
      return this._editorService.toTitleCase(value);
  }
}

