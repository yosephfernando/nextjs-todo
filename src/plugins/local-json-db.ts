// src/plugins/storage/LocalJsonDB.ts
import fs from "fs";
import path from "path";

export class LocalJsonDB<T extends object> {
  private dbPath: string;
  private data: T[];

  constructor(filename: string) {
    this.dbPath = path.join(process.cwd(), `${filename}.json`);
    if (!fs.existsSync(this.dbPath)) {
      fs.writeFileSync(this.dbPath, JSON.stringify([]));
    }
    this.data = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
  }

  getAll(): T[] {
    return this.data;
  }

  getBy<K extends keyof T>(key: K, value: T[K]): T[] {
    return this.data.filter((item) => item[key] === value);
  }

  add(item: T): void {
    this.data.push(item);
    fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
  }

  edit(oldItem: T, newItem: T): void {
    const index = this.data.findIndex((d) => JSON.stringify(d) === JSON.stringify(oldItem));
    if (index === -1) {
      throw new Error("Item not found");
    }
  
    this.data[index] = newItem;
    fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
  }

  delete(item: T): void {
    const index = this.data.findIndex((d) => JSON.stringify(d) === JSON.stringify(item));
    if (index === -1) {
      throw new Error("Item not found");
    }
  
    this.data.splice(index, 1);
    fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
  }  

  clear(): void {
    this.data = [];
    fs.writeFileSync(this.dbPath, "[]");
  }
}