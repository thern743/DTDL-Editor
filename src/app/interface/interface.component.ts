import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service'
import { InterfaceCapability } from '../models/InterfaceCapability';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'interface-definition',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})

export class InterfaceComponent implements OnInit {
  // TODO: Support multiple interfaces from main editor.
  //@Input() formIndex: number = 0;
  formIndex: number = 0;
  @Input() interface!: InterfaceCapability;
  interfaceForm!: FormGroup;
  panelOpenState = true;
  
  constructor(public editorService: EditorService) {
   
  }

  ngOnInit(): void {
    this.interfaceForm = this.interface?.toFormGroup();
  }
}
