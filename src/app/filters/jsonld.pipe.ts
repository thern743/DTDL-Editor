import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'jsonld',
    pure: false
})

export class JsonLdPipe implements PipeTransform {
    transform(val: any): string {        
        return JSON.stringify(val, JsonLdPipe.stringify, 2);
    }

    // TODO: Identify and exclude private members.
    static stringify(key: any, value: any) {
        if (value && typeof value === 'object') {
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