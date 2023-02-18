import { SchemaFactory } from '../schemas/SchemaFactory';
import { IFactoryAttributeProperties } from './IFactoryAttributeProperties'

SchemaFactory.initialize();

export function RegisterFormFactoryMethod(attributes: IFactoryAttributeProperties): Function {
  return (obj: any) => { 
    if (attributes.type && attributes.name && attributes.factoryMethod) {      
      let result = obj[attributes.factoryMethod]();
      SchemaFactory.registerFormControl(attributes.type, attributes.name, result);
    }
  };
}

export function RegisterModelFactoryMethod(attributes: IFactoryAttributeProperties): Function {
  return (obj: any) => { 
    if (attributes.type && attributes.name && attributes.factoryMethod) {      
      let result = obj[attributes.factoryMethod]();
      SchemaFactory.registerModel(attributes.type, attributes.name, result);
    }
  };
}

export function UseFactory(): Function {
  return function(target: any, key: string) {
  };
}