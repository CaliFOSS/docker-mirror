import {DockerService} from "../services/DockerService";
import Doc = Mocha.reporters.Doc;
import {ImageRepository} from "../models/ImageRepository";
import {EcrService} from "../services/EcrService";
import {Providers} from "../models/types";
import {RegistryService} from "../services/RegistryService";


export class SyncController {
  private awsAccountId = process.env.AWS_ACCOUNT_ID || '';
  private awsAccessKeyID = process.env.AWS_ACCESS_KEY_ID || '';
  private awsSecreteAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';

  private dockerService = new DockerService();
  private ecrService: EcrService | undefined;
  private registryService = new RegistryService()

  constructor() {
    if (this.awsAccountId == '' || this.awsAccessKeyID == '' || this.awsSecreteAccessKey == '') {
      console.log('Warning:  AWS credentials are not set properly, working with ecr is not guaranteed');
    } else {
      this.ecrService = new EcrService(this.awsAccountId, this.awsAccessKeyID, this.awsSecreteAccessKey);
    }
  }

  // @ts-ignore

  //private ecrService = new EcrService();
  //private imageRepository = new ImageRepository();

  public dockerLogin(username: string, password: string, provider?: Providers, repoServer?: string): string {


    switch (provider) {
      case Providers.ecr:
        console.log("call ecr login")
        break;
      case Providers.docker:
        return (this.dockerService.dockerLogin(username, password));
        break;
      default:
        return (this.dockerService.dockerLogin(username, password));
        break;
    }
    return "The provider was not found.  Please use another provider."

  };

  public isLoggedIn(provider: Providers) {

    switch (provider) {
      case Providers.ecr:
        this.ecrService?.credentialsValid()
        break;
      case Providers.docker:
        return this.dockerService.dockerLogin();
        break;
      default:
        return this.dockerService.dockerLogin();
        break;

    }


  }

  public searchTags(imageName: string) {
    this.dockerService.getAllTags(imageName);

  }

  public pullImageFromDocker(imageName: string, imageTag?: string): string {

    if (this.dockerService.pullImage(imageName, imageTag)) {
      return "Image is now local"
    } else {
      return "Image pull failed"
    }
  }


  public pushImage(provider: Providers, imageName: string, repoURL: string, tag: string) {

    switch (provider) {
      case Providers.ecr:
        //TODO: check if repo exists
        //TODO: validate docker login
        //TODO: Add repo to state and save
        let creds = this.ecrService?.getCreds();
        this.dockerService.dockerLoginRepo(repoURL, creds?.userName, creds?.password);
        this.dockerService.pushImage(repoURL, imageName, tag);
        break;
      case Providers.docker:
        break;
      default:
        console.log("No provider found... please try again")
        break;

    }


  }


  public createRepository(provider: Providers, repoName: string) {

    console.log(provider);
    switch (provider) {
      case Providers.ecr:
        if (this.ecrService?.createRepo(repoName)) {
          //console.log("inside create registry");
          return "Repo Created Successfully";
        } else {
          return "Repo Creation Failed";
        }
        break;
      case Providers.docker:
        return "We don't support docker registry currently";
        break;
      default:
        return "No repo was created because there wasn't a properly defined provider";
        break;
    }
  }
}
