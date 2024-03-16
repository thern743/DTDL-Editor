import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { FieldCapabilityFormControl } from '../formControls/FieldCapabilityFormControl';
import { EditorService } from '../services/editor/editor.service';
import { SchemaService } from '../services/schema/schema.service';
import { MatSelectChange } from '@angular/material/select';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';
import { AbstractSchemaModel } from '../models/AbstractSchemaModel';

@Component({
  selector: 'field-schema',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {
  @Input() public formIndex!: number;
  @Input() public field!: FieldCapabilityFormControl;
  @Input() public panelOpenState = true;
  public dialog: MatDialog;
  public schemaTypes: Array<string>;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractSchemaModel>;
  private _schemaService: SchemaService;
  private _editorService: EditorService;

  constructor(schemaEditorService: SchemaService, editorService: EditorService, dialog: MatDialog) {
    this._schemaService = schemaEditorService;
    this._editorService = editorService;
    this.dialog = dialog;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void {
    this.field.subscribeModelToForm(this.field.form);
  }

  public ngOnDestroy(): void {
    this.field.unsubscribeModelFromForm();
  }

  private getSchemaTypes(): Array<string> {
    return this._schemaService.getSchemaTypes();
  }

  public isComplex(schema: string): boolean {
    return this._schemaService.getSchemaTypeEnum(schema) == SchemaTypeEnum.Complex;
  }

  public compareSchemas(model1: AbstractSchemaModel, model2: AbstractSchemaModel): boolean {
    return this._schemaService.compareSchemas(model1, model2);
  }

  public changeSchema($event: MatSelectChange): void {
    if ($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this._schemaService.getSchemaTypeEnum(key);
    this.field.form.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this._schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if (formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    this._editorService.openSchemaEditor(this.field, this.schemaFormControl)
  }
}