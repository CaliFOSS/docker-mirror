import {Docker, Options} from 'docker-cli-js';


export class DockerUser {

  private _userName: string = ""
  private _userPassword: string = "";
  //initialize docker command line
  private docker = new Docker();

  constructor() {
  }

  public dockerLogin(userName?: string, userPassword?: string): string {

    let loginWithoutCreds = 'login';

    if (userName && userPassword){
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
    }else{
      this.docker.command(loginWithoutCreds).then((data) => {
        return data.login;
      }, (rejected) => {
        return "Login Failed.  Please re-login";
      })
    }
    console.error("Incorrect usage of docker login");
    return "";
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
