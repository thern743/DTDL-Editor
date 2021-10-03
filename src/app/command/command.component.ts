import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommandCapability } from '../models/CommandCapability';
import { EditorService } from '../services/editor/editor-service.service'


@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandPayloadComponent implements OnInit {
  @Input() formIndex: number = 0;
  @Input() command!: CommandCapability;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  ngOnInit(): void {  
    
  }
}
