import { Component } from '@angular/core';
import { EventService } from 'src/app/util/service/event.service';
import { AuthorManager } from '../AuthorManager';

@Component({
  selector: 'app-author-search',
  templateUrl: './author-search.component.html',
  styleUrls: ['./author-search.component.css']
})
export class AuthorSearchComponent {
  constructor(public authorManager: AuthorManager, private eventService: EventService) {
  }

  submit() {
    this.eventService.authorsUpdateEmitter.emit();
  }
}
