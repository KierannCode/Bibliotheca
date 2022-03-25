import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/util/service/event.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  constructor(eventService: EventService, router: Router) {
    eventService.alertEmitter.emit({ type: 'danger', message: 'The requested url does not exist' });
    router.navigate(['home']);
  }

  ngOnInit(): void {
  }
}
