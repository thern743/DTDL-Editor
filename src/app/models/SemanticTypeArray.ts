import { jsonObject, TypedJSON } from "typedjson";

@jsonObject
export class SemanticTypeArray extends Array<string> {

}

TypedJSON.mapType(SemanticTypeArray, {
    deserializer: json => json,
    serializer: value => {
        let val = value?.length == 1 ? value[0] : value;
        return val;
    }
});