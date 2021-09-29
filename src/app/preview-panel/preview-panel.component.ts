import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DtdlModelForm } from '../models/DtdlModelForm';
import { InterfaceCapability } from '../models/InterfaceCapability';

@Component({
  selector: 'preview-panel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.scss']
})
export class PreviewPanelComponent implements OnInit {
  panelOpenState = true;
  @Input() interfaceForm!: FormGroup;

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

  action(): void {}
}
