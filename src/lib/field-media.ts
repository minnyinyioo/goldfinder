export type StoredPhoto = {
  id: string;
  sampleId: string;
  sample: string;
  project: string;
  caption: string;
  createdAt: string;
  name: string;
  type: string;
  size: number;
  blob: Blob;
};
function db() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("goldfinder-field-media", 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("photos"))
        request.result.createObjectStore("photos", { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export async function getAllPhotos() {
  const database = await db();
  return new Promise<StoredPhoto[]>((resolve, reject) => {
    const request = database
      .transaction("photos")
      .objectStore("photos")
      .getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export async function putPhoto(photo: StoredPhoto) {
  const database = await db();
  return new Promise<void>((resolve, reject) => {
    const request = database
      .transaction("photos", "readwrite")
      .objectStore("photos")
      .put(photo);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
export async function deletePhoto(id: string) {
  const database = await db();
  return new Promise<void>((resolve, reject) => {
    const request = database
      .transaction("photos", "readwrite")
      .objectStore("photos")
      .delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
