import { Component, Input, OnInit } from '@angular/core';
import { ComponentCapability } from '../models/ComponentCapability';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'component-definition',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @Input() formIndex: number = 0;
  @Input() component!: ComponentCapability;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  ngOnInit(): void { 
    
  }
}
