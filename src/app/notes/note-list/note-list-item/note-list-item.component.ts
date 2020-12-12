import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/note.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent implements OnInit {
  @Input() note: Note;
  @Input() noteId: number;
  clickedNote: Note = null;
  isClicked: boolean = false;

  constructor(private router: Router,
    private notesService: NoteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.notesService.clickedNote.subscribe(newNote => this.clickedNote = newNote);
    console.log("note#: ", this.note.id);
    console.log("snapshot: ", this.route.snapshot.params);
    console.log("clickedNote: ", this.clickedNote);
    
    // if (this.note.id === this.clickedNote.id) {
    //   this.isClicked = true;
    //   console.log("checking for isClicked2: ", this.isClicked);
    //   console.log("Clicked note: ", this.note)

    // }
    // if (this.clickedNote !== null) {
    //   console.log("checking for isClicked: ", this.isClicked);
    // }
  }

  onClick() {
    this.notesService.changeNote(this.note);
    this.router.navigate(['/notes/', this.note.id]);
  }

  getIsClicked() {
    let isClicked: boolean = false;
    if(this.clickedNote && this.note.id === this.clickedNote.id) {
      isClicked = true;
    }
    return isClicked;
  }

}
