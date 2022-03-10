import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthorListComponent } from './component/author/author-list/author-list.component';
import { ChapterListComponent } from './component/chapter/chapter-list/chapter-list.component';
import { BookListComponent } from './component/book/book-list/book-list.component';
import { HomeComponent } from './component/home/home.component';
import { ErrorComponent } from './component/error/error.component';
import { ReaderViewComponent } from './component/reader/reader-view/reader-view.component';
import { ReaderNavbarComponent } from './component/reader/reader-navbar/reader-navbar.component';
import { ReaderComponent } from './component/reader/reader.component';
import { LogInFormComponent } from './component/navbar/log-in-form/log-in-form.component';
import { SignInDialogComponent } from './component/navbar/sign-in-dialog/sign-in-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthorListComponent,
    ChapterListComponent,
    BookListComponent,
    HomeComponent,
    ErrorComponent,
    ReaderViewComponent,
    ReaderNavbarComponent,
    ReaderComponent,
    LogInFormComponent,
    SignInDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
