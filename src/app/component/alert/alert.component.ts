import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { Alert } from 'src/app/service/util/Alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alert: Alert | null = null;

  constructor(eventService: EventService) {
    eventService.createAlert.subscribe(alert => this.alert = alert);
  }

  ngOnInit(): void {
  }
}
