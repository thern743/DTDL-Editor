import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EditorService } from '../services/editor/editor-service.service'


@Component({
  selector: 'command-payload',
  templateUrl: './command-payload.component.html',
  styleUrls: ['./command-payload.component.less']
})
export class CommandPayloadComponent implements OnInit {
  editorService: EditorService;
  panelOpenState = false;
  commandPayload = new FormGroup({
    payloadName: new FormControl(),
    payloadSchema: new FormControl(),
    payloadId: new FormControl(),
    payloadComment: new FormControl(),
    payloadDescription: new FormControl(),
    payloadDisplayName: new FormControl()
  });

  constructor(editorService: EditorService) { 
    this.editorService = editorService;
  }

  ngOnInit(): void {
  }

  action(): void {}

}
