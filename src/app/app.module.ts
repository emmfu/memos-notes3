import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteDetailsComponent } from './notes/note-list/note-details/note-details.component';
import { NoteListItemComponent } from './notes/note-list/note-list-item/note-list-item.component';
import { NoteNewComponent } from './notes/note-list/note-new/note-new.component';
import { AppRoutingModule } from './app-routing.module';
import { NoteService } from './note.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotesComponent,
    NoteListComponent,
    NoteDetailsComponent,
    NoteListItemComponent,
    NoteNewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
    
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
