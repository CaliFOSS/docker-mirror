import {Docker, dockerCommand, Options} from 'docker-cli-js';


export class DockerUser {

  private userName: string;
  private userPassword: string;

  constructor(userName: string, userPassword: string) {
    this.userName = userName;
    this.userPassword = userPassword;

    this.dockerLogin();
  }

  public dockerLogin() {

    let docker = new Docker();
    let loginCommand = 'login -u ' + this.userName + ' -p ' + this.userPassword;

    docker.command(loginCommand).then(function (data) {
      console.log('data = ', data);
    }, function (rejected) {
      console.log('rejected = ', rejected);
    })

  }
}
