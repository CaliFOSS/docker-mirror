import { Docker, Options } from 'docker-cli-js';
import * as path from "path";


export class Registry {

  private dockerHubRepo: string;
  private ecrRegistry: string;
  private tagsSynced: [];


  constructor(dockerHubRepo: string) {
    this.dockerHubRepo = dockerHubRepo;
  };

  public printRepo(): void {
    console.log(this.dockerHubRepo);
  }

}
