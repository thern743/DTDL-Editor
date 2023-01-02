import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { FieldCapabilityFormControl } from '../formControls/FieldCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { SchemaService } from '../services/schema/schema.service';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { MatSelectChange } from '@angular/material/select';
import { SchemaTypeEnum } from '../models/SchemaTypeEnum';

@Component({
  selector: 'field-schema',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() public formIndex!: number;
  @Input() public field!: FieldCapabilityFormControl;
  @Input() public panelOpenState = true;
  public schemaService: SchemaService;
  public editorService: EditorService;
  public dialog: MatDialog;
  public schemaTypes: Array<string>;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;

  constructor(schemaEditorService: SchemaService, editorService: EditorService, dialog: MatDialog) {
    this.schemaService = schemaEditorService;
    this.editorService = editorService;
    this.dialog = dialog;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void {
    this.field.subscribeModelToForm();
  }

  private getSchemaTypes(): Array<string> {
    return this.schemaService.getSchemaTypes();
  }

  public isComplex(schema: string): boolean {
    return this.schemaService.getSchemaTypeEnum(schema) == SchemaTypeEnum.Complex;
  }

  public changeSchema($event: MatSelectChange): void {
    if ($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaType = this.schemaService.getSchemaTypeEnum(key);
    this.field.form.get("schema")?.setValue(key);

    if (schemaType == SchemaTypeEnum.Complex) {
      let formControl = this.schemaService.createForm(SchemaTypeEnum[schemaType], key);
      if (formControl === undefined) return;
      this.schemaFormControl = formControl;
    }
  }

  public openSchemaEditor(): void {
    this.schemaService.openSchemaEditor(this.field.form, this.schemaFormControl)
  }
}