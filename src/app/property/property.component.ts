import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DtdlModelForm } from '../models/DtdlModelForm';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'property-definition',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  editorService: EditorService;
  panelOpenState = false;
  propertyForm: FormGroup;

  constructor(editorService: EditorService, dtdlModelForm: DtdlModelForm) { 
    this.editorService = editorService;
    this.propertyForm = dtdlModelForm.propertyForm;
  }

  ngOnInit(): void {
  }

}
