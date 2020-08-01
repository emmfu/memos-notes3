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
  paramsId: number;
  noteId: number;
  constructor(private router: Router,
              private notesService: NoteService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsId = +this.route.snapshot.params['id'];
    this.noteId = +this.note.id;

  }

  onClick() {
    this.notesService.changeNote(this.note);   
    this.router.navigate(['/notes/', this.note.id]);
  }

}
