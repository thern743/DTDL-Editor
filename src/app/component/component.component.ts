import { Component, Input, OnInit } from '@angular/core';
import { ComponentCapabilityFormControl } from '../models/ComponentCapabilityFormControl';
import { ICapabilityDto } from '../models/ICapabilityDto';
import { ICapabilityFormControl } from '../models/ICapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';

@Component({
  selector: 'component-definition',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @Input() public formIndex: number = 0;
  @Input() public component!: ICapabilityFormControl<ICapabilityDto>;
  panelOpenState = false;

  constructor(public editorService: EditorService) { 
    
  }

  public ngOnInit(): void { 
    
  }
}
