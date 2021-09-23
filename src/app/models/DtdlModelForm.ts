import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DtdlModelForm {
  mainForm = this.fb.group({
    id: [''],
    classType: [''],
    displayName: [''],
    name: [''],
    context: [''],
    comment: [''],
    description: [''],
    jsonDoc: [''],
    contents: this.fb.array([
      this.fb.control('')
    ])
  });
  
  constructor(private fb: FormBuilder) {
  }  
}
