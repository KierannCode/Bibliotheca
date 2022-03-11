import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorListComponent } from './component/author/author-list/author-list.component';
import { BookListComponent } from './component/book/book-list/book-list.component';
import { ChapterListComponent } from './component/chapter/chapter-list/chapter-list.component';
import { ErrorComponent } from './component/error/error.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignUpModalComponent } from './component/navbar/sign-up-modal/sign-up-modal.component';
import { ReaderNavbarComponent } from './component/reader/reader-navbar/reader-navbar.component';
import { ReaderViewComponent } from './component/reader/reader-view/reader-view.component';
import { ReaderComponent } from './component/reader/reader.component';
import { FormsModule } from '@angular/forms';
import { LogInDropdownComponent } from './component/navbar/log-in-dropdown/log-in-dropdown.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    SignUpModalComponent,
    LogInDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
