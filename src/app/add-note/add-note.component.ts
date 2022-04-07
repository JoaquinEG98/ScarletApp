import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { INote } from '../models/nota.model';
import { IUser } from '../models/user.model';
import { HelperService } from '../services/helper.service';
import { NoteService } from '../services/note.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {

  public Note: INote;
  public User: IUser

  constructor(private modalControl: ModalController, private noteService: NoteService, private helperService: HelperService, private toastService: ToastService) { }

  ngOnInit() { }

  async ionViewWillEnter(){
    this.User = await this.helperService.GetStorageUser();
    await this.helperService.CheckStorageUser(this.User);
  }

  async dismiss() {
    await this.modalControl.dismiss();
  }

  async AddNewNote() {
    // No está funcionando el ngmodel en este componente - revisar más adelante, por ahora lo hago así.
    let noteDescription = document.getElementById('noteDescription') as HTMLInputElement;
    let noteFinishDate = document.getElementById('noteDate') as HTMLInputElement;

    this.Note = {
      Description: noteDescription.value,
      FinishDate: noteFinishDate.value,
      UserId: this.User.id,
    }

    this.noteService.AddNote(this.Note).subscribe(async response => {
      if (response.statusCode == 200) {
        this.toastService.PresentSuccess('Se creó una nueva nota.')
        await this.modalControl.dismiss();
      }
      else {
        this.toastService.PresentAlert(response.msg);
      }
    });
  }

}
