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
  public credentialsValid(): boolean {
    this.sts.getCallerIdentity({}, (err, data) => {
      if (err) {
        console.log('Credentials not valid.  Please include new environment variables.');
        console.log(err, err.stack);
        return false;
      }  // an error occurred
      else {
        console.log('Credentials are valid!')
        return true;
      }
    })
  }

  public getCreds(): DockerCreds {

    if (this.credentialsValid()) {
      let params = {
        registryIds: [this._accountID]
      }
      this.ecr.getAuthorizationToken(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(data);
          // @ts-ignore
          this.dockerCreds.password = data.authorizationData[0].authorizationToken;
          return this.dockerCreds;
        }
      });
      return this.dockerCreds;
    } else {
      console.log('Invalid AWS credentials.  Please add new credentials.')
      return this.dockerCreds;
    }
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
