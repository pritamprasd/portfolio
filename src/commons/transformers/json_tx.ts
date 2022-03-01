import YAML from 'yaml';

export const jsonToYaml = (input: string) => {
    const doc = new YAML.Document();
    try {
        doc.contents = JSON.parse(input);
        return doc.toString();
    } catch (error) {
        return `Error: ${JSON.stringify(error)}`
    }
}

export const jsonBeautify = (input: string) => {
    return input;
}