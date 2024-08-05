import { mmkvStorage } from "./mmkv.storage";

class LocalStorage {
  public setItem(key: string, value: boolean | string | number | Uint8Array): void {
    mmkvStorage.set(key, value);
  }

  public getItem(key: string): boolean | string | number | undefined | Uint8Array {
    const keyIsString = mmkvStorage.getString(key);
    
    if (keyIsString) return keyIsString;
    
    const keyIsBoolean = mmkvStorage.getBoolean(key);

    if (keyIsBoolean) return keyIsBoolean;

    const keyIsNumber = mmkvStorage.getNumber(key);

    if (keyIsNumber) return keyIsNumber;

    const keyIsUint8Array = mmkvStorage.getBuffer(key);
  
    if (keyIsUint8Array) return keyIsUint8Array;
  }

  public removeItem(key: string): void {
    mmkvStorage.delete(key);
  }

  public clearAll(): void {
    mmkvStorage.clearAll();
  }

  public containsKey(key: string): boolean {
    return mmkvStorage.contains(key);
  }
}

export default new LocalStorage();