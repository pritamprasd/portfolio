import React, { useRef, useEffect, useState } from 'react';
import { languages, themes } from './utils';
import * as monaco from 'monaco-editor';
import { Button, Code, Divider, Drawer, Grid, Select, SimpleGrid, Space, Text } from '@mantine/core';
import FileManager from '../../../components/FileManager';
import { forceUpdateCodeEditorContent, updateCodeEditorContent, updateEditorLag } from './vsEditorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { styles } from '../../../storage/data';
import { detectLanguage, jsonToYaml } from '../../../commons/utils';
import { Prism } from '@mantine/prism';

export const Editor = () => {
    const divEl = useRef<HTMLDivElement>(null);
    const editorLang = useSelector((state: RootState) => state.vseditor.editorLang);
    const [editorTheme, setEditorTheme] = useState(themes[1])
    const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor>();
    const contentFromStore = useSelector((state: RootState) => state.vseditor.content);
    const forceUpdate = useSelector((state: RootState) => state.vseditor.forceUpdate);
    const dispatch = useDispatch();
    const [drawerOpened, setdrawerOpened] = useState<boolean>(false);

    useEffect(() => {
        if (editorInstance !== null) {
            editorInstance?.setValue(contentFromStore);
        }
    }, [forceUpdate]);

    let editor: monaco.editor.IStandaloneCodeEditor;

    useEffect(() => {
        if (divEl.current) {
            editor = monaco.editor.create(divEl.current, {
                value: contentFromStore,
                language: editorLang,
                theme: editorTheme,
                scrollBeyondLastLine: false,
            });
            editor.onKeyDown(() => {
                updateEditorCode(editor.getValue());
            })
            editor.onDidPaste((e) => {
                updateEditorCode(editor.getValue());
                dispatch(updateEditorLag(detectLanguage(editor.getValue())))
            })
            setEditorInstance(editor);
        }
        return () => {
            editor.dispose();
        };
    }, [editorLang, editorTheme]);
    function onLangChange(e: any) {
        dispatch(updateEditorLag(e.target.value))
    }
    function onThemeChange(e: any) {
        setEditorTheme(e.target.value);
    }
    function updateEditorCode(code_local: string) {
        dispatch(updateCodeEditorContent(code_local));
        localStorage.setItem('code', code_local);
    }
    return (
        <div>
            <div style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                paddingBottom: '1rem', paddingRight: '1rem'
            }}>
                <Select onClick={onLangChange} placeholder='Language' data={languages.map(l => {
                    return { label: l, value: l }
                })} value={editorLang} onChange={e => dispatch(updateEditorLag(e || ''))}
                />
                <Select onClick={onThemeChange} placeholder="Theme" data={themes.map(l => {
                    return { label: l, value: l }
                })} value={editorLang} onChange={e => setEditorTheme(e || '')}
                    style={{ padding: '0.5rem' }}
                />
                <Button onClick={() => setdrawerOpened(true)} style={{
                    marginRight: '0.5rem'
                }}>Magic</Button>
                <Text style={{ marginLeft: 'auto', marginRight: '0' }}>Detected Language:
                    <Code key={editorInstance?.getModel()?.getLanguageId()}
                        style={{ backgroundColor: styles.primary_error }}>
                        {editorInstance?.getModel()?.getLanguageId()}
                    </Code>
                </Text>
            </div>
            <Grid style={{ width: '100%', height: '100%' }}>
                <Grid.Col sm={8} span={12}>
                    <div className="Editor" ref={divEl} style={{ width: '100%', height: '70vh' }} />
                </Grid.Col>
                <Grid.Col sm={4} span={12}>
                    <FileManager tableName='vscodeFiles'
                        updateEditorContent={forceUpdateCodeEditorContent}
                        content={contentFromStore}
                    />
                </Grid.Col>
            </Grid>
            <Drawer opened={drawerOpened} onClose={() => setdrawerOpened(false)} 
                title={`Language Detected: ${editorLang}`} padding="xl" size="90vh" position="bottom">
                <Grid style={{ width: '100%', height: '100%' }}>
                    <Grid.Col sm={5} span={12}>
                        <Prism language="json" withLineNumbers scrollAreaComponent="div">{contentFromStore}</Prism>
                    </Grid.Col>
                    <Grid.Col sm={2} span={12}>
                        <div style={{display: 'flex', flexDirection: 'column', 
                                      alignItems: 'center', justifyContent: 'flex-start', rowGap: '1rem'}}>
                            <Button>To Yaml</Button>
                            <Button>Inline</Button>
                        </div>
                    </Grid.Col>
                    <Grid.Col sm={5} span={12}>
                        <Prism language="yaml" withLineNumbers>{jsonToYaml(contentFromStore)}</Prism>
                    </Grid.Col>
                </Grid>
            </Drawer>
        </div >
    );
};
