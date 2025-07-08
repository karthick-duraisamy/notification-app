import CFG from '../config/config.json';

const dateFormat = (data: Date | string, format = 'dateTime') => {
  if (!data) return '';
  let formats: any = {},
    formatter = '';
  switch (format) {
    case 'dateTime':
      // formats = { ...CFG.date_format, ...CFG.time_format };
      formats = Object.assign(CFG.date_format, CFG.time_format);
      formatter = CFG.date_time_formatter;
      break;
    case 'date':
      formats = CFG.date_format;
      formatter = CFG.date_formatter;
      break;
    case 'time': {
      const date = new Date(data);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    default: //time
      formats = CFG.time_format;
      formatter = CFG.time_formatter;
      break;
  }

  let date = new Date(data);
  let dateArray = date.toLocaleDateString(CFG.default_lang, formats).replace(/,/g, '').split(' ');
  let timeArray = dateArray[3] ? dateArray[3].split(':') : [];
  const dates: any = {
    '%M': dateArray[0],
    '%d': dateArray[1],
    '%Y': dateArray[2],
    '%H': timeArray[0],
    '%i': timeArray[1],
    '%A': dateArray[4]
  };

  for (var i in dates) formatter = formatter.replace(i, dates[i]);
  return formatter;
};

function formatDateTime(input: any) {
  if (!input) return '';

  const date = new Date(input); // Parse the input date string
  const options: any = {
    month: 'short', // Abbreviated month
    day: '2-digit', // Day with leading zero
    year: 'numeric', // Full year
    hour: '2-digit', // Hour in 12-hour format
    minute: '2-digit', // Minutes with leading zero
    second: '2-digit', // Seconds with leading zero
    hour12: false // Use 24-hour format
  };

  // Convert date to localized string components
  const localString = date.toLocaleString('en-US', options);

  // Format the output to the desired structure
  const [month, day, year] = localString.split(', ');
  return `${month} ${day}, ${year}`;
}

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

const getLastSaturday = (path?: boolean) => {
  let today = new Date();
  return path
    ? new Date(today.setDate(today.getDate() - today.getDay() - 1))
    : new Date(today.setDate(today.getDate() - today.getDay() - 1)).toLocaleDateString('en-CA');
};

const getLastSunday = (path?: boolean) => {
  let today = new Date();
  return path
    ? new Date(today.setDate(today.getDate() - 7 - today.getDay()))
    : new Date(today.setDate(today.getDate() - 7 - today.getDay())).toLocaleDateString('en-CA');
};

const getThisSunday = (path?: boolean) => {
  let today = new Date();
  return path
    ? new Date(today.setDate(today.getDate() - today.getDay()))
    : new Date(today.setDate(today.getDate() - today.getDay())).toLocaleDateString('en-CA');
};

const getMonthStartDate = (month?: number, year?: number, path?: boolean) => {
  let d = month && year ? new Date(year, month - 1) : new Date();
  d.setDate(1);
  return path ? d : d.toLocaleDateString('en-CA');
};

const getMonthEndDate = (month?: number, year?: number, path?: boolean) => {
  let d = month && year ? new Date(year, month) : new Date();
  d.setDate(0);
  return path ? d : d.toLocaleDateString('en-CA');
};

// To format date to DD-MM-YYYY
const formatToDDMMYYYY = (input: Date | string) => {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// To get the Date by the type of Date picker
const getDateRangeByType = (value: string, isTimezoneConversion: boolean) => {
  let startingDate = null;
  let endingDate = null;
  let singleDate = null;

  switch (value) {
    case 'this_week':
      startingDate = isTimezoneConversion ? getThisSunday(true) : getThisSunday();
      endingDate = isTimezoneConversion ? new Date() : new Date().toLocaleDateString('en-CA');
      break;

    case 'last_week':
      startingDate = isTimezoneConversion ? getLastSunday(true) : getLastSunday();
      endingDate = isTimezoneConversion ? getLastSaturday(true) : getLastSaturday();
      break;

    case 'this_month':
      startingDate = isTimezoneConversion ? getMonthStartDate(undefined, undefined, true) : getMonthStartDate();
      endingDate = isTimezoneConversion ? new Date() : new Date().toLocaleDateString('en-CA');
      break;

    case 'last_month':
      startingDate = isTimezoneConversion
        ? getMonthStartDate(new Date().getMonth(), new Date().getFullYear(), true)
        : getMonthStartDate(new Date().getMonth(), new Date().getFullYear());
      endingDate = isTimezoneConversion ? getMonthEndDate(undefined, undefined, true) : getMonthEndDate();
      break;

    case 'select_date':
      singleDate = null;
      break;

    case 'today':
    case 'created_at':
      singleDate = new Date();
      break;

    case 'yesterday':
      singleDate = new Date(new Date().setDate(new Date().getDate() - 1));
      break;
  }

  return { startingDate, endingDate, singleDate };
};

export {
  dateFormat,
  daysInMonth,
  getLastSaturday,
  getLastSunday,
  getThisSunday,
  getMonthStartDate,
  getMonthEndDate,
  formatDateTime,
  formatToDDMMYYYY,
  getDateRangeByType
};
