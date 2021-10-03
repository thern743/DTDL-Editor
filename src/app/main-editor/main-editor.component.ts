import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DtdlModelForm } from "../models/DtdlModelForm";
import { InterfaceCapability } from '../models/InterfaceCapability';

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})
export class MainEditorComponent implements OnInit {

  constructor(public dtdlModelform: DtdlModelForm, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    let interfaceInstance = new InterfaceCapability(this.fb);
    this.dtdlModelform.interfaces.push(interfaceInstance);
  }
}
