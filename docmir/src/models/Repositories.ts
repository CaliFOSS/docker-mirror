import {ImageRepository} from './ImageRepository'
import * as fs from 'fs'
import {Providers} from './types'

export class Repositories {
  // @ts-ignore
  private _imageRepositories: ImageRepository[] = [];

  private filePath = '.'

  private fileName = 'repo.json'

  private fileLocation: string = this.filePath + '/' + this.fileName

  // stateSave overwrites entire file every time.
  private saveState() {
    const stateJson = JSON.stringify(this._imageRepositories)
    //console.log(stateJson)
    fs.writeFileSync(this.fileLocation, stateJson)
  }

  // Takes in a json file and stores the information needed.
  constructor(imageRepositories?: ImageRepository[]) {
    if (imageRepositories) {
      this._imageRepositories = imageRepositories
    }
  }

  public loadState(fileLoc?: string): boolean {
    try {
      if (fileLoc) {
        this.fileLocation = fileLoc
      }

      if (fs.existsSync(this.fileLocation)) {
        const rawState = fs.readFileSync(this.fileLocation)
        let imageRepos = JSON.parse(rawState.toString())
        for (let i = 0; i < imageRepos.length; i++) {

          let temp = new ImageRepository(imageRepos[i]._repoName, imageRepos[i]._server, imageRepos[i]._provider, imageRepos[i]._repoCreated)
          this._imageRepositories.push(temp);
        }
        return true
      }
      const stateJson = JSON.stringify(this._imageRepositories)
      fs.writeFileSync(this.fileLocation, stateJson)
      return true
    } catch (error) {
      console.log(error, 'Issue with the load State')
      return false
    }
  }

  public deleteState(): boolean {
    try {
      fs.unlinkSync(this.fileLocation)
      console.log('State file deleted')
      return true
    } catch (error) {
      console.log(error)
    }
    return false
  }

  public async addRepo(imageRepository: ImageRepository): Promise<boolean> {
    try {
      const existingRepo = await this.getRepo(imageRepository.repoName)
      if (existingRepo.repoName === imageRepository.repoName) {
        return false
      }
      // this works
      this._imageRepositories.push(imageRepository)
      this.saveState()
      return true
    } catch (error) {
      console.log(error, '\nThere is an issue with adding image repo')
      return false
    }
  }

  public async getRepo(imageName: string): Promise<ImageRepository> {
    //console.log('We got this image name ',  imageName)
    //console.log(this._imageRepositories)
    return new Promise((resolve, reject) => {
      this._imageRepositories.forEach( async (imageRepo, index) => {
        //console.log(imageRepo.repoName, ' with index ' + index, imageName)
        if (imageRepo.repoName === imageName) {

          return resolve(imageRepo)
        }

      })
      return resolve(new ImageRepository('NotFound', 'NotFound', Providers.docker))
    })
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
