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
      'title': new FormControl(null, [Validators.required]),
      'body': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(noteData: { title: string; body: string }) {
    const returned = this.notesService.postNotes(noteData);
    console.log("Returned onAdd: ", returned);
    this.notesService.getNotes().then((response: any) => {
      this.notesService.changeNotes(response);
      this.router.navigate(['/notes']); 
    });
  }

  onClear() {
    this.noteForm.reset();
  }

}
