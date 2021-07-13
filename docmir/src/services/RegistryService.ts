import {Repositories} from '../models/Repositories'
import {ImageRepository} from '../models/ImageRepository'
import {Providers} from '../models/types'

export class RegistryService {
  private repositories = new Repositories();

  constructor(repositories?: Repositories) {
    if (repositories) {
      this.repositories = repositories
    }
  }

  public addRepo(provider: Providers, imageName: string, server: string, tag?: string) {
    const tempImageRepository = new ImageRepository(imageName, server, provider)
    this.repositories.addRepo(tempImageRepository)
  }
}
