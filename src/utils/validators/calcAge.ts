import * as moment from 'moment';
// import 'moment/locale/pt-br';

export class AgeValidator {
  public calcAge(value) {
    const day = parseInt(value.substring(0, 2));
    const month = parseInt(value.substring(3, 5)) - 1;
    const year = parseInt(value.substring(6, 10));

    if (month < 0 || month > 11) {
      return false;
    }
    if (day < 1 || day > 31) {
      return false;
    }

    const date = new Date(year, month, day);
    const newDate = moment(date).add(18, 'y');

    if (newDate.isBefore(moment())) {
      return true;
    }
    return false;
  }
}
