import {Docker, Options} from 'docker-cli-js';


export class DockerUser {

  private _userName: string = ""
  private _userPassword: string = "";
  private _userAuthenticated: boolean = false;
  //initialize docker command line
  private docker = new Docker();

  constructor() {
  }

  public dockerLogin(userName?: string, userPassword?: string): string {
    let loginWithCreds = 'login -u ' + this._userName + ' -p ' + this._userPassword;
    let loginWithoutCreds = 'login';

    if (userName || userPassword){
      this._userName = userName;
      this._userPassword = userPassword;

      this.docker.command(loginWithCreds).then((data) => {
        //console.log('data = ', data);
        this._userAuthenticated = true;
        return data.login;
      }, (rejected) => {
        //console.log('rejected = ', rejected);
        this._userAuthenticated = false;
        return rejected;
      })
    }else{
      this.docker.command(loginWithoutCreds).then((data) => {
        return data.login;
      })
    }
    return "";





  }


  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
    this._userAuthenticated = false;
  }

  get userPassword(): string {
    return this._userPassword;
  }

  set userPassword(value: string) {
    this._userPassword = value;
    this._userAuthenticated = false;
  }

  get userAuthenticated(): boolean {
    return this._userAuthenticated;
  }

}
