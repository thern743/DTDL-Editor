import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})
export class MainEditorComponent implements OnInit {

  constructor(public editorService: EditorService) {

  }

  ngOnInit(): void {
    
  }
}