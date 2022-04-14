import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INote } from '../models/nota.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/response.model';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient, private helperService: HelperService) {     
    this.headers = this.helperService.GetHeader();    
  }

  public AddNote(note: INote): Observable<IResponse<INote>>{
    return this.http.post<IResponse<INote>>(environment.API_URL + 'note/addnote', note, { headers: this.headers });
  }

  public UpdateNote(noteId: number, note: INote): Observable<IResponse<INote>>{
    return this.http.put<IResponse<INote>>(environment.API_URL + 'note/updatenote/' + noteId, note, { headers: this.headers });
  }

  public GetNote(noteId: number): Observable<IResponse<INote>>{
    return this.http.get<IResponse<INote>>(environment.API_URL + 'note/getnote/' + noteId, { headers: this.headers });
  }

  public GetNotes(userId: number): Observable<IResponse<INote[]>>{
    return this.http.get<IResponse<INote[]>>(environment.API_URL + 'note/getnotes/' + userId, { headers: this.headers });
  }

  public FinishNote(noteId: number): Observable<IResponse<INote>>{
    return this.http.put<IResponse<INote>>(environment.API_URL + 'note/finishnote/' + noteId, null, { headers: this.headers });
  }

}
