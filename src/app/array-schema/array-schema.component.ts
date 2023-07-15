import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { ArraySchemaFormControl } from '../formControls/schemas/ArraySchemaFormControl';
import { SchemaService } from '../services/schema/schema.service';
import { MatSelectChange } from '@angular/material/select';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';
import { EditorService } from '../services/editor/editor.service';

@Component({
  selector: 'array-schema',
  templateUrl: './array-schema.component.html',
  styleUrls: ['./array-schema.component.scss']
})
export class ArraySchemaComponent implements OnInit, OnDestroy {
  @Input()
  public array!: ArraySchemaFormControl;
  public panelOpenState = true;
  public schemaTypes: Array<string>;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractSchemaModel>;
  private _editorService: EditorService;
  public _schemaService: SchemaService;
  
  constructor(editorService: EditorService, schemaService: SchemaService) {
    this._editorService = editorService;
    this._schemaService = schemaService;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void {
    this.array.subscribeModelToForm(this.array.form);
  }

  public ngOnDestroy(): void {
    this.array.unsubscribeModelFromForm();
  }

  private getSchemaTypes(): Array<string> {
    return this._schemaService.getSchemaTypes();
  }

  public isComplex(schema: string): boolean {
    return this._schemaService.getSchemaTypeEnum(schema) == SchemaTypeEnum.Complex;
  }

  public compareSchemas = (model1: AbstractSchemaModel, model2: AbstractSchemaModel): boolean => {
    return this._schemaService.compareSchemas(model1, model2)
  }

  public changeSchema($event: MatSelectChange): void {
    if ($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this._schemaService.getSchemaTypeEnum(key);
    this.array.form.get("elementSchema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this._schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if (formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    this._editorService.openSchemaEditor(this.array, this.schemaFormControl)
  }
}
