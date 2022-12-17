import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';
import { MatSelectChange } from '@angular/material/select';
import { SemanticTypeArray } from '../models/SemanticTypeArray';
import { MatDialog } from '@angular/material/dialog';
import { SchemaService } from '../services/schema/schema.service';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';
import { AbstractCapabilityFormControl } from '../formControls/AbstractCapabilityFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';

@Component({
  selector: 'property-definition',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() public formIndex!: [number, number];
  @Input() public property!: PropertyCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  public editorService: EditorService;
  public schemaService: SchemaService;
  public dialog: MatDialog;
  public schemaTypes: Array<string>;
  public schemaFormControl!: AbstractCapabilityFormControl<AbstractCapabilityModel>;
  
  constructor(editorService: EditorService, schemaService: SchemaService, dialog: MatDialog) { 
    this.editorService = editorService;
    this.schemaService = schemaService;
    this.dialog = dialog;
    this.schemaTypes = this.getSchemaTypes();
  }

  public ngOnInit(): void { 
    this.property.subscribeModelToForm();
    this.syncHeaderFields();
  }

  public syncHeaderFields() {
    const id = this.property.form.get("id");
    const name = this.property.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
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

  public getUnits(): string[] | undefined {
    let unit = this.property.form.get("semanticType")?.value;
    let units = this.editorService.getUnits().get(unit);
    return units;
  }

  public changeSemanticType($event: MatSelectChange): void {
    let type = this.property.form.get("type");

    if(["", null, undefined].indexOf($event.value) > -1) {
      let semanticType = new SemanticTypeArray("Property");
      type?.setValue(semanticType);      
      let unit = this.property.form.get("unit");
      unit?.setValue(undefined);
    } else {
      let semanticType = new SemanticTypeArray("Property", $event.value);
      type?.setValue(semanticType);
    }
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
    this.schemaService.openSchemaEditor(this.property.form, this.schemaFormControl)
  }
}
