import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [ProjectService]
})
export class DetailsComponent implements OnInit {
  public url: string;
  public project: Project;
  public filesToUpload: Array<File>;
  public confirm: String;


  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute, 
    
  ) { 
    this.confirm = "false";
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

 fileChangeEvent(eventfileChange: any) {
  console.log('El evento fileChange del input file tiene como valor: ', eventfileChange);
  this.filesToUpload = <Array<File>>eventfileChange.target.files; // aca se forzara q sea de este tipo y se le asiga a esta propiedad todos los archivos que queremos subir
}


  setConfirm(confirm){
    this.confirm = confirm;
  }

}
