import {Command, flags} from '@oclif/command'
import {SyncController} from '../controllers/SyncController'

export default class Registry extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [
    {name: 'provider', required: true, description: "The registry provider you are using", options: ['ecr', 'docker']},
    {name: 'command', required: true, description: "Commands for providers", options: ['create-repo', 'create-sync']},
    {name: 'reponame'},
  ]

  async run() {
    const {args, flags} = this.parse(Registry)
    const syncController = new SyncController()

    if (args.command === 'create-repo') {
      if (args.reponame) {
        this.log('creating registry for \'' + args.provider + '\' using name \'' + args.reponame + '\'')
        syncController.createRepository(args.provider, args.reponame)
      } else {
        this.log('Missing Repo name')
      }
    }else if(args.command === 'create-sync'){

    }
  }
}
