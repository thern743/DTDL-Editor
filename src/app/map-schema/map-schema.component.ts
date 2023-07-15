import { Component, Input, OnInit } from '@angular/core';
import { SchemaService } from '../services/schema/schema.service';
import { EditorService } from '../services/editor/editor.service';
import { MapKeyFormControl } from '../formControls/MapKeyFormControl';
import { MapValueFormControl } from '../formControls/MapValueFormControl';
import { MapSchemaFormControl } from '../formControls/schemas/MapSchemaFormControl';
import { SchemaModalResult } from '../models/SchemaModalResult';

@Component({
  selector: 'map-schema',
  templateUrl: './map-schema.component.html',
  styleUrls: ['./map-schema.component.scss']
})
export class MapSchemaComponent implements OnInit {
  @Input()
  public map!: MapSchemaFormControl;
  public panelOpenState = true;
  public keySchemaTypes: Array<string>;
  public valueSchemaTypes: Array<string>;
  public keySchemaFormControl!: MapKeyFormControl;
  public valueSchemaFormControl!: MapValueFormControl;
  private _editorService: EditorService;
  private _schemaService: SchemaService;

  constructor(editorService: EditorService, schemaService: SchemaService) {
    this._editorService = editorService;
    this._schemaService = schemaService;
    this.keySchemaTypes = new Array<string>();
    this.valueSchemaTypes = new Array<string>();
    this.mapKeysAndValues();
  }

  public ngOnInit(): void {
    this.map.subscribeModelToForm(this.map.form);
  }

  private mapKeysAndValues(): void {
    this._schemaService.getFormsRegistry().get("MapKey")?.forEach((value, key) => {
      this.keySchemaTypes.push(key);
    });

    this._schemaService.getModelsRegistry().get("MapValue")?.forEach((value, key) => {
      this.valueSchemaTypes.push(key)
    });
  }
}
