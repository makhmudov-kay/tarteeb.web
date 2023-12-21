import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageApiBroker } from 'src/app/brokers/apis/message.api.broker';
import { Message } from 'src/app/models/messages/message.model';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  constructor(private messageApiBroker: MessageApiBroker) {}

  getMessagesByClientId(clientId: string): Observable<Message[]> {
    return this.messageApiBroker.getByClientId(clientId);
  }
}
