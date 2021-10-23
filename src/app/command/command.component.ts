import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommandCapabilityFormControl } from '../models/CommandCapabilityFormControl';
import { ICapabilityDto } from '../models/ICapabilityDto';
import { ICapabilityFormControl } from '../models/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service'


@Component({
  selector: 'command-definition',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandPayloadComponent implements OnInit {
  @Input() formIndex: number = 0;
  @Input() command!: ICapabilityFormControl<ICapabilityDto>;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  public ngOnInit(): void {  
    
  }
}
