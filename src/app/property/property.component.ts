import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';
import { MatSelectChange } from '@angular/material/select';
import { SemanticTypeArray } from '../models/SemanticTypeArray';
import { MatDialog } from '@angular/material/dialog';
import { ObjectSchemaComponent } from '../object-schema/object-schema.component';
import { ObjectSchemaService } from '../services/object-schema/object-schema.service';
import { FieldCapabilityModel } from '../models/FieldCapabilityModel';
import { ObjectSchemaFormControl } from '../formControls/ObjectSchemaFormControl';
import { AbstractCapabilityModel } from '../models/AbstractCapabilityModel';
import { ObjectSchemaCapbilityModel } from '../models/ObjectSchemaCapbilityModel';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';

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
  public objectSchemaService: ObjectSchemaService;
  public dialog: MatDialog;

  constructor(editorService: EditorService, objectSchemaEditor: ObjectSchemaService, dialog: MatDialog) { 
    this.editorService = editorService;
    this.objectSchemaService = objectSchemaEditor;
    this.dialog = dialog;
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

  public getUnits(): string[] | undefined {
    let unit = this.property.form.get("semanticType")?.value;
    let units = this.editorService.getUnits().get(unit);
    return units;
  }

  public changeSemanticType($event: MatSelectChange): void {
    let type = this.property.form.get("type");

    if(["", null, undefined].indexOf($event.value) > -1) {
      let val = new SemanticTypeArray("Property");
      type?.setValue(val);      
      let unit = this.property.form.get("unit");
      unit?.setValue(undefined);
    } else {
      let val = new SemanticTypeArray("Property", $event.value);
      type?.setValue(val);
    }
  }
}
