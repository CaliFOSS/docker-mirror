import {Command, flags} from '@oclif/command'
import {SyncController} from "../../controllers/SyncController";

export default class CreateSync extends Command {
  static description = 'This command creates a sync with a provider.  It stores everything to local file for future syncs'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [
    {name: 'provider', required: true, description: "The registry provider", options: ['ecr', 'docker']},
    {name: 'reponame', required: true, description: "Name of the docker repo you want to sync"},
    {name: 'tag', required: true, description: "The tag you want to start the sync with"}
  ]

  async run() {
    const {args, flags} = this.parse(CreateSync)
    const syncController = new SyncController()

        this.log('creating registry for \'' + args.provider + '\' using name \'' + args.reponame + '\'')
        syncController.addRepoSync(args.reponame, args.tag, args.provider).then((value) => {


        }).catch(error=>{
          console.error(error);
        })
  }

}
