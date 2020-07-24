import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/note.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent implements OnInit {
  @Input() note: Note;
  @Input() index: number;
  
  constructor(private router: Router,
              private notesService: NoteService) { }

  ngOnInit(): void {
  }

  onClick() {
    console.log("This is the clicked note: ", this.note);
    console.log("And this is the Index: ", this.index);
    console.log("This is the id: ", this.note.id);
  }

}
