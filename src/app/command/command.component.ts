import { Component, Input, OnInit, Type } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DtdlModelForm } from '../models/DtdlModelForm';
import { EditorService } from '../services/editor/editor-service.service'


@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandPayloadComponent implements OnInit {
  @Input() formIndex: number = 0;
  commandForm: FormGroup = this.fb.group({});
  panelOpenState = false;
  
  constructor(public editorService: EditorService, private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
  }

  action(): void {}

}
