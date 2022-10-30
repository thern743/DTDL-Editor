import { Component } from '@angular/core';
import { SchemaService } from './services/schema/schema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'DTDL Editor';
  public menuOpenState = true;
  public navOpenState = false;
  public treeView = false;

  constructor(schemaService: SchemaService) { 
    schemaService.registerForms();
    schemaService.registerModels();
    schemaService.registerMapForms();
    schemaService.registerMapModels();
  }
}
