import { Component, OnInit } from '@angular/core';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';
import { EditorService } from '../services/editor/editor.service';
import { CapabilityNode } from '../models/CapabilityNode';
import { CapabilityFlatNode } from '../models/CapabilityFlatNode';
import { ModelTreeService } from '../services/model-tree/model-tree.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'model-tree',
  templateUrl: './model-tree.component.html',
  styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit {
  private _editorService: EditorService;
  public modelTreeService: ModelTreeService;

  constructor(editorService: EditorService, modelTreeService: ModelTreeService) {
    this._editorService = editorService;
    this.modelTreeService = modelTreeService;
  }

  public ngOnInit(): void {
    this.modelTreeService.mapDataSource(this._editorService.interfaces);
    this.subscribe();
  }  

  private subscribe() {
    this._editorService.interfaces$.subscribe((interfaces: Array<InterfaceCapabilityFormControl>) => {
      this.modelTreeService.mapDataSource(interfaces);
    });
  } 

  public getDisplayName(node: CapabilityNode): string {
    if (node.displayName)
      return node.displayName
    else if (node.id) {
      const result = this._editorService.parseNameFromDtmi(node.id);
      return result;
    } else if (node.type) {
      return node.type;
    } else {
      return "Unknown";
    }
  }

  public hasChild = (_: number, node: CapabilityFlatNode) => this.modelTreeService.hasChild(_, node);

  public isExpanded(node: CapabilityFlatNode): boolean {
    return this.modelTreeService.treeControl.isExpanded(node);
  }

  public drop($event: any) {

  }
}