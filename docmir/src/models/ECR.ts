import * as ecr from 'aws-sdk/clients/ecr';

export class ECR {
  private ecr = new ecr();
  private _accountID: string;
  private _authToken: string = "";

  constructor(accountId: string) {
    this._accountID = accountId;
    this.getToken();
  }

  public getToken() {
    let params = {
      registryIds: [this._accountID]
    }

    this.ecr.getAuthorizationToken(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
        // @ts-ignore
        this._authToken = data.authorizationData[0].authorizationToken;
        return data.authorizationData[0].authorizationToken;
      }
    });
  }


  get accountID(): string {
    return this._accountID;
  }

  set accountID(value: string) {
    this._accountID = value;
  }

  get authToken(): string {
    return this._authToken;
  }

  set authToken(value) {
    this._authToken = value;
  }
}
