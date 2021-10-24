import { Component, OnInit } from '@angular/core';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { EditorService } from '../services/editor/editor-service.service';
import { ModelTreeService } from '../services/model-tree/ModelTreeService';

@Component({
  selector: 'model-tree',
  templateUrl: './model-tree.component.html',
  styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit {
  public editorService: EditorService
  public modelTreeService: ModelTreeService;

  constructor(editorService: EditorService, modelTreeService: ModelTreeService) {
    this.editorService = editorService;
    this.modelTreeService = modelTreeService;
  }

  public ngOnInit(): void {
    this.modelTreeService.mapDataSource(this.editorService.interfaces);
    this.subscribe();
  }  

  private subscribe() {
    // TODO: Make this more efficient.
    this.editorService.interfaces$.subscribe((interfaceInstance: InterfaceCapabilityFormControl) => {
      this.modelTreeService.mapDataSource(this.editorService.interfaces);
      //this.modelTreeService.addNode(interfaceInstance);
    });
  } 
}