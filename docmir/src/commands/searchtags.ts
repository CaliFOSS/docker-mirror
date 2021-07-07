import {Command, flags} from '@oclif/command'
import {SyncController} from "../controllers/SyncController";

export default class Searchtags extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    limit: flags.string({char: 'l', description: 'name to print'}),
  }

  static args = [{name: 'imagename'}]

  async run() {
    const {args, flags} = this.parse(Searchtags)

    let syncController = new SyncController();
    if (flags.limit) {
    } else {
      syncController.searchTags(args.imagename);
    }
  }
}

