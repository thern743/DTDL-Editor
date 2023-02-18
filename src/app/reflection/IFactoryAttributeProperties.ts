export interface IFactoryAttributeProperties {
  type?: string;
  name?: string;
  factoryMethod?: string;
}

export class FactoryAttributeProperties implements IFactoryAttributeProperties {
  public type?: string | undefined;
  public name?: string | undefined;
  public factoryMethod?: string | undefined;

  constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
  }
}