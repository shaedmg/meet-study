
import { DateTime } from "ionic-angular";

export interface UsuariosI{
    
    Nombre: string;
    Apellidos: string;
    contraseña: string;
    email: string;
    nombreUsuario: string;
    fechaNacimiento: DateTime;
    user_id?: number;
    
}