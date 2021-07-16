import {ImageRepository} from './ImageRepository'
import * as fs from 'fs'
import {booleanType} from 'aws-sdk/clients/iam'

export class Repositories {
  // @ts-ignore
  private _imageRepositories: ImageRepository[] = [];

  private filePath = '.'

  private fileName = 'repo.json'

  private fileLocation: string = this.filePath + '/' + this.fileName

  // stateSave overwrites entire file every time.
  private saveState() {
    const stateJson = JSON.stringify(this._imageRepositories)
    fs.writeFileSync(this.fileLocation, stateJson)
  }

  private stateExists() {
    if (fs.existsSync(this.fileLocation)) {
      return true
    }
    return false
  }

  // Takes in a json file and stores the information needed.
  constructor(imageRepositories?: ImageRepository[]) {
    if (imageRepositories) {
      this._imageRepositories = imageRepositories
    }
  }

  public async loadState(fileLoc?: string): Promise<boolean> {
    try {
      if (fileLoc) {
        if (this.stateExists()) {
          const rawState = fs.readFileSync(fileLoc)
          // @ts-ignore
          this._imageRepositories = JSON.parse(rawState)
          return true
        }
      } else {
        const rawState = fs.readFileSync(this.fileLocation)
        // @ts-ignore
        this._imageRepositories = JSON.parse(rawState)
        return true
      }
      return false
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
      this._imageRepositories.push(imageRepository)
      this.saveState()
      return true
    } catch (error) {
      console.log(error, 'There is an issue with adding image repo')
      return false
    }
  }

  public getRepo(imageName: string): Promise<ImageRepository> {
    return new Promise((resolve, reject) => {
      this._imageRepositories.forEach(async imageRepo => {
        if (imageRepo.repoName === imageName) {
          return resolve(imageRepo)
        }
      })
      return reject('The image does not have an associated repository')
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
