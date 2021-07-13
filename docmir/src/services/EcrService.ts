import * as ECR from 'aws-sdk/clients/ecr'
import * as STS from 'aws-sdk/clients/sts'
import {RegistryProvider} from './RegistryProvider'
import {Docker} from 'docker-cli-js'
import {DockerCreds} from '../models/types'

export class EcrService extends RegistryProvider {
  private ecr = new ECR({region: 'us-west-2'});

  private sts = new STS();

  private _accountID: string;

  protected dockerCreds: DockerCreds = {userName: 'AWS', password: ''};

  constructor(accountId: string, accessKeyId: string, secretAccessKey: string) {
    super()
    this.ecr.config.accessKeyId = accessKeyId
    this.ecr.config.secretAccessKey = secretAccessKey
    this._accountID = accountId
  }

  // @ts-ignore
  public async credentialsValid(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.sts.getCallerIdentity({}, (err, data) => {
          if (err) {
            console.log(err, err.stack)
            return reject('Credentials not valid.  Please include new environment variables.')
          }  // an error occurred

          resolve('Credentials are valid!')
        })
      } catch (error) {
        console.log(error)
        reject("Credentials not valid")
      }
    })
  }

  public async getCreds(): Promise<DockerCreds> {
    return new Promise((resolve, reject) => {
      this.credentialsValid().then(value => {
        console.log(value)
        const params = {
          registryIds: [this._accountID],
        }
        this.ecr.getAuthorizationToken(params, (err, data) => {
          if (err) {
            //console.log(err, err.stack)
            reject(err)
          } else {
            // console.log(data);
            // @ts-ignore
            this.dockerCreds.password = atob(data.authorizationData[0].authorizationToken).split(':')[1];
            resolve(this.dockerCreds)
          }
        })
      }, error => {
        // console.log(error);
        reject(error)
      })
    })
  }

  // @ts-ignore
  public createRepo(name: string): boolean {
    const params = {
      repositoryName: name,
    }

    this.ecr.createRepository(params, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        return false
      }
      console.log(data)
      return true
    })
  }

  public async getTags(image: string): Promise<string[]> {

    return new Promise((resolve, reject) => {
      let images: string[] = [];

      let params2 = {
        repositoryName: image
      }

      this.ecr.listImages(params2, function (err, data) {
        if (err) {
          return reject(err);
        } // an error occurred
        else {
          //console.log(data);
          data.imageIds?.forEach((imageId) => {
            if (imageId.imageTag) {
              images.push(imageId.imageTag);
            }

          })

          return resolve(images);

        }

      })

      // successful response
      /*
      data = {
       imageIds: [
          {
         imageDigest: "sha256:764f63476bdff6d83a09ba2a818f0d35757063724a9ac3ba5019c56f74ebf42a",
         imageTag: "precise"
        }
       ]
      }
      */
    });

  };

  get accountID(): string {
    return this._accountID
  }

  set accountID(value: string) {
    this._accountID = value
  }
}
