import { Injectable } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { CapabilityNode } from "../../models/CapabilityNode";
import { AbstractCapabilityModel } from "../../models/AbstractCapabilityModel";
import { InterfaceCapabilityFormControl } from "../../formControls/InterfaceCapabilityFormControl";
import { CapabilityFlatNode } from "../../models/CapabilityFlatNode";
import { RelationshipCapabilityModel } from "../../models/RelationshipCapabilityModel";
import { LocalizationService } from "../localization/localization.service";
import { ICapabilityModel } from "src/app/models/interfaces/ICapabilityModel";

@Injectable({
  providedIn: 'root'
})
export class ModelTreeService {
  public treeControl!: FlatTreeControl<CapabilityFlatNode>;
  public treeDataSource: MatTreeFlatDataSource<CapabilityNode, CapabilityFlatNode>;
  public showFiller: boolean = true;
  public treeFlattener: MatTreeFlattener<CapabilityNode, CapabilityFlatNode>;
  private _localizationService: LocalizationService;

  constructor(localizationService: LocalizationService) {
    this._localizationService = localizationService;
    this.treeControl = new FlatTreeControl<CapabilityFlatNode>(node => node.level, node => node.expandable);
    this.treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  public mapDataSource(interfaces: Array<InterfaceCapabilityFormControl>): void {
    let data = new Array<CapabilityNode>();

    interfaces.forEach((interfaceInstance: InterfaceCapabilityFormControl) => {
      const type = interfaceInstance.model["@type"] instanceof Array ? interfaceInstance.model["@type"][0] : interfaceInstance.model["@type"];
      const dtmi = interfaceInstance.model["@id"];
      const displayName = this.getDisplayName(interfaceInstance.model);

      let node = new CapabilityNode(dtmi, type, displayName);
      node = this.mapChildren(interfaceInstance.model.contents, node);
      data.push(node);
    });

    this.treeDataSource.data = data;
    this.treeControl.collapseAll();
  }

  public mapChildren(capabilities: AbstractCapabilityModel[], node: CapabilityNode): CapabilityNode {
    capabilities.forEach((capability: AbstractCapabilityModel) => {
      const type = capability["@type"] instanceof Array ? capability["@type"][0] : capability["@type"];
      const dtmi = capability["@id"];
      const displayName = this.getDisplayName(capability);

      if (type == "Relationship") {
        let data = new Array<CapabilityNode>();
        let innerNode = new CapabilityNode(dtmi, type, displayName);
        innerNode = this.mapChildren((<RelationshipCapabilityModel>capability).properties, innerNode);
        data.push(innerNode);
        node.children?.push(innerNode);
      } else {
        let child = new CapabilityNode(dtmi, type, displayName);
        node.children?.push(child);
      }
    });

    return node;
  }

  private getDisplayName(model: ICapabilityModel): string | undefined {
    let locale = this._localizationService.defaultLocale;
    let displayName: string | undefined = undefined;

    if (!model?.displayName) return displayName;

    if (typeof(model?.displayName) === "string") {
      displayName = model.displayName;
    } else if (Object.keys(model.displayName).length > 0) {
      if (Object.keys(model.displayName).indexOf(locale) === -1) {
        locale = Object.keys(model.displayName)[0];
      }

      displayName = (<any>model.displayName)[locale];
    }

    return displayName;
  }

  public addNode(model: AbstractCapabilityModel) {
    const type = model["@type"] instanceof Array ? model["@type"][0] : model["@type"];
    const dtmi = model["@id"];
    const displayName = this.getDisplayName(model);

    let node = new CapabilityNode(dtmi, type, displayName);
    this.treeDataSource.data.push(node);
  }

  public hasChild = (_: number, node: CapabilityFlatNode) => node.expandable;

  private transformer(node: CapabilityNode, level: number): CapabilityFlatNode {
    let flatNode = new CapabilityFlatNode();
    flatNode.expandable = !!node.children && node.children.length > 0;
    flatNode.id = node.id;
    flatNode.displayName = node.displayName;
    flatNode.type = node.type;
    flatNode.level = level;
    return flatNode;
  }
}