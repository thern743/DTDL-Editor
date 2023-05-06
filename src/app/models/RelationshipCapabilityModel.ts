
import { AbstractCapabilityModel } from './AbstractCapabilityModel';

export class RelationshipCapabilityModel extends AbstractCapabilityModel {
  public name!: string;

  public minMultiplicity!: number;  

  public maxMultiplicity!: number;  

  public target!: string;

  public writable!: boolean;
  
  public properties: Array<AbstractCapabilityModel>;

  constructor(id: string) {
    super(id, "Relationship");
    this.properties = new Array<AbstractCapabilityModel>();
  }
}
