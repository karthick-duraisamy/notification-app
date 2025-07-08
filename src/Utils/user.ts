import { FONTS_CONFIG } from '../pages/Authenticated/Templates/FontConfig';
import { AppState } from '../stores/Store'; // or import { User } from '../stores/User.store' if needed
import { decryptResponse } from '../Utils/crypto';

// Explicit return type: User | null
const hydrateUserFromLocalStorage = (user?: string): AppState['user']['user'] | null => {
  try {
    const encrypted = user ?? localStorage.getItem('user');
    if (!encrypted) return null;

    const cache = decryptResponse(encrypted);
    if (!cache) return null;

    const parsedUser: AppState['user']['user'] = JSON.parse(cache);

    if (parsedUser && parsedUser.id && parsedUser.name && parsedUser.email) {
      return parsedUser;
    } else {
      console.warn('User data malformed or missing required fields.');
      return null;
    }
  } catch (err) {
    console.error('Error hydrating user from localStorage:', err);
    return null;
  }
};

const handleImageDownload = (url: string, filename: string): void => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch(() => alert('Failed to download the image'));
};

const handleAttachmentDownload = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

function decodeBase64ToBinary(base64Data: string): Uint8Array {
  const binaryString = atob(base64Data);
  const binaryLength = binaryString.length;
  const bytes = new Uint8Array(binaryLength);
  for (let i = 0; i < binaryLength; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const handleCustomFont = (customFont: any): any[] => {
  const defaultFont = FONTS_CONFIG;

  const resultantFont = customFont.reduce((fontObject: any, font: any) => {
    fontObject[font.name] = font;
    return fontObject;
  }, {});

  defaultFont.forEach((obj: any) => {
    if (!resultantFont[obj.name]) {
      resultantFont[obj.name] = obj;
    }
  });

  return Object.values(resultantFont);
};

const isNullorUndefined = (value: any): boolean => {
  return !(value === null || value === undefined || Number.isNaN(value));
};

export {
  hydrateUserFromLocalStorage,
  handleImageDownload,
  handleAttachmentDownload,
  decodeBase64ToBinary,
  handleCustomFont,
  isNullorUndefined
};
