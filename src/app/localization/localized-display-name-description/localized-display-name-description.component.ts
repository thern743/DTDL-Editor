import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LanguageMapComponent } from '../language-map/language-map.component';

@Component({
  selector: 'localized-display-name-description',
  templateUrl: './localized-display-name-description.component.html',
  styleUrls: ['./localized-display-name-description.component.scss']
})
export class LocalizedDisplayNameDescriptionComponent implements OnInit {
  @ViewChild("displayNameComponent") displayNameComponent!: LanguageMapComponent;
  @ViewChild("descriptionComponent") descriptionComponent!: LanguageMapComponent;
  private _formBuilder: UntypedFormBuilder;

  constructor(formBuilder: UntypedFormBuilder) { 
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {

  }

  public toFormGroup(): UntypedFormGroup {
    const formGroup = this._formBuilder.group({
      displayName: this.displayNameComponent?.getData(),
      description: this.descriptionComponent?.getData()
    });

    return formGroup;
  }

  public addLocale(): void {
    this.displayNameComponent.addLocale();
    this.descriptionComponent.addLocale();
  }
}
