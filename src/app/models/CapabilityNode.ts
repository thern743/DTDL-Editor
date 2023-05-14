export class CapabilityNode {
  public id: string;
  public type: string;
  public displayName: string | undefined;
  public children?: Array<CapabilityNode>;

  constructor(id: string, type: string, displayName: string | undefined) {
    this.id = id;
    this.type = type;
    this.displayName = displayName;
    this.children = new Array<CapabilityNode>();
  }
}