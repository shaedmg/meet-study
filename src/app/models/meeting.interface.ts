import { PeticionI } from "./peticiones.interface";

export interface MeetingI{
    id?: string;
    primarySubject: string;
    secondarySubject: string;
    name: string;
    time: string;
    userId?: string;
    valoration?: string;
    peticiones: PeticionI[];
}