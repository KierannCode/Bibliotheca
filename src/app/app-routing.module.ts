import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './component/author/author-list/author-list.component';
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
      path: 'error/:code', component: ErrorComponent
    },{
      path: 'home', component: HomeComponent
    }, {
      path: 'authors', component: AuthorListComponent
    }, {
      path: 'books', component: BookListComponent
    }]
  }, {
    path: 'reader', component: ReaderComponent
  }, {
    path: '**', redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
