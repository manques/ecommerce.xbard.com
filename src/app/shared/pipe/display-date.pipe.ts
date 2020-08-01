import { Pipe, PipeTransform } from '@angular/core';
import { GetMonthService } from '../services/get-month.service';

@Pipe({
  name: 'displayDate'
})

export class DisplayDatePipe implements PipeTransform {
  constructor(private gms: GetMonthService) {}
  transform(value: number, type?: string) {
    const d = new Date(value);
    console.log(d);
    console.log((new Date()).getTime());
    console.log(d.getTime());
    const seconds = ((new Date()).getTime() - d.getTime()) / 1000;
    console.log(seconds / 1000);
    const minutes = seconds / 60 ;
    const hours = seconds / 3600;
    const days = hours / 24;
    const time = days > 7 ? `${d.getHours() < 12 ? d.getHours() + 1 : ((d.getHours()) % 12) + 1 } :
                 ${d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()}
                 ${(d.getHours()) < 12 ? 'AM, ' : 'PM, '}` : `${Math.floor(days)} days` ;
    const time1 =  (hours >= 1) ? Math.floor(hours) +
    ' hours ago' : ( Math.floor(minutes) >= 1 ? Math.floor(minutes)
    + ' minutes ago' : Math.floor(seconds)
    + ' seconds ago');
    return `${ days >= 1 ? time : time1 }
            ${d.getDate()}
            ${this.gms.getMonth(d.getMonth())}
            ${Number(d.getFullYear()) % 2000}`;
  }
}
