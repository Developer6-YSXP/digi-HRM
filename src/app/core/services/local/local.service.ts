import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  // Save a value to local storage
  setLocalItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // Retrieve a value from local storage
  getLocalItem(key: string): any {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Error retrieving from localStorage', e);
      return null;
    }
  }

  // Remove an item from local storage
  removeLocalItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }

  // Clear all items from local storage
  removeAllLocalItems(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }

  // Check if an item exists in local storage
  existsLocalItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
