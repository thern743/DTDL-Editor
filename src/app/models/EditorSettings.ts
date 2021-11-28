export class EditorSettings {
    public context!: string;
    public baseDtmi!: string;

    constructor() {
        this.context = "dtmi:dtdl:context;2";
        this.baseDtmi = "dtmi:com:dtdlEditor:default;1";
    }
}