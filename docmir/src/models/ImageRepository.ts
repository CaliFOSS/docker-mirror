import { Docker, Options } from 'docker-cli-js';

import axios from 'axios';

// @ts-ignore
import TagState = ImageRepository.TagState;

interface Tag {
  tag: string;
  isSynced: boolean;
}

export class ImageRepository {

  private _registryServer: string = "";
  private _userName: string = "";
  private _password: string = "";
  private _imageRepoName: string;
  private _managedTags: Tag [];
  private searchUrl: string;

  constructor(imageRepoName: string, registryServer?: string, userName?: string, password?: string ) {

    this._imageRepoName = imageRepoName;
    this.searchUrl = 'https://registry.hub.docker.com/v1/repositories/' + imageRepoName + '/tags';
    if (registryServer && userName && password){
      this._registryServer = registryServer;
      this._userName = userName;
      this._password = password;
    }
  }

  public getAvailabletags(){
    axios.get(this.searchUrl).then( (response)  => {
      response.data.forEach( (element: { name: any; }) => {
        console.log(element.name);
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  public addTag(tag:Tag){
    this._managedTags.push(tag);
  }



  public pushImage(): boolean{

    return true;
  };

  public findAllTags(){};
  public diffState(){};
  public findImage(){};


  get registryServer(): string {
    return this._registryServer;
  }

  set registryServer(value: string) {
    this._registryServer = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get imageRepoName(): string {
    return this._imageRepoName;
  }

  set imageRepoName(value: string) {
    this._imageRepoName = value;
  }


  get managedTags(): Tag[] {
    return this._managedTags;
  }

  set managedTags(value: Tag[]) {
    this._managedTags = value;
  }
}

