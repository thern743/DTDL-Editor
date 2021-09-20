import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainEditorServiceService } from '../services/mainEditor/main-editor-service.service'

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.less']
})

export class MainEditorComponent implements OnInit {
  context = new FormControl('');
  id = new FormControl('');
  classType = new FormControl('');
  comment = new FormControl('');
  description = new FormControl('');
  displayName = new FormControl('');
  name = new FormControl('');
  capabilityType = new FormControl('');
  semanticType = new FormControl('');
  schema = new FormControl('');
  extends = new FormControl('');
  writable = new FormControl('');

  classTypes: string[];
  capabilities: string[];
  semantics: string[];
  schemaTypes: string[];
  complexShcemaTypes: string[];
  interfaces: string[];

  constructor(MainEditorServiceService: MainEditorServiceService) { 
    this.classTypes = MainEditorServiceService.getClassTypes();
    this.capabilities = MainEditorServiceService.getCapabilityTypes();
    this.semantics= MainEditorServiceService.getSemanticTypes();
    this.schemaTypes = MainEditorServiceService.getSchemaTypes();
    this.complexShcemaTypes = MainEditorServiceService.getComplexSchemaTypes();
    this.interfaces = new Array();

    this.context.setValue("dtmi:dtdl:context;2");
  }

  ngOnInit(): void {

  }

}
