import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public status: String;
  public title: string;
  public project: Project;
  public filesToUpload: Array <File>;
  public save_project; //guardo el objeto result

  constructor(
        private _projectService: ProjectService,
        private _uploadService: UploadService
  ) { 
        this.title = 'Crear Proyecto';
        this.project = new Project('','','',2020,'','');
  }

  ngOnInit(): void {

  }

  onSubmit(form){
    
    //Guardar datos Basicos
    this._projectService.saveProyect(this.project).subscribe(
      response => {
          if(response.project){
          
            /*Subo la imagen */
            
            this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
                
            //promesa
            .then((result:any)=>{

              this.save_project = response.project;
              //pregunto que trae en result
              console.log(this.save_project);

              this.status = 'success';
              console.log(this.status);
              form.reset();

            });
            
            
          }else
          {
            this.status == 'failed';
          }
      },
      error => {
          console.log(<any>error);
      }
    )
  }
  
 
  fileChangeEvent(eventfileChange: any) {
    console.log('El evento fileChange del input file tiene como valor: ', this.filesToUpload);
    this.filesToUpload = <Array<File>>eventfileChange.target.files; // aca se forzara q sea de este tipo y se le asiga a esta propiedad todos los archivos que queremos subir
  }
 
  

}
