import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { INote } from '../models/nota.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  public AddNote(note: INote): Observable<IResponse<INote>>{
    return this.http.post<IResponse<INote>>(environment.API_URL + 'note/addnote', note);
  }

  public UpdateNote(noteId: number, note: INote): Observable<any>{
    return this.http.put<IResponse<INote>>(environment.API_URL + 'note/updatenote/' + noteId, note);
  }

  public GetNote(noteId: number): Observable<any>{
    return this.http.get<IResponse<INote>>(environment.API_URL + 'note/getnote/' + noteId);
  }

  public GetNotes(userId: number): Observable<any>{
    return this.http.get<IResponse<INote>>(environment.API_URL + 'note/getnotes/' + userId);
  }

  public FinishNote(noteId: number): Observable<any>{
    return this.http.put<IResponse<INote>>(environment.API_URL + 'note/finishnote/' + noteId, null);
  }

}
