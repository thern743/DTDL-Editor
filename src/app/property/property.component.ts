import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropertyCapability } from '../models/PropertyCapability';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'property-definition',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() formIndex: number = 0;
  @Input() property!: PropertyCapability;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  ngOnInit(): void { 
    
  }
}
