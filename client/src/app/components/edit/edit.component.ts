import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers:[ ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public status: String;
  public title: string;
  public project: Project;
  public filesToUpload: Array <File>;
  public save_project; //guardo el objeto result
  public url: String;

  constructor(
        private _projectService: ProjectService,
        private _uploadService: UploadService,
        private _route: ActivatedRoute,
        private _router: Router
  ) { 
        this.title = 'Editar Proyecto';
        this.url = Global.url;     
  }
  

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
      
    });
  }


  getProject(id){
    this._projectService.getProject(id).subscribe(
        response => {
          this.project = response.project;
        },
        error => {
            console.log(<any>error);
            
        }
    )
  }


//funcion formulario
  onSubmit(form){

    
    //guardar datos del proyecto
    this._projectService.updateProject(this.project).subscribe(
      response => {
            //si me llega el proyecto
            if(response.project){

              if(this.filesToUpload)
              {
                //Subo Imagen  
              this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
              .then((result:any) => {

                this.save_project = response.project;
                
                //pregunto que trae result
                this.status = "success";
                
              });
              }
              else
              {

                this.save_project = response.project;
                this.status = "success";
                
              }
            }
            else
            {
                this.save_project = response.project;
                this.status = "failed";
                console.log(response.status);
            }
      },
      error => {
        console.log(<any>error);
        
      }
    )
  }
  


  fileChangeEvent(eventfileChange: any){
      console.log('el evento fileChange del input tiene como valor: ', eventfileChange);
      this.filesToUpload = <Array<File>>eventfileChange.target.files; // aca se forzara que sea de ese tipo y se le asigna a esta propiedad todos los archivos que queremos subir
  }

//funcion borrar proyecto
  deleteProject(id){
    this._projectService.deleteProject(id).subscribe(
        response => {
            if(response.project){
              this._router.navigate(['/proyectos']);
            }
          },
          error => {
            console.log(<any>error);
            console.log("Entro en error");
          }
      );
   }
  
   


   

}
