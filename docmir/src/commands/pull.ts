import {Command, flags} from '@oclif/command'
import {SyncController} from '../controllers/SyncController'

export default class Pull extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h', description: 'Help command'}),
  }

  static args = [
    {name: 'image', require: true, description: 'Image to pull from dockerhub'},
    {name: 'tag', description: 'tag to pull from dockerhub'},
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
