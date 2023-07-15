import { Component, OnInit, Input, Type, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnumValueCapabilityFormControl } from '../../formControls/EnumValueCapabilityFormControl';
import { EditorService } from '../../services/editor/editor.service';
import { SchemaService } from '../../services/schema/schema.service';

@Component({
  selector: 'enum-value',
  templateUrl: './enum-value.component.html',
  styleUrls: ['./enum-value.component.scss']
})
export class EnumValueComponent implements OnInit, OnDestroy {
  @Input() public formIndex!: number;
  @Input() public enumValue!: EnumValueCapabilityFormControl;
  @Input() public valueSchema!: string;
  @Input() public panelOpenState = true;
  public schemaService: SchemaService;
  public editorService: EditorService;
  public dialog: MatDialog;
  public schemaTypes: Array<string>;

  constructor(schemaEditorService: SchemaService, editorService: EditorService, dialog: MatDialog) { 
    this.schemaService = schemaEditorService; 
    this.editorService = editorService;
    this.dialog = dialog;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void {
    this.enumValue.subscribeModelToForm(this.enumValue.form);
  }

  public ngOnDestroy(): void {
    this.enumValue.unsubscribeModelFromForm();
  }

  private getSchemaTypes(): Array<string> {
    return this.schemaService.getSchemaTypes();
  }

  public setValueInModel($event: any): void {
    if (this.valueSchema === "integer") {
      this.enumValue.model.enumValue = parseInt($event?.target?.value);
    } else {
      this.enumValue.model.enumValue = $event?.target?.value;
    }
  }
}