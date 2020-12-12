import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, observable } from 'rxjs';
import { Note } from './note.model';
import { JWTServiceService } from './jwtservice.service';

@Injectable({ providedIn: 'root' })
export class NoteService {

    private updatedNote = new BehaviorSubject<Note>(null);
    clickedNote = this.updatedNote.asObservable();

    private updatedNotes = new BehaviorSubject<Note[]>(null);
    newNotes = this.updatedNotes.asObservable();


    constructor(private http: HttpClient,
        private jwt: JWTServiceService
    ) { }

    changeNote(note: Note) {
        this.updatedNote.next(note);
    }

    changeNotes(notes: Note[]) {
        this.updatedNotes.next(notes);
    }

    private async request(httpMethod: string, url: string, body = null): Promise<any> {
        let promise: Promise<any> = null;
        console.log('httpMethod', httpMethod)
        if(body) {
            console.log('in with body', body);
            promise = this.http.request(httpMethod, url, {
                body: body,
                headers: this.buildOptions()
            })
            .toPromise()
            .catch(err => console.log(err));
            console.log('this.buildOptions', promise);
        } else {
            console.log('in w/o body', body);
            promise = this.http.request(httpMethod, url, {
                headers: this.buildOptions()
            })
            .toPromise()
            .catch(err => console.log(err));
        }
        console.log('return promise:', promise);
        return promise;
    }

    register(registerInfo: {email: string, password: string}) {
        return this.request('POST', `http://localhost:3000/auth/register`, registerInfo)
    }

    signIn(signInInfo: {email: string, password: string}) {
        return this.request('POST', `http://localhost:3000/auth/signin`, signInInfo)
    }

    getNotes() {
        return this.request('GET', `http://localhost:3000/notes`);
    }

    getNote(noteId: number) {
        return this.request('GET', `http://localhost:3000/notes/${noteId}`, noteId);
    }

    postNotes(note: Note) {
        console.log('info received ', note);
        return this.request('POST', `http://localhost:3000/notes/new`, note);
    }


    updateNote(note: Note) {
        console.log('update received', note);
        return this.request('PUT', `http://localhost:3000/notes/${note.id}`, note);
    }

    deleteNote(note: Note) {
        return this.request('DELETE', `http://localhost:3000/notes/${note.id}`, note);
    }

    /**
     * Lets use set build options with auth token header on abstracted HTTP calls
     * @return {RequestOptionsArgs}
     */
    private buildOptions(): HttpHeaders {
        return new HttpHeaders({
            Authorization: 'Bearer ' + this.jwt.checkToken()
        });
    }

    /**
     * Error handling for all abstracted calls, doesn't reject a Promise
     * @param {any}     serverError
     */
    private handleError(serverError: any): void {
        try {
            console.log('Caught try', serverError);
        } catch (e) {
            console.log('Caught catch', e);
        }
    }

}