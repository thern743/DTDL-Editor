import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor.service';
import { ComponentCapabilityFormControl } from '../formControls/ComponentCapabilityFormControl';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'component-definition',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit, OnDestroy {
  @Input() public interfaceId!: string;
  @Input() public formIndex!: [number, number];
  @Input() public component!: ComponentCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  private _editorService: EditorService;

  constructor(editorService: EditorService) {
    this._editorService = editorService;
  }
  
  public ngOnInit(): void { 
    this.component.subscribeModelToForm(this.component.form);
    this.syncHeaderFields();    
  }

  public ngOnDestroy(): void {
    this.component.unsubscribeModelFromForm();
  }

  public getFormControl(name: string): UntypedFormControl {
    return this.component.form.get(name) as UntypedFormControl;
  }

  public syncHeaderFields() {
    const id = this.component.form.get("@id");
    const name = this.component.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
  }

  public filterInterfacesForExtends(interfaceId: string): Array<string> {
    return this._editorService.filterInterfacesForExtends(interfaceId);
  }
}
