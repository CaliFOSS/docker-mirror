import {DockerService} from "../services/DockerService";
import Doc = Mocha.reporters.Doc;
import {ImageRepository} from "../models/ImageRepository";
import {EcrService} from "../services/EcrService";


export class SyncController {
  private dockerService = new DockerService();
  //private ecrService = new EcrService();
  //private imageRepository = new ImageRepository();

  public authDockerHub(username: string, password: string): string{
    return(this.dockerService.dockerLogin(username, password));
  };

  public isLoggedIn(){
      return this.dockerService.dockerLogin();
  }

  public searchTags(imageName: string){
    this.dockerService.getAllTags(imageName);

  }

  //public searchTags(): string[]{};
  //public pullImage(): void{};







}
