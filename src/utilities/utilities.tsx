import Resizer from "react-image-file-resizer";

export const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);

  }
  return new Blob([uint8Array], { type: mimeString });
}

export const resizeBase64Image = (base64String: string, maxWidth: number, maxHeight: number) => {
  return new Promise((resolve) => {
    const imgBlob = dataURItoBlob(base64String);
    Resizer.imageFileResizer(
      imgBlob,
      maxWidth,
      maxHeight,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });
}
