import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';
import { ComponentCapabilityFormControl } from '../formControls/ComponentCapabilityFormControl';

@Component({
  selector: 'component-definition',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @Input() public interfaceId!: string;
  @Input() public formIndex!: [number, number];
  @Input() public component!: ComponentCapabilityFormControl;
  @Input() public panelOpenState!: boolean;

  constructor(public editorService: EditorService) { 
    
  }

  public ngOnInit(): void { 
    this.component.subscribeModelToForm();
    this.syncHeaderFields();    
  }

  public syncHeaderFields() {
    const id = this.component.form.get("id");
    const name = this.component.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
  }
}
