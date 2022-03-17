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
import { AuthorItemComponent } from './component/author/author-item/author-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ContributorDropdownComponent } from './component/navbar/contributor-dropdown/contributor-dropdown.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

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
    LogInDropdownComponent,
    AuthorItemComponent,
    ContributorDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
