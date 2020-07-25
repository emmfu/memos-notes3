import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NoteService } from 'src/app/note.service';
import { HttpClient } from '@angular/common/http';
import { Note } from '../../../note.model'
import { Subscription, BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  // loadedNotes: Note[] = [];
  error = null;
  private subscription: Subscription;
  noteForm: FormGroup;
  id: number;
  clickedNote: Note;

  constructor(private route: ActivatedRoute, 
              private notesService: NoteService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.notesService.clickedNote.subscribe(newNote => this.clickedNote = newNote);
    console.log("Clicked Note from details: ", this.clickedNote);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.initForm();
      }
    );
  }

  private initForm() {
    const title = this.clickedNote.title;
    const body = this.clickedNote.body
    this.noteForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'body': new FormControl(body, [Validators.required])
    });
  }

  onSubmit(noteData: {title: string; body: string}) {
    let updatedNote = {title: noteData.title, body: noteData.body, id: this.clickedNote.id}
    this.notesService.updateNote(updatedNote);
    this.router.navigate(['/notes']); 
  }

  onDelete() {
    this.notesService.deleteNote(this.clickedNote);   
    this.router.navigate(['/notes']); 
  }

}
