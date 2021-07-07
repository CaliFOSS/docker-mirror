import {Command, flags} from '@oclif/command'
import {SyncController} from "../controllers/SyncController";

export default class Pull extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    tag: flags.string({char: 't', description: 'name to print'}),
  }

  static args = [{name: 'image'}, {name: 'tag'}]

  async run() {
    const {args, flags} = this.parse(Pull)
    let syncController = new SyncController();

    if(args.tag){
      syncController.pullImageFromDocker(args.image, args.tag);
    }else{
      syncController.pullImageFromDocker(args.image);
    }
  }


}
