import {DockerCreds} from "../models/types";

export abstract class RegistryProvider {
  protected abstract dockerCreds: DockerCreds;
  abstract getCreds(): DockerCreds;

  constructor() {
  }

}
