import Dexie from "dexie";

// files: '++id, name, content, is_deleted, created_at, modified_at', // Primary key and indexed props

interface IBaseModel{
    id?: number;
    is_deleted: boolean;
    created_at: number;
    modified_at: number;
}

interface IVSCodeFiles extends IBaseModel{
    name: string;
    content: string;
}

interface IClipboardfiles extends IBaseModel{
    text: string;
    type?: string;
}


class AppStorageDb extends Dexie {    
    vscodeFiles!: Dexie.Table<IVSCodeFiles, number>;
    clipboard!: Dexie.Table<IClipboardfiles, number>;

    constructor () {
        super("AppStorageDB");
        this.version(1).stores({
            vscodeFiles: '++id, &name',
            clipboard: '++id, &text',
        });
    }
}

export const db = new AppStorageDb();