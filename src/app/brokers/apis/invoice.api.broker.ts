import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/invoices/invoice.model';
import { ApiBroker } from './api.broker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltersForInvoices } from 'src/app/models/invoices/invoices-filter.model';
import { InvoiceById } from 'src/app/models/invoices/invoice-by-id.model';

@Injectable({ providedIn: 'root' })
export class InvoiceApiBroker extends ApiBroker<Invoice> {
  relativeUrl = 'api/Invoices';

  constructor(http: HttpClient) {
    super(http);
  }

  public putInvoice(invoice: any) {
    return this.put(this.relativeUrl, invoice);
  }

  public getInvoiceByClientId(clientId: string) {
    const clientFilter = `?$filter=ClientId eq ${clientId}&$expand=Client($select=Firstname,Lastname)`;

    return this.get(this.relativeUrl + clientFilter);
  }

  public getInvoiceByTeamId(teamId: string): Observable<Invoice[]> {
    const teamFilter = `?$filter=Client/TeamId eq ${teamId}&$expand=Client($select=Firstname,Lastname)`;

    return this.getAll(this.relativeUrl + teamFilter);
  }

  public getFilteredInvoiceByTeamId(
    filters: FiltersForInvoices,
    teamId?: string
  ): Observable<Invoice[]> {
    // the above filters may be null so, we need to check for nulls and build the filter accordingly
    let teamFilter = `?$filter=Client/TeamId eq ${teamId}`;

    if (filters.today) {
      const startOfDay = new Date(
        filters.today.setHours(0, 0, 0, 0)
      ).toISOString();
      const endOfDay = new Date(
        filters.today.setHours(23, 59, 59, 999)
      ).toISOString();

      teamFilter += ` and PaidDate ge ${startOfDay} and PaidDate le ${endOfDay}`;
    }

    if (filters.groupId) {
      teamFilter += ` and Client/GroupId eq ${filters.groupId}`;
    }

    if (filters.firstName) {
      teamFilter += ` and startswith(Client/Firstname, '${filters.firstName}') or startswith(Client/Lastname, '${filters.firstName}')`;
    }
    if (filters.startOfMonth) {
      teamFilter += ` and CreatedDate ge ${filters.startOfMonth}`;
    }
    if (filters.endOfMonth) {
      teamFilter += ` and CreatedDate le ${filters.endOfMonth}`;
    }
    if (typeof filters.isPaid === 'boolean') {
      teamFilter += ` and IsPaid eq ${filters.isPaid}`;
    }
    // finally add expand and select
    teamFilter += `&$expand=Client($select=Firstname,Lastname,PhoneNumber),InvoiceLines&$count=true`;

    return this.getAll(this.relativeUrl + teamFilter);
  }

  public searchInvoicesByName(name: string): Observable<Invoice[]> {
    const nameFilter = `?$filter=contains(Client/FirstName, '${name}') or contains(Client/LastName, '${name}')&$expand=Client($select=Firstname,Lastname)`;

    return this.getAll(this.relativeUrl + nameFilter);
  }

  public deleteInvoiceById(id: string) {
    const query = `invoiceId=${id}`;
    return this.deleteById(this.relativeUrl, query);
  }

  public getInvoiceById(id: string) {
    const query = `/${id}?expand=client($select=Firstname,Lastname, Email, PhoneNumber),invoiceLines`;
    return this.getById(query, this.relativeUrl);
  }

  public notifyUnpaidInvoices(teamId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/InvoiceNotifications/?teamId=${teamId}`,
      {}
    );
  }
}
