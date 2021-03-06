import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './component/alert/alert.component';
import { AuthorItemComponent } from './component/author/author-item/author-item.component';
import { AuthorListComponent } from './component/author/author-list/author-list.component';
import { AuthorSearchComponent } from './component/author/author-search/author-search.component';
import { AuthorComponent } from './component/author/author.component';
import { CreateAuthorModalComponent } from './component/author/create-author-modal/create-author-modal.component';
import { BookListComponent } from './component/book/book-list/book-list.component';
import { ChapterListComponent } from './component/chapter/chapter-list/chapter-list.component';
import { ErrorComponent } from './component/error/error.component';
import { HomeComponent } from './component/home/home.component';
import { ContributorDropdownComponent } from './component/navbar/contributor-dropdown/contributor-dropdown.component';
import { LogInDropdownComponent } from './component/navbar/log-in-dropdown/log-in-dropdown.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignUpModalComponent } from './component/navbar/sign-up-modal/sign-up-modal.component';
import { ReaderNavbarComponent } from './component/reader/reader-navbar/reader-navbar.component';
import { ReaderViewComponent } from './component/reader/reader-view/reader-view.component';
import { ReaderComponent } from './component/reader/reader.component';
import { ValidationDirective } from './util/ValidationDirective';

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
    ContributorDropdownComponent,
    ValidationDirective,
    AuthorComponent,
    AuthorSearchComponent,
    CreateAuthorModalComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
