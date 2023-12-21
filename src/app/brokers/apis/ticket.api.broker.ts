import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { Ticket } from 'src/app/models/tickets/ticket.model';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({providedIn: 'root'})
export class TicketApiBroker extends ApiBroker<Ticket> {
    relativeUrl = "api/Tickets";

    constructor(http: HttpClient) {
        super(http);
    }

    public postTicket(ticket: Ticket): Observable<Ticket> {
        return this.post(this.relativeUrl, ticket);
    }

    public putTicket(ticket: Ticket): Observable<Ticket> {
        return this.put(this.relativeUrl, ticket);
    }

    public getTicketsByFilter(userId: string, date: Date): Observable<Ticket[]> {
        const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
        const filter = `?$filter= CreatedUserId eq ${userId} and Deadline eq ${formattedDate}`;
        
        return this.getAll(this.relativeUrl + filter);
    }

    public getTicketById(id: string): Observable<Ticket> {
        return this.getById(id, this.relativeUrl);
    }
}