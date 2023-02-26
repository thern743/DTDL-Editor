import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LanguageMapComponent } from '../language-map/language-map.component';

@Component({
  selector: 'localized-display-name-description',
  templateUrl: './localized-display-name-description.component.html',
  styleUrls: ['./localized-display-name-description.component.scss']
})
export class LocalizedDisplayNameDescriptionComponent implements OnInit {
  @ViewChild("displayNameComponent") displayNameComponent!: LanguageMapComponent;
  @ViewChild("descriptionComponent") descriptionComponent!: LanguageMapComponent;
  private _formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) { 
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {

  }

  public toFormGroup(): FormGroup {
    const formGroup = this._formBuilder.group({
      displayName: this.displayNameComponent?.getData(),
      description: this.descriptionComponent?.getData()
    });

    return formGroup;
  }
}
