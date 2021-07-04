
export class Registries {

//****** Private members *******//
  private _imageRepositories: string [];

//***** Constructor and Methods *****//
  //Takes in a json file and stores the information needed.
  constructor(file: String) {

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
