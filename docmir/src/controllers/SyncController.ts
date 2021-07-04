import {DockerUser} from "../models/DockerUser";
import Doc = Mocha.reporters.Doc;
import {ImageRepository} from "../models/ImageRepository";


export class SyncController {
  private dockerUser = new DockerUser();
  //private imageRepository = new ImageRepository();

  public authDockerHub(username: string, password: string): string{
    return(this.dockerUser.dockerLogin(username, password));
  };

  public isLoggedIn(){
      return this.dockerUser.dockerLogin();
  }

  public searchTags(imageName: string){
    let imageRepo = new ImageRepository(imageName);
    imageRepo.getAvailabletags();

  }

  //public searchTags(): string[]{};
  //public pullImage(): void{};







}
