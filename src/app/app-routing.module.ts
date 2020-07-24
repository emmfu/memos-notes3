import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { NotesComponent } from './notes/notes.component';
import { NoteDetailsComponent } from './notes/note-list/note-details/note-details.component';
import { NoteNewComponent } from './notes/note-list/note-new/note-new.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'notes', component: NotesComponent, children: [
            { path: 'new', component: NoteNewComponent },
            { path: ':id', component: NoteDetailsComponent },
        ]
    }
    // { path: 'not-found', component: PageNotFoundComponent },
    // { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}