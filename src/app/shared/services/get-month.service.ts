import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GetMonthService {
  constuctor() {}
  // get month
  getMonth(value: number ) {
    switch (value) {
      // jan
      case 0: {
        return 'Jan';
        break; // no need but follow trands
      }
      // feb
     case 1: {
      return 'Feb';
      break; // no need but follow trands
    }
    // march
    case 2: {
      return 'March';
      break; // no need but follow trands
    }
    // April
    case 3: {
      return 'April';
      break; // no need but follow trands
    }
    // May
    case 4: {
      return 'May';
      break; // no need but follow trands
    }
    // june
    case 5: {
      return 'June';
      break; // no need but follow trands
    }
    // july
    case 6: {
      return 'July';
      break; // no need but follow trands
    }
    // Aug
    case 7: {
      return 'Aug';
      break; // no need but follow trands
    }
    // Sep
    case 8: {
      return 'Sep';
      break; // no need but follow trands
    }
    // Oct
    case 9: {
      return 'Oct';
      break; // no need but follow trands
    }
    // nov
    case 10: {
      return 'Nov';
      break; // no need but follow trands
    }
    // dec
    case 11: {
      return 'Dec';
      break; // no need but follow trands
    }
    // default
    default: {
      return;
      break;
    }
    // switch case end
    }
    // switch end
  }
}
