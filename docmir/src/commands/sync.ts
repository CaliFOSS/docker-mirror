import {Command, flags} from '@oclif/command'
import {SyncController} from '../controllers/SyncController'

export default class Sync extends Command {
  static description = 'Syncs all tags missing in target registry. \n' +
    'Note: you must create a sync first before syncing the entire repo at this point.  This is best used for when you want to keep a sync up to date'

  static flags = {
    help: flags.help({char: 'h'}),

  }

  static args = [
    {name: 'repo', require: true, },
    {name: 'provider', required: true}
  ]

  async run() {
    const {args, flags} = this.parse(Sync)
    const syncController = new SyncController()

    syncController.diffTags(args.repo, args.provider)




  }
}
