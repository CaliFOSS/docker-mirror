import {Command, flags} from '@oclif/command'
import {SyncController} from '../controllers/SyncController'

export default class Searchtags extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    limit: flags.string({char: 'l', description: 'Limit the number of tags to pull'}),
  }

  static args = [{name: 'imagename'}, {name: 'provider', options: ['ecr', 'docker']}, {name: 'server'}]

  async run() {
    const {args, flags} = this.parse(Searchtags)

    const syncController = new SyncController()
    if (flags.limit) {
      console.log('Functionality not implemented yet')
    } else {
      syncController.searchTags(args.imagename, args.provider)
    }
  }
}

