import Dexie from 'dexie';

export const db = new Dexie('codeDB');
db.version(1).stores({
    files: '++id, &name', // Primary key and indexed props
});


// files: '++id, name, content, is_deleted, created_at, modified_at', // Primary key and indexed props


export async function addNewCodeFile(_name, _content) {
    const id = await db.files.add({
        name: _name,
        content: _content,
        is_deleted: false,
        created_at: Date.now(),
        modified_at: Date.now()
    });
}

export function getAllCode() {
    const codes = []
    var files = db.files.toCollection();
    files.each((file) => {
        // console.log(file)
        codes.push({
            name: file['name'],
            content: file['content']
        })
    });
    return codes;
}