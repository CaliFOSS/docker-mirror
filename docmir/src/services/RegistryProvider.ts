import {DockerCreds} from "../models/types";

export abstract class RegistryProvider {
  protected abstract dockerCreds: DockerCreds;

  //get creds used for docker commands
  abstract getCreds(): DockerCreds;

  //make sure the provider has valid credentials.
  //include logging in this method for handling invalid credentials.  The boolean is for handling in multipart flows.
  abstract credentialsValid(): boolean;

  constructor() {
  }

}
