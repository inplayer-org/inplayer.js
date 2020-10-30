export interface LocalStorageMethods {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}

export type TokenStorageType = LocalStorageMethods & {
  overrides: LocalStorageMethods;
};

class TokenStorage implements TokenStorageType {
  storage: Record<string, string> = {};

  setItem = (key: string, value: string) => {
    this.overrides.setItem(key, value);
  };

  getItem = (key: string) => this.overrides.getItem(key);

  removeItem = (key: string) => {
    this.overrides.removeItem(key);
  };

  overrides: LocalStorageMethods = {
    setItem: (key: string, value: string) => {
      if (localStorage?.setItem) {
        localStorage.setItem(key, value);
      } else {
        this.storage[key] = value;
      }
    },
    getItem: (key: string) => {
      if (localStorage?.getItem) {
        return localStorage.getItem(key);
      }

      return this.storage[key] || null;
    },
    removeItem: (key: string) => {
      if (localStorage?.removeItem) {
        localStorage.removeItem(key);
      } else {
        delete this.storage[key];
      }
    },
  };
}

export default new TokenStorage();
