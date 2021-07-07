import {ImageRepository} from "./ImageRepository";

export class Registries {

//****** Private members *******//

  private _imageRepositories: ImageRepository [];

//***** Constructor and Methods *****//
  //Takes in a json file and stores the information needed.
  constructor(file?: string) {
  }

  public addRegistry(name: ImageRepository){
    this._imageRepositories.push(name);
  }

  public removeRegistry(name: ImageRepository){
    let imageRepos = this._imageRepositories;

    imageRepos.forEach( (imageRepo, index) => {
      if( imageRepo.imageRepoName == name ){
        console.log("Removing registry: ", name);
        delete this._imageRepositories[index];
      }
    } )
}

//***** Getter and Setters *******//
  get imageRepositories(): string[] {
    return this._imageRepositories;
  }

  set imageRepositories(value: string[]) {
    this._imageRepositories = value;
  }



}
