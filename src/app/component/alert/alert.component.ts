import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/util/service/event.service';
import { Alert } from 'src/app/util/Alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts = new Array<Alert>();

  constructor(eventService: EventService) {
    eventService.alertEmitter.subscribe(alert => {
      this.alerts.push(alert)
    });
  }

  ngOnInit(): void {
  }

  removeAlert(index: number) {
    this.alerts.splice(index, 1);
  }
}
