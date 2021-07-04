import {Command, flags} from '@oclif/command'
import {SyncController} from "../controllers/SyncController";

export default class Auth extends Command {
  static description = 'Working with Authentication for Dockerhub and registry'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    userName: flags.string({char: 'u', description: 'docker username'}),
    userPassword: flags.string({char: 'p', description: 'docker password'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'dockerhub'}]

  async run() {
    const {args, flags} = this.parse(Auth)
    let syncController = new SyncController();

    if (args.dockerhub && flags.userPassword && flags.userName) {
      this.log(syncController.authDockerHub(flags.userName, flags.userPassword));

    }else if(args.dockerhub){
      this.log(syncController.whoAmIDocker());
    }
    else {
      this.log('Nothing to do');
    }
  }
}
