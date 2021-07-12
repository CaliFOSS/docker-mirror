import {ImageRepository} from "./ImageRepository";

export class Registries {

//****** Private members *******//

  // @ts-ignore
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
      // @ts-ignore
      if( imageRepo.imageRepoName == name ){
        console.log("Removing registry: ", name);
        delete this._imageRepositories[index];
      }
    } )
}

//***** Getter and Setters *******//
  get imageRepositories(): ImageRepository[] {
    return this._imageRepositories;
  }

  // @ts-ignore
  set imageRepositories(value: ImageRepository[]): ImageRepository {
    this._imageRepositories = value;
  }



}
