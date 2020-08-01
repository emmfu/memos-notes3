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
  id: number;
  clickedNote: Note;
  notes: Note[] = [];
  isNote: boolean;

  constructor(private route: ActivatedRoute,
    private notesService: NoteService,
    private router: Router) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.notesService.clickedNote.subscribe(newNote => this.clickedNote = newNote);
    //     this.notesService.newNotes.subscribe(newNotes => this.notes = newNotes);
    //     this.notesService.getNotes().then((response: any) => {
    //       this.notes = response;
    //       console.log("Newly set notes", this.notes);
    //     }).then(() => {
    //       console.log("The realNote: ", this.clickedNote);
    //     });
    //     this.id = +params['id'];
    //     this.initForm();
    //   }
    // )
    // this.initForm();
    this.notesService.clickedNote.subscribe(newNote => this.clickedNote = newNote);
    this.notesService.newNotes.subscribe(newNotes => this.notes = newNotes);
    this.route.params.subscribe(
      (params: Params) => {
        if (this.clickedNote == null) {
          console.log("this is params id:", params['id']);
        } else {
          console.log("NOT NULL");
          this.initForm();
        }
      }
    )
  }

  private initForm() {
    const title = this.clickedNote.title;
    const body = this.clickedNote.body
    this.noteForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'body': new FormControl(body, [Validators.required])
    });
  }

  onSubmit(noteData: { title: string; body: string }) {
    let updatedNote = { title: noteData.title, body: noteData.body, id: this.clickedNote.id };
    this.notesService.updateNote(updatedNote);
    this.notesService.getNotes().then((response: any) => {
      this.notesService.changeNotes(response);
      this.router.navigate(['/notes']);
    })
  }

  onDelete() {
    this.notesService.deleteNote(this.clickedNote);
    this.notesService.getNotes().then((response: any) => {
      this.notesService.changeNotes(response);
      this.router.navigate(['/notes']);
    });
  }

}
