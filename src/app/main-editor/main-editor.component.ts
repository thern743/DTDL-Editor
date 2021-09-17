import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainEditorServiceService } from './main-editor-service.service'

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.less']
})

export class MainEditorComponent implements OnInit {
  displayName = new FormControl('');
  name = new FormControl('');
  capabilityType = new FormControl('');
  semanticType = new FormControl('');
  capabilities: string[];
  semantics: string[];

  constructor(MainEditorServiceService: MainEditorServiceService) { 
    this.capabilities = MainEditorServiceService.getCapabilityTypes();
    this.semantics= MainEditorServiceService.getSemanticTypes();
  }

  ngOnInit(): void {

  }

}
