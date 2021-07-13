import * as ECR from 'aws-sdk/clients/ecr';
import * as STS from 'aws-sdk/clients/sts'
import {RegistryProvider} from "./RegistryProvider";
import {Docker} from "docker-cli-js";
import {DockerCreds} from "../models/types";

export class EcrService extends RegistryProvider {
  private ecr = new ECR({region: "us-west-2"});
  private sts = new STS();
  private _accountID: string;
  protected dockerCreds: DockerCreds = {userName: "AWS", password: ""};

  constructor(accountId: string, accessKeyId: string, secretAccessKey: string) {
    super();
    this.ecr.config.accessKeyId = accessKeyId;
    this.ecr.config.secretAccessKey = secretAccessKey;
    this._accountID = accountId;
  }

  // @ts-ignore
  public async credentialsValid(): Promise<string> {


    return new Promise((resolve, reject) => {
      try {
        this.sts.getCallerIdentity({}, (err, data) => {
          if (err) {
            console.log(err, err.stack);
            return reject('Credentials not valid.  Please include new environment variables.');
          }  // an error occurred
          else {
            resolve('Credentials are valid!');
          }
        })

      }catch (error){
        console.log(error)
      }
    })

  }

  public async getCreds(): Promise<DockerCreds> {


      return new Promise((resolve, reject)=>{
        this.credentialsValid().then((value)=>{
          console.log(value);
          let params = {
            registryIds: [this._accountID]
          }
          this.ecr.getAuthorizationToken(params, (err, data) => {
            if (err) {
              console.log(err, err.stack);
              reject(err)
            } else {
              //console.log(data);
              // @ts-ignore
              this.dockerCreds.password = data.authorizationData[0].authorizationToken;
              resolve(this.dockerCreds);
            }
          });
        }, (error)=>{
          //console.log(error);
          reject(error) ;
        })
      })

  }


  // @ts-ignore
  public createRepo(name: string): boolean {

    let params = {
      repositoryName: name
    };

    this.ecr.createRepository(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        return false;
      } else {
        console.log(data);
        return true;
      }
    })
  }

  get accountID(): string {
    return this._accountID;
  }

  set accountID(value: string) {
    this._accountID = value;
  }

}
