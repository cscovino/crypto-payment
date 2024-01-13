import toast from 'react-hot-toast';

export const copyToClipboard = (text: string, message: string) => {
  navigator.clipboard.writeText(text);
  toast(message);
};
