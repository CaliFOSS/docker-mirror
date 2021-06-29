
export class Registries {

//****** Private members *******//
  private _imageRepositories: string [];

//***** Constructure and Methods *****//
  constructor() {
  }

  public printState(){}


//***** Getter and Setters *******//
  get imageRepositories(): string[] {
    return this._imageRepositories;
  }

  set imageRepositories(value: string[]) {
    this._imageRepositories = value;
  }



}
