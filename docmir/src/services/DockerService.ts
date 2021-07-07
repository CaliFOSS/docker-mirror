import {Docker, Options} from 'docker-cli-js';
import axios from "axios";

export class DockerService {

  private _userName: string = ""
  private _userPassword: string = "";
  private docker = new Docker();
  private baseSearchUrl = 'https://registry.hub.docker.com/v1/repositories/'

  constructor(dockerDependency?: Docker) {
    //dependency injection for tests
    if (dockerDependency) {
      this.docker = dockerDependency;
    }
  }

  public dockerLogin(userName?: string, userPassword?: string): string {

    let loginWithoutCreds = 'login';

    if (userName && userPassword) {
      this._userName = userName;
      this._userPassword = userPassword

      let loginWithCreds = 'login -u ' + this._userName + ' -p ' + this._userPassword;
      // @ts-ignore
      this._userName = userName;
      // @ts-ignore
      this._userPassword = userPassword;

      this.docker.command(loginWithCreds).then((data) => {
        //console.log('data = ', data);
        return data.login;
      }, (rejected) => {
        //console.log('rejected = ', rejected);
        return rejected;
      })
    } else {
      this.docker.command(loginWithoutCreds).then((data) => {
        return data.login;
      }, (rejected) => {
        return "Login Failed.  Please re-login";
      })
    }
    console.error("Incorrect usage of docker login");
    return "";
  }

  public dockerLogout(): string {
    this.docker.command('logout').then((data) => {
      return data;
    }, (rejected) => {
      return "Logout Failed.  Please re-login";
    })
    return "Failure"
  }

  public getAllTags(imageName: string) {
    axios.get(this.baseSearchUrl + imageName + '/tags').then((response) => {
      response.data.forEach((element: { name: any; }) => {
        console.log(element.name);
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  public pullImage(imageName: string, imageTag?: string): boolean {

    let pullImageCommand = "";
    if (imageTag) {

      pullImageCommand = "pull " + imageName + ":" + imageTag;
    } else {
      pullImageCommand = "pull " + imageName;
    }

    this.docker.command(pullImageCommand).then((data) => {
      console.log(data)
      return true;
    }, (rejected) => {
      return false;
    })
  return false;

  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get userPassword(): string {
    return this._userPassword;
  }

  set userPassword(value: string) {
    this._userPassword = value;
  }
}