import {Command, flags} from '@oclif/command'

export default class Registry extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    docker: flags.string({char: 'd', description: 'flags the image pull from docker'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'action'}]

  async run() {
    const {args, flags} = this.parse(Registry)


  }
}
