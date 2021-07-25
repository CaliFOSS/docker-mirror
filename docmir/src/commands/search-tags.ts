import {Command, flags} from '@oclif/command'
import {SyncController} from '../controllers/SyncController'

export default class SearchTags extends Command {
  static description = 'Searches dockerhub for available images of the docker registry'

  static flags = {
    help: flags.help({char: 'h'}),
    limit: flags.string({char: 'l', description: 'Limit the number of tags to pull', hidden: true}),
  }

  static args = [
    {name: 'imagename', required: true, description: 'Image you want to get tags from'},
    {name: 'provider', default: 'docker', description: 'The registry provider to search.', options: ['ecr', 'docker']},
  ]

  async run() {
    const {args, flags} = this.parse(SearchTags)

    const syncController = new SyncController()
    if (flags.limit) {
      console.log('Functionality not implemented yet')
      process.exit(1)
    } else {
      syncController.searchTags(args.imagename, args.provider)
    }
  }
}

