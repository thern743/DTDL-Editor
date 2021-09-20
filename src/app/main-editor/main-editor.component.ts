import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditorService } from '../services/editor/editor-service.service'

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.less']
})

export class MainEditorComponent implements OnInit {
  panelOpenState = true;
  editorService: EditorService;
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
  commandType = new FormControl('');

  constructor(editorService: EditorService) {
    this.editorService = editorService;
    this.context.setValue("dtmi:dtdl:context;2");
  }

  ngOnInit(): void {

  }

  action(): void {}
}
