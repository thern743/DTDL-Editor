import { Component, Input, OnInit } from '@angular/core';
import { EditorService } from '../services/editor/editor-service.service';
import { ComponentCapabilityFormControl } from '../formControls/ComponentCapabilityFormControl';
import { FormControl } from '@angular/forms';
import { LocalizationComponent } from '../localization/LocalizationComponent';
import { LocalizationService } from '../services/localization/localization.service';

@Component({
  selector: 'component-definition',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent extends LocalizationComponent implements OnInit {
  @Input() public interfaceId!: string;
  @Input() public formIndex!: [number, number];
  @Input() public component!: ComponentCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  private _editorService: EditorService;
  private _localizationService: LocalizationService;

  constructor(editorService: EditorService, localizationService: LocalizationService) { 
    super();
    this._editorService = editorService;
    this._localizationService = localizationService;
  }

  public ngOnInit(): void { 
    this.component.subscribeModelToForm();
    this.syncHeaderFields();    
  }

  public getFormControl(name: string): FormControl {
    return this.component.form.get(name) as FormControl;
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

  public filterInterfacesForExtends(interfaceId: string): Array<string> {
    return this._editorService.filterInterfacesForExtends(interfaceId);
  }

  public openDisplayNameDescriptionLanguageMap(): void {
    this._localizationService.openDisplayNameDescriptionLanguageMap(this.component, this.updateLocalizationCallback.bind(this));
  }
}
