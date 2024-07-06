import { Injectable } from "@angular/core";
import { isValidJSON } from "src/app/modals/validateJSON.modal";

export enum LocalStorageKey {
    token = 'token',
}

@Injectable({
    providedIn: "root",
})
export class LocalStorageService{
    constructor() {}

    public set(key: string, value: any): void {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  
    public get(key: string): any {
      const item: string | undefined = localStorage.getItem(key)?.trim();
      if (isValidJSON(item)) {
        return item ? JSON.parse(item) : null;
      } else {
        return item ? item : null;
      }
    }
  
    public remove(key: string): boolean {
      localStorage.removeItem(key);
      return !localStorage.getItem(key);
    }
  
    public clear() {
      localStorage.clear();
    }
}

