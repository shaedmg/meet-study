import { FormControl } from '@angular/forms';
import { UsuariosProvider } from './usuarios';
export class UsuarioValidator {
    
    
  static validUsername(fc: FormControl){
    
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return ({validUsername: true});
    } else {
      return (null);
    }
  }
}