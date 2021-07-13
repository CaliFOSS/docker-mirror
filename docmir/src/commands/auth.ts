import {Command, flags} from '@oclif/command'
import {SyncController} from "../controllers/SyncController";
import {Providers} from "../models/types";

export default class Auth extends Command {
  static description = 'Working with Authentication for Dockerhub and registry'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    userName: flags.string({char: 'u', description: 'docker username'}),
    userPassword: flags.string({char: 'p', description: 'docker password'}),
    repository: flags.string({char: 'r', description: 'Repository url'})
  }

  static args = [
    {name: 'provider', options: ['ecr', 'docker'], default: 'docker'}
  ]

  async run() {
    const {args, flags} = this.parse(Auth);
    let syncController = new SyncController();

    //dockerhub flow
    if (flags.userPassword && flags.userName) {
      this.log(syncController.dockerLogin(flags.userName, flags.userPassword));
    } else {
      this.log(syncController.isLoggedIn(args.provider));
    }

  }


}
