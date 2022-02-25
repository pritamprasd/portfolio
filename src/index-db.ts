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

export interface IProjectData extends IBaseModel{
    title: string;
    name: string;
    description: string;
    forks: number;
    languages: string[];
    projectUrl: string;
}

export interface ITextEditorFiles extends IBaseModel{
    name: string;
    content: string;
}

class AppStorageDb extends Dexie {    
    vscodeFiles!: Dexie.Table<IVSCodeFiles, number>;
    clipboard!: Dexie.Table<IClipboardfiles, number>;
    projects!: Dexie.Table<IProjectData, number>;
    textEditorFiles!: Dexie.Table<ITextEditorFiles, number>;

    constructor () {
        super("AppStorageDB");
        this.version(1).stores({
            vscodeFiles: '++id, &name',
            clipboard: '++id, &text',
            projects: '++id, &title, *languages',
            textEditorFiles: '++id, &name',
        });
    }
}

export const normalizedTableNames: {[key: string]: string} = {
    'vscodeFiles' : 'Code Editor Saved Files',
    'clipboard' : 'Clipboard tool saved clips',
    'projects' : 'Refresh Information on Project Page',
    'textEditorFiles': 'Text Editor saved docs'
}

export const db = new AppStorageDb();