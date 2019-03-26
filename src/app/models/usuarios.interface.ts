
import { DateTime } from "ionic-angular";

export interface UsuariosI{
    
    Nombre: string;
    Apellidos: string;
    contraseña: string;
    email: string;
    fechaNacimiento: DateTime;
    user_id?: number;
    
}