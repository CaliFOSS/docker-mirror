import { Docker, Options } from 'docker-cli-js';
import * as ecr from 'aws-sdk/clients/ecr';


export class ImageRepository {

  private _registryServer: string;
  private _userName: string;
  private _password: string;
  private _imageRepoName: string;
  private _dockerRegistryServer = "index.docker.io";

  constructor(registryServer: string, userName: string, password: string, imageRepoName: string) {
    this._registryServer = registryServer;
    this._userName = userName;
    this._password = password;
    this._imageRepoName = imageRepoName;
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
}
