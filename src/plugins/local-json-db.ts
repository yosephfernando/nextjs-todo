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

  add(item: T): void {
    this.data.push(item);
    fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
  }

  clear(): void {
    this.data = [];
    fs.writeFileSync(this.dbPath, "[]");
  }
}