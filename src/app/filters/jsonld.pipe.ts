import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'jsonld',
    pure: false
})


export class JsonLdPipe implements PipeTransform {
    transform(val: any): string {      
        //console.groupCollapsed("Stringify JSON-LD");
        let result = JSON.stringify(val, JsonLdPipe.stringify, 2);
        //console.groupEnd();
        return result;
    }

    // TODO: Identify and exclude private members from JSON-LD output
    //       Private fields, such as `private _myPrivateField: string;` on a class or interface
    //       are still rendered in the JSON-LD output.
    static stringify(key: any, value: any) {        
        // console.debug("Type: %s, Key: %s, Value: %o, IsObject: %s, IsArray: %s", 
        //     typeof(value), key, value, 
        //     value instanceof Object, value instanceof Array
        // );

        if (value && value instanceof Object && !(value instanceof Array)) {
            var replacement: any = {};
            for (var k in value) {
                if (Object.hasOwnProperty.call(value, k) && ["id", "type", "context"].indexOf(k) > -1) {
                    replacement["@" + k] = value[k];                
                } else {
                    replacement[k] = value[k];
                }
            }
            
            return replacement;
        }
        
        return value;
    }
}