import {Command, flags} from '@oclif/command'
import {SyncController} from '../controllers/SyncController'

export default class Pull extends Command {
  static description = 'Will pull an image from docker hub directly to local machine'

  static flags = {
    help: flags.help({char: 'h', description: 'Help command'}),
  }

  static args = [
    {name: 'image', require: true, description: 'Image to pull from dockerhub'},
    {name: 'tag', description: 'Tag to pull from dockerhub.  Defaults to latest if not used'},
  ]

  async run() {
    const {args, flags} = this.parse(Pull)
    const syncController = new SyncController()

    if (args.tag) {
      syncController.pullImageFromDocker(args.image, args.tag)
    } else {
      syncController.pullImageFromDocker(args.image)
    }
  }
}
