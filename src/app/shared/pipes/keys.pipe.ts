import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {

  transform(value, keyValue = true): any {
    const result = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (keyValue) {
          result.push({key: key, value: value[key]}); // create a key/value pair
        } else {
          result.push(value[key]); // only take the value
        }
      }
    }
    return result;
  }

}
