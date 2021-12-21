import { jsonArrayMember, jsonMember, jsonObject, TypedJSON } from "typedjson";

@jsonObject
export class SemanticTypeArray {
    public typeArray: Array<string>;
    public typeString: string;

    constructor(values: Array<string>) {
        this.typeArray = values;
        this.typeString = this.typeArray.toString();
    }
}

TypedJSON.mapType(SemanticTypeArray, {
    deserializer: json => { 
        return json; 
    },
    serializer: value => {
        return value?.toString()
    }
});