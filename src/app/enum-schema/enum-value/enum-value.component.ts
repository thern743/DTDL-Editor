import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnumValueCapabilityFormControl } from 'src/app/formControls/EnumValueCapabilityFormControl';
import { AbstractCapabilityFormControl } from '../../formControls/AbstractCapabilityFormControl';
import { ICapabilityModel } from '../../models/ICapabilityModel';
import { ISchemaEditor } from '../../models/ISchemaEditor';
import { EditorService } from '../../services/editor/editor-service.service';
import { SchemaService } from '../../services/schema/schema.service';

@Component({
  selector: 'enum-value-schema',
  templateUrl: './enum-value.component.html',
  styleUrls: ['./enum-value.component.scss']
})
export class EnumValueComponent implements OnInit {
  @Input() public formIndex!: number;
  @Input() public enumValue!: EnumValueCapabilityFormControl;
  @Input() public panelOpenState = true;
  public schemaService: SchemaService;
  public editorService: EditorService;
  public dialog: MatDialog;
  public schemaTypes: Map<string, AbstractCapabilityFormControl<ICapabilityModel>>;

  constructor(schemaEditorService: SchemaService, editorSerivce: EditorService, dialog: MatDialog) { 
    this.schemaService = schemaEditorService; 
    this.editorService = editorSerivce;
    this.dialog = dialog;
    this.schemaTypes = this.schemaService.getSchemaTypesFormControls();
  }

  public ngOnInit(): void {
    this.enumValue.subscribeModelToForm();
  }

  public openEditor(type: string): void {
    let form = this.schemaTypes.get(type.toLowerCase());
    if(form === undefined) return;
    // TODO: This is a hack. Figure out a better solution.
    (<ISchemaEditor><unknown>form).openSchemaEditor(this.enumValue.form);
  }
}