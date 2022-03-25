import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorGuard } from './component/author/AuthorGuard';
import { AuthorComponent } from './component/author/author/author.component';
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
      path: 'authors', component: AuthorComponent, canDeactivate: [AuthorGuard]
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
