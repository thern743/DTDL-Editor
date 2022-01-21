import { Injectable } from "@angular/core";
import { FlatTreeControl, NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { CapabilityNode } from "src/app/models/CapabilityNode";
import { ICapabilityModel } from "src/app/models/ICapabilityModel";
import { InterfaceCapabilityFormControl } from "src/app/formControls/InterfaceCapabilityFormControl";
import { CapabilityFlatNode } from "src/app/models/CapabilityFlatNode";
import { RelationshipCapabilityModel } from "src/app/models/RelationshipCapabilityModel";

@Injectable({
    providedIn: 'root'
})
export class ModelTreeService {
    public treeControl!: FlatTreeControl<CapabilityFlatNode>;
    public treeDataSource: MatTreeFlatDataSource<CapabilityNode, CapabilityFlatNode>;
    public showFiller: boolean = true;
    public treeFlattener: MatTreeFlattener<CapabilityNode, CapabilityFlatNode>;
    
    constructor() {        
        this.treeControl = new FlatTreeControl<CapabilityFlatNode>(node => node.level, node => node.expandable);
        this.treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
        this.treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    }

    public mapDataSource(interfaces: InterfaceCapabilityFormControl[]): void {
        let data = new Array<CapabilityNode>();
        
        interfaces.forEach((interfaceInstance: InterfaceCapabilityFormControl) => {
            let node = new CapabilityNode(interfaceInstance.model.id, interfaceInstance.model.type[0]);            
            node = this.mapChildren(interfaceInstance.model.contents, node);
            data.push(node);            
        });
    
        this.treeDataSource.data = data;
        this.treeControl.expandAll();
    }
    
    public mapChildren(capabilities: ICapabilityModel[], node: CapabilityNode): CapabilityNode {        
        capabilities.forEach((capability: ICapabilityModel) => {     
            if(capability.type[0] == "Relationship") {
                let data = new Array<CapabilityNode>();
                let innerNode = new CapabilityNode(capability.id, capability.type[0]);                
                innerNode = this.mapChildren((<RelationshipCapabilityModel>capability).properties, innerNode);
                data.push(innerNode);
                node.children?.push(innerNode);
            } else {
                let child = new CapabilityNode(capability.id, capability.type[0]);
                node.children?.push(child);
            }
        });

        return node;
    }

    public addNode(model: ICapabilityModel) {
        let node = new CapabilityNode(model.id, model.type[0]);
        this.treeDataSource.data.push(node);
    }

    hasChild = (_: number, node: CapabilityFlatNode) => node.expandable;

    private transformer(node: CapabilityNode, level: number): CapabilityFlatNode {
        let flatNode = new CapabilityFlatNode();
        flatNode.expandable = !!node.children && node.children.length > 0;
        flatNode.name = node.name;
        flatNode.level = level;
        flatNode.title = node.title;
        return flatNode;
    }
}