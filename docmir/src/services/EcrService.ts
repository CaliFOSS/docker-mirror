import * as ECR from 'aws-sdk/clients/ecr';
import {RegistryProvider} from "./RegistryProvider";
import {Docker} from "docker-cli-js";
import {DockerCreds} from "../models/types";

export class EcrService extends RegistryProvider {
  private ecr = new ECR({region: "us-west-2"});
  private _accountID: string;
  protected dockerCreds: DockerCreds = {userName: "AWS", password: ""};

  constructor(accountId: string, accessKeyId: string, secretAccessKey: string) {
    super();
    this.ecr.config.accessKeyId = accessKeyId;
    this.ecr.config.secretAccessKey = secretAccessKey;
    this._accountID = accountId;
  }

  public getCreds(): DockerCreds {
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
  }


  get accountID(): string {
    return this._accountID;
  }

  set accountID(value: string) {
    this._accountID = value;
  }

}
