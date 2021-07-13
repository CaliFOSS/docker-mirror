import {Command, flags} from '@oclif/command'
import {SyncController} from '../controllers/SyncController'

export default class Push extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
  }

  static args = [
    {name: 'provider', required: true, options: ['ecr', 'docker'], description: 'The provider you will push images to'},
    {name: 'image', required: true},
    {name: 'repoURL', required: true},
    {name: 'tag', required: true},

  ]

  async run() {
    const {args, flags} = this.parse(Push)
    const syncController = new SyncController()

    syncController.pushImage(args.provider, args.image, args.repoURL, args.tag)
  }
}
