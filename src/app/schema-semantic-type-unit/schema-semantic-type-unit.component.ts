import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { EditorService } from '../services/editor/editor.service';
import { SchemaService } from '../services/schema/schema.service';

@Component({
  selector: 'schema-semantic-type-unit',
  templateUrl: './schema-semantic-type-unit.component.html',
  styleUrls: ['./schema-semantic-type-unit.component.scss']
})
export class SchemaSemanticTypeUnitComponent implements OnInit {
  @Input() public type!: string;
  @Input() public formIndex!: number;
  @Input() public parentForm!: AbstractCapabilityFormControl<AbstractCapabilityModel>;
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
    let semanticType = this.semanticTypeDropDownControl?.value;
    if(semanticType) {
      let units = this._editorService.getUnits().get(semanticType);
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
    let value = $event.value;
    this.changeSemanticTypeInternal(value);
  }

  public changeSemanticTypeInternal(value: string): void {
    let type = this.parentForm.form.get("type");

    if (["", null, undefined].indexOf(value) > -1) {
      let semanticType = new Array<string>("Property");
      type?.setValue(semanticType);
      let unit = this.parentForm.form.get("unit");
      unit?.setValue(undefined);
    } else {
      let semanticType = new Array<string>("Property", value);
      type?.setValue(semanticType);

      let schema = this.parentForm.form.get("schema")?.value;
      if (["double", "float", "integer", "long"].indexOf(schema?.toLowerCase()) === -1) {
        this.parentForm.form.get("schema")?.setValue(undefined);
        this.schemaDropDownControl.setValue(undefined);
        this.schemaFormControl = undefined;
      }
    }
  }
  
  public changeSchema($event: MatSelectChange): void {
    let value = $event.value;
    this.changeSchemaInternal(value);
  }

  private changeSchemaInternal(value: any): void {
    if (value instanceof AbstractCapabilityFormControl) return;
    let key = value.toLowerCase();
    let schemaType = this._schemaService.getSchemaTypeEnum(key);
    this.parentForm.form.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this._schemaService.createForm(SchemaTypeEnum[schemaType], key);
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    if(this.schemaFormControl)
      this._schemaService.openSchemaEditor(this.parentForm, this.schemaFormControl)
  }
}

