import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceApiBroker } from 'src/app/brokers/apis/invoice.api.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Invoice } from 'src/app/models/invoices/invoice.model';
import { FiltersForInvoices } from 'src/app/models/invoices/invoices-filter.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(
    private invoiceApiBroker: InvoiceApiBroker,
    private localStorageBroker: LocalStorageBroker
  ) {}

  public putInvoice(invoice: any) {
    return this.invoiceApiBroker.putInvoice(invoice);
  }

  public getInvoicesByClientId(clientId: string) {
    return this.invoiceApiBroker.getInvoiceByClientId(clientId);
  }

  public getInvoices(): Observable<Invoice[]> {
    const userCredential = this.localStorageBroker.readUserCredential();
    return this.invoiceApiBroker.getInvoiceByTeamId(userCredential.TeamId);
  }

  public getFilteredInvoicesByTeamId(
    filters: FiltersForInvoices
  ): Observable<Invoice[]> {
    const userCredential = this.localStorageBroker.readUserCredential();
    return this.invoiceApiBroker.getFilteredInvoiceByTeamId(
      filters,
      userCredential.TeamId
    );
  }

  public searchInvoicesByName(name: string): Observable<Invoice[]> {
    return this.invoiceApiBroker.searchInvoicesByName(name);
  }

  public deleteInvoiceById(invoiceId: string) {
    return this.invoiceApiBroker.deleteInvoiceById(invoiceId);
  }

  public getInvoiceById(invoiceId: string) {
    return this.invoiceApiBroker.getInvoiceById(invoiceId);
  }

  public notifyUnpaidInvoices(): Observable<any> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;
    return this.invoiceApiBroker.notifyUnpaidInvoices(teamId);
  }
}
