import { FieldData } from 'rc-field-form/lib/interface';

const formErrorObjectFromResponse = (object?: Object): FieldData[] => {
  let formErrorObject: FieldData[] = [];
  if (object) {
    Object.entries(object).forEach(([key, value]) => {
      if (key && value instanceof Array) {
        formErrorObject.push({ name: key, errors: value });
      }
    });
  }
  return formErrorObject;
};

export { formErrorObjectFromResponse };
