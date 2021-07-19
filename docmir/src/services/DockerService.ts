import {Docker, Options} from 'docker-cli-js'
import * as Sinon from 'sinon'
import axios from 'axios'
import {Providers} from '../models/types'
import {rejects} from "assert";

export class DockerService {
  private _userName = ''

  private _userPassword = '';

  private docker = new Docker();

  private baseSearchUrl = 'https://registry.hub.docker.com/v1/repositories/'

  public dockerStub: any

  constructor(test?: boolean) {
    if (test) {
      this.dockerStub = Sinon.stub(this.docker, 'command').withArgs('login')
      this.dockerStub.resolves('asdf')
      /*
      this.dockerStub = Sinon.createStubInstance(Docker);
      this.dockerStub.command('login').returnsThis();
      this.docker = this.dockerStub();
       */

      // (Promise.resolve('Login Succeeded'))
    }
  }

  // @ts-ignore
  public async dockerLogin(userName?: string, userPassword?: string): Promise<string> {
    const loginWithoutCreds = 'login'

    return new Promise((resolve, reject) => {
      // resolve('Log')
      if (userName && userPassword) {
        this._userName = userName
        this._userPassword = userPassword

        const loginWithCreds = 'login -u ' + this._userName + ' -p ' + this._userPassword
        // @ts-ignore
        this._userName = userName
        // @ts-ignore
        this._userPassword = userPassword

        this.docker.command(loginWithCreds).then(data => {
          // console.log('data = ', data);
          return resolve(data.login)
        }, rejected => {
          // console.log('rejected = ', rejected);
          return reject(rejected)
        })
      } else {
        this.docker.command(loginWithoutCreds).then(data => {
          resolve(data.login)
        }, rejected => {
          return reject('Login Failed.  Please re-login')
        })
      }
    })
  }

  // @ts-ignore
  public async dockerLoginRepo(repository: string, userName?: string, userPassword?: string): Promise<string> {
    const loginWithoutCreds = 'login ' + repository
    //console.log(userName, userPassword)
    return new Promise((resolve, reject) => {
      if (userName && userPassword) {
        this._userName = userName
        this._userPassword = userPassword

        const loginWithCreds = 'login ' + repository + ' -u ' + this._userName + ' -p ' + this._userPassword
        // @ts-ignore
        this._userName = userName
        // @ts-ignore
        this._userPassword = userPassword

        this.docker.command(loginWithCreds).then(data => {
          // console.log('data = ', data);
          resolve(data.login)
        }, rejected => {
          // console.log('rejected = ', rejected);
          return reject(rejected)
        })
      } else {
        this.docker.command(loginWithoutCreds).then(data => {
          resolve(data.login)
        }, rejected => {
          console.log(rejected)
          return reject('Login Failed.  Please re-login')
        })
      }
    })
  }

  public async pushImage(repository: string, imageName: string, tag: string): Promise<boolean> {
    // TODO: check if image is local first by listing all images
    return new Promise((resolve, rejects)=>{
      this.docker.command('tag ' + imageName + ':' + tag + ' ' + repository + ':' + tag).then(data => {
        //console.log(data)
        this.docker.command('push ' + repository + ':' + tag).then(data => {
          //console.log(data)
          return resolve(true)
          console.log('Image has been uploaded')
        }, rejected => {
          console.log(rejected)
          return rejects(rejected)
          console.log('There seems to be a problem with the push')
        })
      }, rejected => {
        console.log(rejected)
        return rejects(rejected)
        console.log('There was an issue with the tagging of the image.')
      })

    })

  }

  public dockerLogout(): string {
    this.docker.command('logout').then(data => {
      return data
    }, rejected => {
      return 'Logout Failed.  Please re-login'
    })
    return 'Failure'
  }

  public getAllTags(imageName: string) {
    axios.get(this.baseSearchUrl + imageName + '/tags').then(response => {
      response.data.forEach((element: { name: any }) => {
        console.log(element.name)
      })
    }).catch(error => {
      if (error.response.status === 404) {
        console.log('The registry ' + imageName + ' was not found on docker hub.')
      } else {
        console.log(error)
      }
    })
  }

  public async pullImage(imageName: string, imageTag?: string): Promise<boolean> {
    let pullImageCommand = ''
    if (imageTag) {
      pullImageCommand = 'pull ' + imageName + ':' + imageTag
    } else {
      pullImageCommand = 'pull ' + imageName
    }

    this.docker.command(pullImageCommand).then(data => {
      //console.log(data)
      return true
    }, rejected => {
      return false
    })
    return false
  }

  get userName(): string {
    return this._userName
  }

  set userName(value: string) {
    this._userName = value
  }

  get userPassword(): string {
    return this._userPassword
  }

  set userPassword(value: string) {
    this._userPassword = value
  }
}
