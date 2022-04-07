import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddNoteComponent } from '../add-note/add-note.component';
import { INote } from '../models/nota.model';
import { IUser } from '../models/user.model';
import { HelperService } from '../services/helper.service';
import { NoteService } from '../services/note.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalControl: ModalController, private noteService: NoteService, private helperService: HelperService, private router: Router) {}

  public TodayDate: Date;
  public Notes: INote[];
  public User: IUser;

  ngOnInit() { }

  async ionViewWillEnter(){    

    this.User = await this.helperService.GetStorageUser();

    await this.helperService.CheckStorageUser(this.User);

    this.TodayDate = new Date();
    await this.GetNotes(this.User.id);
  }

  public async addNewNote(){
    const modal = await this.modalControl.create({
      component: AddNoteComponent,
    })
    modal.onDidDismiss().then(async newNotes =>{
      await this.GetNotes(this.User.id);
    })
    return await modal.present()
  }

  public async GetNotes(userId: number){
    await this.noteService.GetNotes(userId).subscribe(response =>{
      this.Notes = response.data;    
    });
  }

  public async FinishNote(noteId: number){
    await this.noteService.FinishNote(noteId).subscribe(async response => {
      if (response.statusCode == 200){
        await this.GetNotes(this.User.id);
      }
    })
  }

  public async UpdateNote(noteId: number){
    const modal = await this.modalControl.create({
      component: UpdateNoteComponent,
      componentProps: {
        id: noteId
      }
    })
    modal.onDidDismiss().then(async newNotes =>{
      await this.GetNotes(this.User.id);
    })
    return await modal.present()
  }

  public Logout(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }

}
