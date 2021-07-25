import {Command, flags} from '@oclif/command'
import {SyncController} from '../controllers/SyncController'

export default class CreateRepo extends Command {
  static description = 'Create a repo for the provider'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'provider', required: true, description: 'The registry provider you are using', options: ['ecr', 'docker']},
    {name: 'reponame', required: true, description: 'Name you want the repo to be called. By defualt syncs are created with the name of the repo '},
  ]

  async run() {
    const {args, flags} = this.parse(CreateRepo)
    const syncController = new SyncController()

    if (args.reponame) {
      this.log('Creating registry for \'' + args.provider + '\' using name \'' + args.reponame + '\'')
      syncController.createRepository(args.provider, args.reponame)
    } else {
      this.log('Missing Repo name')
    }
  }
}
