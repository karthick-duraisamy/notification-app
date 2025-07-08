import {
  dateFormat,
  daysInMonth,
  getLastSaturday,
  getLastSunday,
  getMonthEndDate,
  getMonthStartDate,
  getThisSunday
} from './date';
import { formErrorObjectFromResponse } from './form';
import { hydrateUserFromLocalStorage } from './user';

describe('form testing', () => {
  const formData = {
    actions: [
      {
        action_id: 491,
        action_name: 'Registration travel',
        created_at: '2022-03-16T11:33:32.744000Z',
        created_by: 'infiniti@infi.com',
        status: 1,
        status_name: 'Active',
        unique_name: 'grm_registration_travel',
        updated_at: '2022-11-07 05:13:01.417167+00:00',
        updated_by: 'infiniti@infi.com'
      },
      {
        action_id: 591,
        action_name: 'Payment TLE request approve travel',
        created_at: '2022-03-16T11:33:33.011000Z',
        created_by: 'infiniti@infi.com',
        status: 1,
        status_name: 'Active',
        unique_name: 'grm_payment_tle_request_approve_travel',
        updated_at: '2022-11-07 05:13:02.495698+00:00',
        updated_by: 'infiniti@infi.com'
      }
    ],
    created_at: '2021-11-28T17:47:55.763000Z',
    created_by: 'infiniti@infi.com',
    masterInfo: {
      status: [
        { label: 'Active', value: 1 },
        { label: 'In-Active', value: 2 }
      ]
    },
    project_code: 'GRM',
    project_id: 1,
    project_name: 'Group RM',
    status: 1,
    status_name: 'Active',
    updated_at: '2022-11-07 05:13:01.406743+00:00',
    updated_by: 'infiniti@infi.com'
  };
  it('for form testing', () => {
    expect(formErrorObjectFromResponse(formData)).toBeNaN();
  });
});

describe('user testing', () => {
  it('Local storage with user testing', () => {
    expect(
      hydrateUserFromLocalStorage(
        '{"email":"infiniti@infi.com","id":1,"name":"infiniti@infi.com","user_type":"Super user","token":"HRtdmLYzNEePHLZGaRWM2G8QTk5TxcGO"}'
      )
    ).toBeNaN();
  });
  it('Local storage without user testing', () => {
    expect(
      hydrateUserFromLocalStorage(
        '{"email":"infiniti@infi.com","name":"infiniti@infi.com","user_type":"Super user","token":"HRtdmLYzNEePHLZGaRWM2G8QTk5TxcGO"}'
      )
    ).toBeNaN();
  });
  it('Local storage user testing', () => {
    expect(hydrateUserFromLocalStorage()).toBeNaN();
  });
});

describe('Date formatting testing', () => {
  it('for undefined date value', () => {
    expect(dateFormat('', undefined)).toBe('');
  });
  it('for date formatting', () => {
    expect(dateFormat('2022-10-28 05:52:30.213464+00:00', 'date')).toBe('28-Oct-2022');
  });
  it('for datetime formatting', () => {
    expect(dateFormat('2021-11-28 17:55:51.875000+00:00', 'dateTime')).toBe('28-Nov-2021 11:25 PM');
  });
  it('for time formatting', () => {
    expect(dateFormat('2021-11-28 17:55:51.875000+00:00', 'Time')).toBe('11:25 PM');
  });
  it('for days in month testing', () => {
    expect(daysInMonth(9, 1997)).toBe(30);
  });
  it('for month last date testing', () => {
    expect(getMonthEndDate(9, 1997)).toBe('1997-09-30');
  });
  it('for Last Saturday', () => {
    expect(getLastSaturday()).not.toBe(new Date());
  });
  it('for Last sunday', () => {
    expect(getLastSunday()).not.toBe(new Date());
  });
  it('for coming sunday', () => {
    expect(getThisSunday()).not.toBe(new Date());
  });
  it('for Month Start Date', () => {
    expect(getMonthStartDate()).not.toBe(new Date());
  });
  it('for Month Start Date with given detail', () => {
    expect(getMonthStartDate(9, 1997)).not.toBe(new Date());
  });
  it('for month last date testing with given detail', () => {
    expect(getMonthEndDate()).not.toBe(new Date());
  });
});
