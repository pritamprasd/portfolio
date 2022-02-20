import Dexie from "dexie";

// files: '++id, name, content, is_deleted, created_at, modified_at', // Primary key and indexed props
interface IVSCodeFiles {
    id?: number;
    name: string;
    content: string;
    is_deleted: boolean;
    created_at: number;
    modified_at: number;
}


class AppStorageDb extends Dexie {    
    vscodeFiles!: Dexie.Table<IVSCodeFiles, number>;

    constructor () {
        super("VSCodeStorageDB");
        this.version(1).stores({
            vscodeFiles: '++id, &name',
        });
    }
}

export const db = new AppStorageDb();