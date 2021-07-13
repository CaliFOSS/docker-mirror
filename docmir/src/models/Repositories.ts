import {ImageRepository} from './ImageRepository'

export class Repositories {
  // @ts-ignore
  private _imageRepositories: ImageRepository[] = [];

  // Takes in a json file and stores the information needed.
  constructor(imageRepositories?: ImageRepository[]) {
    if (imageRepositories) {
      this._imageRepositories = imageRepositories
    }
  }

  public addRepo(imageRepository: ImageRepository): boolean {
    try {
      this._imageRepositories.push(imageRepository)
      return true
    } catch (error) {
      console.log(error, 'There is an issue with adding image repo')
      return false
    }
  }

  public deleteRepo(imageRepository: ImageRepository) {
    const imageRepos = this._imageRepositories

    imageRepos.forEach((imageRepo, index) => {
      // @ts-ignore
      if (imageRepo.repoName === imageRepository) {
        console.log('Removing registry: ', imageRepository.repoName)
        delete this._imageRepositories[index]
      }
    })
  }

  get imageRepositories(): ImageRepository[] {
    return this._imageRepositories
  }

  // @ts-ignore
  set imageRepositories(value: ImageRepository[]): ImageRepository {
    this._imageRepositories = value
  }
}
