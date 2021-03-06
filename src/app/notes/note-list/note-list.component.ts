import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/note.model';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  note: Note;
  noteId: number;

  constructor(private router: Router,
    private notesService: NoteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.notesService.newNotes.subscribe(newNotes => this.notes = newNotes);
    this.notesService.getNotes().then((response: any) => {
      console.log('notes response:', response);
      this.notes = response.results;
    });  
    
  }

  onAdd() {
    this.router.navigate(['/notes/new']);
  }
}
