import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
    public url: string;
    public project: Project;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    //metodo prueba 
    testService(){
        return 'Probando el servicio de angular';
    }

    

    //metodo del backend getProject
    getProjects(): Observable<any> {
        let headers  = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'projects', { headers: headers});
    }

    //metodo del Backend getProject por id
    getProject(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'details/'+ id, { headers: headers });
    }

    //metodo del backend deleteProject
    deleteProject(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+ 'project/' + id, { headers: headers });
    }

    //metodo del backend updateProject 
    updateProject(project): Observable<any>{

        //paso el proyecto que recibo a un JSON string
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url + '/project/' +project._id, params, { headers : headers});
    }

    //metodo del backend saveProject
    saveProyect(project: Project): Observable<any> {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'/save-project', params, {headers: headers} );
    }

}   


