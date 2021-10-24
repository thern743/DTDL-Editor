import { Injectable } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { CapabilityNode } from "src/app/models/CapabilityNode";
import { ICapabilityModel } from "src/app/models/ICapabilityModel";
import { InterfaceCapabilityModel } from "src/app/models/InterfaceCapabilityModel";

@Injectable({
    providedIn: 'root'
})
export class ModelTreeService {
    public treeControl!: NestedTreeControl<CapabilityNode>;
    public treeDataSource: MatTreeNestedDataSource<CapabilityNode>;
    public showFiller: boolean = true;

    constructor() {
        this.treeDataSource = new MatTreeNestedDataSource<CapabilityNode>();  
        this.treeControl = new NestedTreeControl<CapabilityNode>(this.getChildren);
    }

    public mapDataSource(interfaces: InterfaceCapabilityModel[]): void {
        let data = new Array<CapabilityNode>();
        
        interfaces.forEach((interfaceInstance: InterfaceCapabilityModel) => {
            let node = new CapabilityNode(interfaceInstance.name);
            this.mapChildren(interfaceInstance, node);
            data.push(node);
            
        });
    
        this.treeDataSource.data = data;
    }
    
    public mapChildren(interfaceInstance: InterfaceCapabilityModel, node: CapabilityNode): void {
        node.children = new Array<CapabilityNode>();
        interfaceInstance.contents.forEach((capability: ICapabilityModel) => {
            let child = new CapabilityNode(capability.name);
            node.children?.push(child);
        }); 
    }

    public getChildren = (node: CapabilityNode) => node instanceof CapabilityNode ? node.children : null;

    public hasChild = (_: number, node: CapabilityNode) => node instanceof CapabilityNode ? !!node.children && node.children.length > 0 : false;
}