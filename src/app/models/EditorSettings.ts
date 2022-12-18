export class EditorSettings {
    public context: string;
    public scheme: string;
    public path: string[];
    public version: string;
    public baseDtmi!: string;
    public fullPath!: string;

    constructor() {
        this.context = "dtmi:dtdl:context;2";
        this.scheme = "dtmi";
        this.path = new Array<string>();
        this.path.push("com");
        this.path.push("dtdlEditor");        
        this.version = "1";
        this.setFullPath();
        this.setBaseDtmi();
    }

    public setBaseDtmi() {
      this.baseDtmi = `${this.scheme}:${this.fullPath}:default;${this.version}`
    }

    public setFullPath() {
      if(this.path.length == 0) return;

      let path = "";

      this.path.forEach((text: string) => {
        path = `${path}:${text}`;
      });

      this.fullPath = path.substring(1);
    }

    public static fromDto(settings: EditorSettingsDto): EditorSettings {
      let newSettings = new EditorSettings();
      newSettings.context = settings.context;
      newSettings.scheme = settings.scheme;
      newSettings.path = settings.fullPath.split(":");
      newSettings.version = settings.version;
      newSettings.setFullPath();
      newSettings.setBaseDtmi();
      return newSettings;
    }
}

export class EditorSettingsDto {
  public context!: string;
  public scheme!: string;
  public version!: string;
  public baseDtmi!: string;
  public fullPath!: string;

  constructor() {}
}