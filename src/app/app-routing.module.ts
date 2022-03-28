import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './component/author/author.component';
import { AuthorManager } from './component/author/AuthorManager';
import { BookListComponent } from './component/book/book-list/book-list.component';
import { ErrorComponent } from './component/error/error.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ReaderComponent } from './component/reader/reader.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  }, {
    path: '', component: NavbarComponent, children: [{
      path: 'home', component: HomeComponent
    }, {
      path: 'authors', component: AuthorComponent, canDeactivate: [AuthorManager]
    }, {
      path: 'books', component: BookListComponent
    }]
  }, {
    path: 'reader', component: ReaderComponent
  }, {
    path: '**', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
