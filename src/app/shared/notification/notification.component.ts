import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';

import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        top: 0
      })),
      state('closed', style({
        opacity: 0,
        top: -200
      })),
      transition('open <=> closed', [
        animate('0.5s')
      ])
    ]),
  ]
})
export class NotificationComponent implements OnInit {
  messages: Message[];
  open = false;
  constructor(private messageService: MessageService
    ) {
    this.messages = [];

    this.messageService.getMessages().subscribe((payload) => {
      this.messages = payload.messages;
      this.open = this.messages.length > 0;
      setTimeout(() => {
        this.open = false;
      }, 10000);
    });
  }



  destroyMessages() {
    this.messageService.destroyMessage();
    this.open = false;
  }
  ngOnInit() {
  }

}
