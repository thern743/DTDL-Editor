import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { EditorService } from '../services/editor/editor-service.service';
import { InterfaceCapabilityFormControl } from '../formControls/InterfaceCapabilityFormControl';

@Component({
  selector: 'model-tree',
  templateUrl: './model-tree.component.html',
  styleUrls: ['./model-tree.component.scss']
})
export class ModelTreeComponent implements OnInit {
  public treeControl!: NestedTreeControl<InterfaceCapabilityFormControl>;
  public showFiller: boolean = true;
  public editorService: EditorService;

  constructor(editorService: EditorService) {
    this.editorService = editorService;
    this.treeControl = new NestedTreeControl<InterfaceCapabilityFormControl>(this.getChildren);
  }

  ngOnInit(): void {
    this.editorService.treeDataSource.data = this.editorService.interfaces;
  }

  getChildren = (node: InterfaceCapabilityFormControl) => node instanceof InterfaceCapabilityFormControl ? node?.contents as InterfaceCapabilityFormControl[] : null;

  hasChild = (_: number, node: InterfaceCapabilityFormControl) => node instanceof InterfaceCapabilityFormControl ? !!node.contents && node.contents.length > 0 : false;
}