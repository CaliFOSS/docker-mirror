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
    } else if (this.repositories.loadState()) {
      // console.debug(JSON.stringify(this.repositories.imageRepositories))
    } else {
      console.error('Data was not loaded')
    }
  }

  public resetService() {
    this.repositories.deleteState()
  }

  public async addRepo(provider: Providers, imageName: string, server: string, repoCreated?: boolean): Promise<boolean> {
    const tempImageRepository = new ImageRepository(imageName, server, provider)
    if (repoCreated) {
      tempImageRepository.repoCreated = true
    }
    return (this.repositories.addRepo(tempImageRepository))
  }

  public findRepo(imageName: string): Promise<ImageRepository> {
    return new Promise((resolve, reject) => {
      this.repositories.getRepo(imageName).then(async repo => {
        if (repo.repoName === imageName) {
          // console.log(repo.repoName, ' ', imageName)
          return resolve(repo)
        }
        return resolve(new ImageRepository('NotFound', 'NotFound', Providers.docker))
      }).catch(error => {
        return reject(error)
      })
    })
  }
}
