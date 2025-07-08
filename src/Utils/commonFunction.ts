// This function is used to check the guideModal store values.
const CheckGuideModal = (guideModalValue: any, value: any) => {
  let updatedValue = Array.isArray(guideModalValue) ? [...guideModalValue] : []; // Ensure it's an array
  if (updatedValue.includes(value)) return updatedValue; // Return if value already exists
  updatedValue.push(value); // Push the value
  return updatedValue;
};

// To format the field Name
const fieldNameFormatter = (name: any) => {
  const FormattedName = name.replace(/_/g, ' ').replace(/^([a-zA-Z])/, (match: any) => match.toUpperCase());
  return FormattedName;
};

//To download the required file
const downloadFile = (value: any) => {
  const filename = value.split('/').pop();
  const extension = filename.split('.').pop();
  const link = document.createElement('a');
  link.href = value;
  link.setAttribute('download', `${value}.${extension}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

//Name formatter from Key
const formatLabel = (text: string) => {
  return text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// To generate random letters
const generateRandomLetters = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Function to handle table sorting
const handleTableSort = (
  data: any[],
  sorter: { columnKey: string; order: 'ascend' | 'descend' | undefined },
  isApiSort: boolean
): any[] | { sort_by: string; order: string } => {
  if (isApiSort) {
    return {
      sort_by: sorter.columnKey,
      order: sorter.order === 'ascend' ? 'asc' : 'desc'
    };
  }

  return [...data].sort((a, b) => {
    if (!sorter.columnKey || !sorter.order) return 0;

    const aValue = a[sorter.columnKey];
    const bValue = b[sorter.columnKey];

    // Handle null/undefined values
    if (!aValue && !bValue) return 0;
    if (!aValue) return 1;
    if (!bValue) return -1;

    // Determine the type of values
    const isNumber = !isNaN(Number(aValue)) && !isNaN(Number(bValue));
    const isString = typeof aValue === 'string' || typeof bValue === 'string';

    // Sort based on type and order
    if (isNumber) {
      const numA = Number(aValue);
      const numB = Number(bValue);
      return sorter.order === 'ascend' ? numA - numB : numB - numA;
    }

    if (isString) {
      const strA = String(aValue).toLowerCase();
      const strB = String(bValue).toLowerCase();

      return sorter.order === 'ascend' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    }

    // For other types, maintain original order
    return 0;
  });
};

// Function to generate a range of numbers.
const generateRange = (start: number, end: number, step = 1): number[] => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

// Function to format minutes into hours and minutes.
const formatMinutes = (mins: number) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
};

// Validation functions for input fields
const validateNoSQL = (_: any, value: string) => {
  const sqlPatterns = /(select|insert|update|delete|drop|union|exec|declare)\s/i;
  if (sqlPatterns.test(value)) {
    return Promise.reject('SQL statements are not allowed');
  }
  return Promise.resolve();
};

// Validation functions to prevent HTML and special characters in input fields
const validateNoHTML = (_: any, value: string) => {
  const htmlPattern = /<[^>]*>/;
  if (htmlPattern.test(value)) {
    return Promise.reject('HTML tags are not allowed');
  }
  return Promise.resolve();
};

// Validation function to prevent special characters in input fields
const validateSpecialChars = (_: any, value: string) => {
  const specialChars = /[<>{}[\]\\]/g;
  if (specialChars.test(value)) {
    return Promise.reject('Special characters <>{[]} are not allowed');
  }
  return Promise.resolve();
};

// UTC concersion method
const UTCConvertion = (time: any, type: 'start' | 'end') => {
  // Set the time based on 'start' or 'end'
  time.setHours(type === 'start' ? 0 : 23);
  time.setMinutes(type === 'start' ? 0 : 59);
  time.setSeconds(type === 'start' ? 0 : 59);
  time = time.toISOString();
  // Convert the final time to an ISO string
  return time;
};

// To get the user agent browser information
const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';

  if (ua.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
  } else if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
  } else if (ua.indexOf('Safari') > -1) {
    browserName = 'Safari';
  } else if (ua.indexOf('Edge') > -1) {
    browserName = 'Edge';
  }

  return {
    browserName
  };
};

// To change the large number format like K or M
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    // For millions
    const millions = num / 1000000;
    return `${millions % 1 !== 0 ? millions.toFixed(1) : millions}M`;
  } else if (num >= 1000) {
    // For thousands
    const thousands = num / 1000;
    return `${thousands % 1 !== 0 ? thousands.toFixed(1) : thousands}k`;
  }
  return num.toString();
};

export {
  CheckGuideModal,
  fieldNameFormatter,
  downloadFile,
  formatLabel,
  generateRandomLetters,
  handleTableSort,
  generateRange,
  formatMinutes,
  validateNoSQL,
  validateNoHTML,
  validateSpecialChars,
  UTCConvertion,
  getBrowserInfo,
  formatNumber
};
