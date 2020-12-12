import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NoteService } from 'src/app/note.service';
import { Note } from '../../../note.model'
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  noteForm: FormGroup;
  id: string;
  clickedNote: Note;
  notes: Note[] = [];

  constructor(private route: ActivatedRoute,
    private notesService: NoteService,
    private router: Router) { }

  ngOnInit(): void {
    this.notesService.clickedNote.subscribe(newNote => this.clickedNote = newNote);
    this.notesService.newNotes.subscribe(newNotes => this.notes = newNotes);
    this.loadPage();
  }
  
  private loadPage() {
    this.route.params.subscribe(  
      (params: Params) => {
        this.id = params['id'];
        if (this.clickedNote === null) {
          this.notesService.getNote(+this.id).then((response: any) => {
            if(!response.length){
              this.router.navigate(['/not-found',])
            }
            this.clickedNote = response[0];
            this.notesService.changeNote(this.clickedNote);
            this.initForm(this.clickedNote);
          });
        } else {
          this.initForm(this.clickedNote);
        }
      }
    )
  }

  private initForm(note: Note) {
    const title = note.title;
    const body = note.body;
    this.noteForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'body': new FormControl(body, [Validators.required])
    });
  }

  onUpdate(noteData: { title: string; body: string }) {
    const noteTitle: string = noteData.title;
    const noteBody: string = noteData.body;
    let updatedNote = {title: noteTitle, body: noteBody, id: this.clickedNote.id };
    console.log('updatednote sent? ', updatedNote);
    let response = this.notesService.updateNote(updatedNote);
    this.router.navigate(['/notes/']);
    console.log('response: ', response);
  }

  onDelete() {
    this.notesService.deleteNote(this.clickedNote);
    this.notesService.getNotes().then((response: any) => {
      this.notesService.changeNotes(response);
      this.router.navigate(['/notes']); 
    });
  }

}
