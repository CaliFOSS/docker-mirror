import {Repositories} from '../models/Repositories'
import {ImageRepository} from '../models/ImageRepository'
import {Providers} from '../models/types'
import {EcrService} from './EcrService'

export class RegistryService {
  private repositories = new Repositories();

  private ecrService = new EcrService();

  // repositories are used for testing
  constructor(repositories?: Repositories) {
    if (repositories) {
      this.repositories = repositories
    } else {
      this.repositories.loadState().then(value => {
        if (value === true) {
          console.debug(JSON.stringify(this.repositories))
        } else {
          console.error('Data was not loaded')
        }
      })
    }
  }

  public resetService() {
    this.repositories.deleteState()
  }

  public async addRepo(provider: Providers, imageName: string, server: string, tag?: string): Promise<boolean> {
    const tempImageRepository = new ImageRepository(imageName, server, provider)

    return (this.repositories.addRepo(tempImageRepository))
  }

  public findRepo(imageName: string): Promise<ImageRepository> {
    return new Promise((resolve, reject) => {
      this.repositories.getRepo(imageName).then(repo => {
        if (repo.repoName === imageName) {
          return resolve(repo)
        }
      }).catch(error => {
        return reject(error)
      })
    })
  }
}
