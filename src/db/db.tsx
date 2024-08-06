import { AnimalType } from "../types/Animal";

const openDatabase = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('animaldex', 1);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('animals')) {
                db.createObjectStore('animals', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(new Error('Error al abrir la base de datos.'));
        };
    });
};

export const addAnimalToDB = async (data: AnimalType): Promise<void> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(['animals'], 'readwrite');
        const store = transaction.objectStore('animals');
        const request = await store.put(data);

        return new Promise<void>((resolve, reject) => {
            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (error) => {
                console.log(error)
                reject(new Error('Error al agregar el animal a la base de datos.'));
            };
        });
    } catch (error) {
        throw new Error('Error al abrir la base de datos.');
    }
};

export const getAnimalByID = async (id: string): Promise<any> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(['animals'], 'readonly');
        const store = transaction.objectStore('animals');
        const request = store.get(id);

        return new Promise<any>((resolve, reject) => {
            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(new Error('Error al obtener el animal de la base de datos.'));
            };
        });
    } catch (error) {
        throw new Error('Error al abrir la base de datos.');
    }
};

export const getAllAnimals = async (): Promise<any> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(['animals'], 'readonly');
        const store = transaction.objectStore('animals');
        const request = store.getAll();

        return new Promise<any>((resolve, reject) => {
            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(new Error('Error al obtener los animales de la base de datos.'));
            };
        });
    } catch (error) {
        throw new Error('Error al abrir la base de datos.');
    }
};

export const deleteAnimal = async (id: string): Promise<void> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(['animals'], 'readwrite');
        const store = transaction.objectStore('animals');
        const request = store.delete(id);

        return new Promise<void>((resolve, reject) => {
            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(new Error('Error al eliminar el animal de la base de datos.'));
            };
        });
    } catch (error) {
        throw new Error('Error al abrir la base de datos.');
    }
};

export const calculateDatabaseSize = async (): Promise<number> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(['animals'], 'readonly');
        const store = transaction.objectStore('animals');

        const getAllRequest = store.getAll();

        return new Promise<number>((resolve, reject) => {
            getAllRequest.onsuccess = () => {
                const allData = getAllRequest.result;
                let totalSize = 0;

                allData.forEach((item: any) => {
                    const itemSize = new Blob([JSON.stringify(item)]).size;
                    totalSize += itemSize;
                });

                resolve(totalSize);
            };

            getAllRequest.onerror = () => {
                reject(new Error('Error al calcular el tamaño de la base de datos.'));
            };
        });
    } catch (error) {
        throw new Error('Error al abrir la base de datos.');
    }
};