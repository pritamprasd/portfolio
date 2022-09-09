import { db } from '../../../storage/index-db';

export async function addNewCodeFile(_name:string, _content:string) {
    const id = db.table("vscodeFiles").put({
        name: _name,
        content: _content,
        is_deleted: false,
        created_at: Date.now(),
        modified_at: Date.now()
    });
    console.log(`New File Saved, id: ${id}`)
}

export function getAllCode() {    
    const codes:any = []
    var files = db.table("vscodeFiles").toCollection();
    files.each((file) => {
        codes.push({
            name: file['name'],
            content: file['content']
        })
    });
    return codes;
}
export const languages = [
    'yaml',
    'json',
    'markdown',
    'rust',
    'python',
    'javascript',
    'java',
    'c',
    'cpp',
    'html',
    'css',
    'clojure',
    'bat',
    'coffeescript',
    'csharp',
    'dockerfile',
    'elixir',
    'go',
    'graphql',
    'julia',
    'kotlin',
    'scala',
    'lua',
    'mysql',
    'perl',
    'pgsql',
    'powershell',
    'proto',
    'ruby',
    'shell',
    'sql',
    'typescript',
    'xml'
]

export const themes = [
    "vs",
    "vs-dark",
    "hc-black"
]