import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommandCapabilityFormControl } from '../models/CommandCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service'


@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandPayloadComponent implements OnInit {
  @Input() formIndex: number = 0;
  @Input() command!: CommandCapabilityFormControl;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  ngOnInit(): void {  
    
  }
}
