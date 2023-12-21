import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { Message } from 'src/app/models/messages/message.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessageApiBroker extends ApiBroker<Message[]> {
  constructor(http: HttpClient) {
    super(http);
  }

  getByClientId(clientId: string): Observable<Message[]> {
    const relativeUrl = `api/Messages?filter=ClientId eq ${clientId}`;
    return this.get(relativeUrl);
  }
}
