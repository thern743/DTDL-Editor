export class CapabilityNode {
    public name: string;
    public children?: CapabilityNode[];

    constructor(name: string) {
        this.name = name;
        this.children = new Array<CapabilityNode>();
    }
}