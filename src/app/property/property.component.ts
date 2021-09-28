import { Component, Input, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DtdlModelForm } from '../models/DtdlModelForm';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'property-definition',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() formIndex: number = 0;
  propertyForm: FormGroup = this.fb.group({});
  panelOpenState = false;

  constructor(public editorService: EditorService, private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
  }

}
