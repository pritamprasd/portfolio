import YAML from 'yaml';

export const yamlToJson = (input: string) => {
    const yaml = YAML.parse(input);
    try {
        console.log(`yaml obj: `)
        console.table(yaml)
        return JSON.stringify(yaml, null, 2);
    } catch (error) {
        console.log(`EEE: ${error} | ${input}`)
        return JSON.stringify(error);
    }
     
}

export const isYaml = (input: string) => {
    try {
        YAML.parse(input);
        return true;
    } catch (error) {
        return false;
    }
}