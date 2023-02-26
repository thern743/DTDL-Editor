import { Component, Input, OnInit } from '@angular/core';
import { RelationshipCapabilityFormControl } from '../formControls/RelationshipCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { PropertyCapabilityFormControl } from '../formControls/PropertyCapabilityFormControl';
import { FormBuilder, FormControl } from '@angular/forms';
import { LocalizationComponent } from '../localization/LocalizationComponent';
import { LocalizationService } from '../services/localization/localization.service';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'relationship-definition',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.scss']
})
export class RelationshipComponent extends LocalizationComponent implements OnInit {
  @Input() public interfaceId!: string;
  @Input() public formIndex!: [number, number];
  @Input() public relationship!: RelationshipCapabilityFormControl;
  @Input() public panelOpenState!: boolean;
  private _editorService: EditorService
  private _localizationService: LocalizationService

  constructor(editorService: EditorService, localizationService: LocalizationService, settingsService: SettingsService, formBuilder: FormBuilder) { 
    super(settingsService, formBuilder);
    this._editorService = editorService;
    this._localizationService = localizationService;
  }
 
  public ngOnInit(): void { 
    this.relationship.subscribeModelToForm(this.relationship.form);
    this.syncHeaderFields();    
  }

  public syncHeaderFields() {
    const id = this.relationship.form.get("id");
    const name = this.relationship.form.get("name");

    id?.valueChanges.subscribe(value => {      
      id.setValue(value, { emitEvent: false })
    });

    name?.valueChanges.subscribe(value => {
      name.setValue(value, { emitEvent: false })
    });    
  }

  public getFormControl(name: string): FormControl {
    return this.relationship.form.get(name) as FormControl;
  }

  public getProperties(): Array<PropertyCapabilityFormControl> {
    return (<RelationshipCapabilityFormControl>this.relationship).properties;
  }

  public filterInterfacesForExtends(interfaceId: string): Array<string> {
    return this._editorService.filterInterfacesForExtends(interfaceId)
  }

  public addPropertyToRelationship(relationship: RelationshipCapabilityFormControl) {
    this._editorService.addPropertyToRelationship(relationship);
  }

  public openDisplayNameDescriptionLanguageMap(): void {
    this._localizationService.openDisplayNameDescriptionLanguageMap(this.relationship, this.updateLocalizationCallback.bind(this));
  }
}
