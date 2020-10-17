import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Global } from './global';

@Injectable()
export class ContactService{
    public url: string;
    public Contact: Contact;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    //metodo prueba 
    testService(){
        return 'Probando el servicio de angular';
    }

    //metodo para guardar los datos
    saveContact(contact: Contact): Observable<any> {
        let params = JSON.stringify(contact);
        let headers = new HttpHeaders().set('Content-Type','application/json');


        return this._http.post(this.url + '/send-email', params, {headers : headers} );
    }

    
}   


