export class CapabilityNode {
    public title: string;
    public name: string;
    public children?: CapabilityNode[];

    constructor(name: string, title: string) {
        this.name = name;
        this.title = title;
        this.children = new Array<CapabilityNode>();
    }
}