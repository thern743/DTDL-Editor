import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.less']
})

export class MainEditorComponent implements OnInit {
  displayName = new FormControl('');
  name = new FormControl('');
  capabilityType = new FormControl('');
  semanticType = new FormControl('');

  constructor() { }

  ngOnInit(): void {

  }

}
