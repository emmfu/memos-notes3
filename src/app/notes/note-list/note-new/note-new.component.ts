import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.css']
})
export class NoteNewComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private notesService: NoteService) { }

  ngOnInit(): void {
    this.noteForm = new FormGroup ({
      'noteTitle': new FormControl(null, [Validators.required]),
      'noteBody': new FormControl(null, [Validators.required])
    });

    this.noteForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onSubmit(noteData: { noteTitle: string; noteBody: string }) {
    console.log(noteData);
    this.router.navigate(['/notes']);
  }

  onClear() {
    this.noteForm.reset();
  }

}
