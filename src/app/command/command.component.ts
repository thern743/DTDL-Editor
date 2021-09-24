import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DtdlModelForm } from '../models/DtdlModelForm';
import { EditorService } from '../services/editor/editor-service.service'


@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.less']
})
export class CommandPayloadComponent implements OnInit {
  editorService: EditorService;
  panelOpenState = false;
  commandForm: FormGroup;

  constructor(editorService: EditorService, dtdlModelForm: DtdlModelForm) { 
    this.editorService = editorService;
    this.commandForm = dtdlModelForm.commandForm;
  }

  ngOnInit(): void {
  }

  action(): void {}

}
