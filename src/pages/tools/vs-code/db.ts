import Dexie from 'dexie';

// files: '++id, name, content, is_deleted, created_at, modified_at', // Primary key and indexed props
interface IVSCodeFiles {
    id?: number;
    name: string;
    content: string;
    is_deleted: boolean;
    created_at: number;
    modified_at: number;
}


class VSCodeStorageDB extends Dexie {    
    vscodeFiles!: Dexie.Table<IVSCodeFiles, number>;

    constructor () {
        super("VSCodeStorageDB");
        this.version(1).stores({
            vscodeFiles: '++id, &name',
        });
    }
}

export const db = new VSCodeStorageDB();

export async function addNewCodeFile(_name:string, _content:string) {
    const id = db.table("vscodeFiles").put({
        name: _name,
        content: _content,
        is_deleted: false,
        created_at: Date.now(),
        modified_at: Date.now()
    });
}

export function getAllCode() {    
    const codes:any = []
    var files = db.table("vscodeFiles").toCollection();
    files.each((file) => {
        // console.log(file)
        codes.push({
            name: file['name'],
            content: file['content']
        })
    });
    return codes;
}