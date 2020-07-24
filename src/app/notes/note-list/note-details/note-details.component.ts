import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NoteService } from 'src/app/note.service';
import { HttpClient } from '@angular/common/http';
import { Note } from '../../../note.model'
import { Subscription, BehaviorSubject } from 'rxjs';
import { collectExternalReferences } from '@angular/compiler';

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
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.initForm(this.id);
      }
    );
  }

  


  private initForm(id: number) {
    const title = this.clickedNote.noteTitle;
    const body = this.clickedNote.noteBody
    this.noteForm = new FormGroup({
      noteTitle: new FormControl(title, [Validators.required]),
      noteBody: new FormControl(body, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.noteForm);
  }

  onDelete() {
    
  }

}
