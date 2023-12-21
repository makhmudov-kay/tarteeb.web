import { Pipe, PipeTransform } from '@angular/core';
import { Client } from 'src/app/models/clients/client.model';
import { Contractor } from 'src/app/models/contractors/contractor.model';

export type NewClient = Omit<Client, 'group' | 'telegramUserId'>;

@Pipe({
  name: 'searchByName',
  standalone: true,
})
export class SearchUserByNamePipe implements PipeTransform {
  transform(
    users: NewClient[] | Contractor[],
    search = ''
  ): NewClient[] | Contractor[] {
    if (!search.trim()) {
      return users;
    }

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
  }
}
