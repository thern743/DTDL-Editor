import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DtdlModelForm } from '../models/DtdlModelForm';

@Component({
  selector: 'preview-panel',
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.scss']
})
export class PreviewPanelComponent implements OnInit {
  panelOpenState = true;
  dtdlModelMainForm: FormGroup;

  constructor(dtdlModelForm: DtdlModelForm) { 
    this.dtdlModelMainForm =  dtdlModelForm.mainForm;
  }

  ngOnInit(): void {
  }

  action(): void {}
}
