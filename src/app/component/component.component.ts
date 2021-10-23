import { Component, Input, OnInit } from '@angular/core';
import { ICapabilityModel } from '../models/ICapabilityModel';
import { ICapabilityFormControl } from '../formControls/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'component-definition',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @Input() public formIndex: number = 0;
  @Input() public component!: ICapabilityFormControl<ICapabilityModel>;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  public ngOnInit(): void { 
    this.component.subscribe();
  }
}
