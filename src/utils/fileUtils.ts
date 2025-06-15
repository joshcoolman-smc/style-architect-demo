/**
 * File conversion utilities
 * Shared functions for converting between File objects and base64 strings
 */

/**
 * Convert a File object to a base64 string
 * @param file The File object to convert
 * @returns Promise that resolves to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Convert a base64 string back to a File object
 * @param base64 The base64 string (including data URL prefix)
 * @param fileName The name for the reconstructed file
 * @param fileType The MIME type for the file
 * @returns A new File object
 */
export const base64ToFile = (base64: string, fileName: string, fileType: string): File => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], fileName, { type: fileType });
};

/**
 * Validate if a file is an image
 * @param file The file to validate
 * @returns true if the file is an image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Convert a File object to a data URL for image display
 * @param file The image file
 * @returns Promise that resolves to data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return fileToBase64(file);
};