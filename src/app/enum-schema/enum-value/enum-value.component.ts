import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { EnumValueCapabilityFormControl } from 'src/app/formControls/EnumValueCapabilityFormControl';
import { AbstractCapabilityFormControl } from '../../formControls/AbstractCapabilityFormControl';
import { EditorService } from '../../services/editor/editor-service.service';
import { SchemaService } from '../../services/schema/schema.service';
import { AbstractCapabilityModel } from '../../models/AbstractCapabilityModel';

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
  public schemaTypes: Array<string>;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;

  constructor(schemaEditorService: SchemaService, editorSerivce: EditorService, dialog: MatDialog) { 
    this.schemaService = schemaEditorService; 
    this.editorService = editorSerivce;
    this.dialog = dialog;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void {
    this.enumValue.subscribeModelToForm();
  }

  private getSchemaTypes(): Array<string> {
    let schemaTypes = new Array<string>();
    
    this.schemaService.schemaFactory.formRegistry.get("Primitive")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    this.schemaService.schemaFactory.formRegistry.get("Complex")?.forEach((value, key) => {
      schemaTypes.push(key);
    });

    return schemaTypes;
  }

  public changeSchema($event: MatSelectChange): void {
    if($event.value instanceof AbstractCapabilityFormControl) return;
    let key = $event.value.toLowerCase();
    let schemaTypeString = this.schemaService.getSchemaTypeString(key);
    let formControl = this.schemaService.createForm(schemaTypeString, key);
    if(formControl === undefined) return;
    this.schemaFormControl = formControl;
  }

  public openSchemaEditor(): void {
    this.schemaService.openSchemaEditor(this.enumValue.form, this.schemaFormControl)
  }
}