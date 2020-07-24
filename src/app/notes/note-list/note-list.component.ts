import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/note.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [{
    noteTitle: "first noteTitle",
    noteBody: "first noteBody",
    id: "alphaNumeric"
  }]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['/notes/new']);
  }
}
