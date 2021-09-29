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
  propertyForm!: FormGroup;
  panelOpenState = false;

  constructor(public editorService: EditorService, private fb: FormBuilder) { 
    
  }

  ngOnInit(): void { 
    this.propertyForm = this.property.toFormGroup();
  }
}
