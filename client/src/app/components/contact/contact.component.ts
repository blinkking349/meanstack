
import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]

})
export class ContactComponent implements OnInit {

  public title: string;
  public contact: Contact;
  public save_contact; //guardo el result de contact
  public status: string;

  constructor(
    private _contactService: ContactService,
  ) { 
    this.title = "Contacto";
    this.contact = new Contact('','','','','');
  }

  ngOnInit(): void {
    
  }

  onSubmit(form){
    this._contactService.saveContact(this.contact).subscribe(
      response => {
        if(response.contact){
          this.save_contact = response.contact;
          console.log(this.save_contact);
          this.status = 'success';
          form.reset();
        }
      },
      error => {
        console.log(<any>error);
        this.status = "failed";
       
      }

    )
  }
  

}
