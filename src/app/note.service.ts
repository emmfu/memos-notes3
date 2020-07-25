import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Note } from './note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {

    private updatedNote = new BehaviorSubject<Note>(null);
    clickedNote = this.updatedNote.asObservable();

    constructor(private http: HttpClient) { }

    changeNote(note: Note) {
        this.updatedNote.next(note);
    }

    private async request(method: string, url: string, data?: any) {
        const result = this.http.request(method, url, {
            body: data,
            responseType: 'json',
            observe: 'body',
            headers: {
                Custom: 'CustomHeaders'
            }
        });
        return new Promise((resolve, reject) => {
            result.subscribe(resolve, reject);
        });
    }

    getNotes() {
        return this.request('GET', `http://localhost:3000/notes`);
    }

    postNotes(note: Note) {
        return this.request('POST', `http://localhost:3000/notes/new`, note);
    }


    updateNote(note: Note) {
        return this.request('PUT', `http://localhost:3000/notes/${note.id}`, note);
    }

    deleteNote(note: Note) {
        return this.request('DELETE', `http://localhost:3000/notes/${note.id}`, note);
    }
}