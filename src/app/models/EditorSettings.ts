export class EditorSettings {
    public static CONTEXT_DEFAULT: string = "dtmi:dtdl:context;2";
    public static SCHEME_DEFAULT: string = "dtmi";
    public static PATH_DEFAULT: Array<string> = new Array<string>("com", "dtdlEditor", "1");
    public static VERSION_DEFAULT: string = "1";
    public static LOCALE_DEFAULT: string = "en-US";
    public static DTDLVERSION_DEFAULT: string = "2";

    
    public context: string;
    public scheme: string;
    public path: string[];
    public version: string;
    public baseDtmi!: string;
    public fullPath!: string;
    public locale!: string;
    public dtdlVersion!: string;

    constructor() {
        this.context = EditorSettings.CONTEXT_DEFAULT;
        this.scheme = EditorSettings.SCHEME_DEFAULT;
        this.path = EditorSettings.PATH_DEFAULT;
        this.version = EditorSettings.VERSION_DEFAULT;
        this.locale = EditorSettings.LOCALE_DEFAULT;
        this.dtdlVersion = EditorSettings.DTDLVERSION_DEFAULT;
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
      newSettings.context = settings.context ?? EditorSettings.CONTEXT_DEFAULT;
      newSettings.scheme = settings.scheme ?? EditorSettings.SCHEME_DEFAULT;
      newSettings.path = settings.fullPath.split(":") ?? EditorSettings.PATH_DEFAULT;
      newSettings.version = settings.version ?? EditorSettings.VERSION_DEFAULT;
      newSettings.locale = settings.locale ?? EditorSettings.LOCALE_DEFAULT;
      newSettings.dtdlVersion = settings.dtdlVersion ?? EditorSettings.DTDLVERSION_DEFAULT;
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
  public locale!: string;
  public dtdlVersion!: string;

  constructor() {}
}