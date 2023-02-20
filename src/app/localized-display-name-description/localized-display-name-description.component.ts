import { Input, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'localized-display-name-description',
  templateUrl: './localized-display-name-description.component.html',
  styleUrls: ['./localized-display-name-description.component.scss']
})
export class LocalizedDisplayNameDescriptionComponent implements OnInit {
  private _formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) { 
    this._formBuilder = formBuilder;
  }

  public ngOnInit(): void {

  }

  public buildFormResult(): FormGroup {
    return this._formBuilder.group({});
  }
}
