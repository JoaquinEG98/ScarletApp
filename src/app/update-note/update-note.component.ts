import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { INote } from '../models/nota.model';
import { IResponse } from '../models/response.model';
import { IUser } from '../models/user.model';
import { HelperService } from '../services/helper.service';
import { NoteService } from '../services/note.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit {

  constructor(private navParams: NavParams, private modalControl: ModalController, private noteService: NoteService, private helperService: HelperService, private toastService: ToastService) { }

  public NoteId: number;
  public Note: INote;
  public NoteUpdate: INote;
  public User: IUser;

  ngOnInit() {

  }

  async ionViewWillEnter(){
    this.NoteId = this.navParams.data.id;
    await this.GetNote(this.NoteId);
    
    this.User = await this.helperService.GetStorageUser();
    await this.helperService.CheckStorageUser(this.User);
  }

  async dismiss() {
    await this.modalControl.dismiss();
  }

  public async GetNote(noteId: number){
    await this.noteService.GetNote(noteId).subscribe((response: IResponse<INote>) =>{
      this.Note = response.data;     
    });
  }

  async UpdateNote(){
    // #warning No está funcionando el ngmodel en este componente - revisar más adelante, por ahora lo hago así.
    let noteDescription = document.getElementById('noteDescription') as HTMLInputElement;
    let noteFinishDate = document.getElementById('noteDate') as HTMLInputElement;

    this.NoteUpdate = {
      Description: noteDescription.value,
      FinishDate: noteFinishDate.value,
      UserId: this.User.id
    }
    
    this.noteService.UpdateNote(this.NoteId, this.NoteUpdate).subscribe(async response => {
      if (response.statusCode == 200) {
        this.toastService.PresentSuccess('Nota actualizada con éxito')
        await this.modalControl.dismiss();
      }
      else {
        this.toastService.PresentAlert(response.msg);
      }
    });
  }

}
