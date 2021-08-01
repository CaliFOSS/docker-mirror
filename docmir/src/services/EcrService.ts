import * as ECR from 'aws-sdk/clients/ecr'
import * as STS from 'aws-sdk/clients/sts'
import {RegistryProvider} from './RegistryProvider'
import {DockerCreds} from '../models/types'

export class EcrService extends RegistryProvider {
  private region = 'us-west-2'

  private ecr = new ECR({region: this.region});

  private sts = new STS();

  private _accountID: string;

  protected dockerCreds: DockerCreds = {userName: 'AWS', password: ''};

  constructor(accountId?: string, accessKeyId?: string, secretAccessKey?: string) {
    super()
    if (accountId && accessKeyId && secretAccessKey) {
      this.ecr.config.accessKeyId = accessKeyId
      this.ecr.config.secretAccessKey = secretAccessKey
      this._accountID = accountId
    } else {
      this.ecr.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID
      this.ecr.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
      this._accountID = process.env.AWS_ACCOUNT_ID || ''
    }
  }

  // @ts-ignore
  public async credentialsValid(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.sts.getCallerIdentity({}, (err, data) => {
          if (err) {
            console.log(err, err.stack)
            console.info('Credentials not valid.  Please include new environment variables.')
            return reject('Credentials not valid.  Please include new environment variables.')
          }  // an error occurred
          console.info('ECR credentials are valid!')
          resolve('Credentials are valid!')
        })
      } catch (error) {
        console.log(error)
        reject('Credentials not valid \n' + error)
      }
    })
  }

  public async getCreds(): Promise<DockerCreds> {
    return new Promise((resolve, reject) => {
      this.credentialsValid().then(value => {
        // console.log(value)
        const params = {
          registryIds: [this._accountID],
        }
        this.ecr.getAuthorizationToken(params, (err, data) => {
          if (err) {
            // console.log(err, err.stack)
            reject(err)
          } else {
            // console.log(data);
            // @ts-ignore
            this.dockerCreds.password = atob(data.authorizationData[0].authorizationToken).split(':')[1]
            resolve(this.dockerCreds)
          }
        })
      }, error => {
        // console.log(error);
        reject(error)
      })
    })
  }

  // create repo and return the repository url
  public async createRepoReturnUrl(name: string): Promise<string> {
    return new Promise((response, reject) => {
      const params = {
        repositoryName: name,
      }

      this.ecr.createRepository(params, (err, data) => {
        if (err) {
          console.log(err, err.stack)
          return reject(err)
        }
        // console.log(data)
        return response(this.getServerURI(name))
      })
    })
  }

  // helper function just to get the uri
  public getServerURI(repoName: string): string {
    const repo = this.accountID + '.dkr.ecr.' + this.region + '.amazonaws.com/' + repoName
    return repo
  }

  public async getTags(image: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const images: string[] = []

      const params2 = {
        repositoryName: image,
      }

      this.ecr.listImages(params2, function (err, data) {
        if (err) {
          return reject(err)
        } // an error occurred

        // console.log(data);
        data.imageIds?.forEach(imageId => {
          if (imageId.imageTag) {
            images.push(imageId.imageTag)
          }
        })

        return resolve(images)
      })
    })
  }

  public async repoExists(repoName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = {
        repositoryNames: [
          repoName,
        ],
      }

      this.ecr.describeRepositories(params, (error, data) => {
        if (error) {
          if (error.statusCode === 400) {
            return resolve(false)
          }
          return reject(error)
        }  // @ts-ignore
        if (data.repositories?.length > 0) {
          return resolve(true)
        }

        return reject('Error in getting the repository from ECR')
      })
    })
  }

  get accountID(): string {
    return this._accountID
  }

  set accountID(value: string) {
    this._accountID = value
  }
}
