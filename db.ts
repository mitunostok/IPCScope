
import { SavedAudit, Department } from './types';

const DB_NAME = 'IPCScopeDB';
const DB_VERSION = 1;
const STORES = {
  AUDITS: 'audits',
  TEMPLATES: 'templates'
};

export class IPCDatabase {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORES.AUDITS)) {
          db.createObjectStore(STORES.AUDITS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.TEMPLATES)) {
          db.createObjectStore(STORES.TEMPLATES, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  async saveAudit(audit: SavedAudit): Promise<void> {
    return this.put(STORES.AUDITS, audit);
  }

  async getAudits(): Promise<SavedAudit[]> {
    return this.getAll<SavedAudit>(STORES.AUDITS);
  }

  async saveTemplate(template: Department): Promise<void> {
    return this.put(STORES.TEMPLATES, template);
  }

  async getTemplates(): Promise<Department[]> {
    return this.getAll<Department>(STORES.TEMPLATES);
  }

  private async put(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async getAll<T>(storeName: string): Promise<T[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new IPCDatabase();
