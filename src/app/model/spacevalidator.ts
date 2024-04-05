import {FormControl, ValidationErrors} from "@angular/forms";

export class Spacevalidator {
  // @ts-ignore
  static noOnlyWithSpace(control:FormControl):ValidationErrors{
    if (control != null && control.value.trim().length == 0){
     return {'noOnlyWithSpace':true}
    } else {
      return null;
    }
  }
}
