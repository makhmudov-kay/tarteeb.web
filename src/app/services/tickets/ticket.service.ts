import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { TicketApiBroker } from 'src/app/brokers/apis/ticket.api.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Ticket } from 'src/app/models/tickets/ticket.model';

@Injectable({providedIn: 'root'})
export class TicketService {
    constructor(
        private ticketApiBroker: TicketApiBroker,
        private localStorageBroker: LocalStorageBroker,
        private guidBroker: GuidBroker
    ) { }

    public postTicket(ticket: Ticket): Observable<Ticket> {
        ticket.createdUserId = this.localStorageBroker.readUserCredential().Id
        ticket.updatedUserId = this.localStorageBroker.readUserCredential().Id;
        ticket.createdDate = new Date();
        ticket.updatedDate = new Date();
        
        return this.ticketApiBroker.postTicket(ticket);
    }
    
    public getTicketsById(id: string): Observable<Ticket> {
        return this.ticketApiBroker.getTicketById(id);
    }

    public putTicket(ticket: Ticket): Observable<Ticket>{
        ticket.updatedUserId = this.localStorageBroker.readUserCredential().Id;
        ticket.updatedDate = new Date();
        return this.ticketApiBroker.putTicket(ticket);
    }

    public getTicketsByDate(date: Date): Observable<Ticket[]> {
        const userId = this.localStorageBroker.readUserCredential().Id

        return this.ticketApiBroker.getTicketsByFilter(userId, date);
    }
}