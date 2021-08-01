import {DockerService} from '../services/DockerService'
import {EcrService} from '../services/EcrService'
import {Providers} from '../models/types'
import {RegistryService} from '../services/RegistryService'
import cli from 'cli-ux'
import {Prometheus} from 'aws-sdk/clients/kafka'

// noinspection SpellCheckingInspection
export class SyncController {
  private awsAccountId = process.env.AWS_ACCOUNT_ID || '';

  private awsAccessKeyID = process.env.AWS_ACCESS_KEY_ID || '';

  private awsSecreteAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';

  private dockerService = new DockerService();

  private ecrService: EcrService | undefined;

  private registryService = new RegistryService()

  constructor() {
    if (this.awsAccountId === '' || this.awsAccessKeyID === '' || this.awsSecreteAccessKey === '') {
      console.log('Warning:  AWS credentials are not set properly, working with ecr is not possible')
    } else {
      this.ecrService = new EcrService(this.awsAccountId, this.awsAccessKeyID, this.awsSecreteAccessKey)
    }
  }

  // private ecrService = new EcrService();
  // private imageRepository = new ImageRepository();

  public async dockerLogin(username: string, password: string, provider?: Providers, repoServer?: string): Promise<string> {
    switch (provider) {
    case Providers.ecr:
      console.log('call ecr login')
      break
    case Providers.docker:
      return (this.dockerService.dockerLogin(username, password))
      break
    default:
      return (this.dockerService.dockerLogin(username, password))
      break
    }
    return 'The provider was not found.  Please use another provider.'
  }

  public isLoggedIn(provider: Providers) {
    switch (provider) {
    case Providers.ecr:
      return this.ecrService?.credentialsValid()
      break
    case Providers.docker:
      return this.dockerService.dockerLogin()
      break
    default:
      return this.dockerService.dockerLogin()
      break
    }
  }

  public async searchTags(imageName: string, provider?: Providers): Promise<string[]> {
    return new Promise(async (response, reject)  =>  {
      let tags: string[] | undefined

      switch (provider) {
      case Providers.ecr:
        tags = await this.ecrService?.getTags(imageName)
        if (tags) {
          tags.forEach(value => {
            console.log(value)
          })
          return response(tags)
        }
        break
      case Providers.docker:
        tags = await this.dockerService.getAllTags(imageName)
        if (tags) {
          tags.forEach(value => {
            console.log(value)
          })
          return response(tags)
        }
        break
      default:
        tags = await this.dockerService.getAllTags(imageName)
        if (tags) {
          tags.forEach(value => {
            console.log(value)
          })
          return response(tags)
        }
        break
      }
      return reject('no tags found')
    })
  }

  public async diffTags(imageName: string, provider: Providers) {
    let unsyncedTags: string[] = []
    const dockerTags = await this.searchTags(imageName)
    const providerTags = await this.searchTags(imageName, provider)

    if (providerTags.length > 0) {
      for (const tag of dockerTags) {
        let tagFound = false
        for (const pTag of providerTags) {
          if (pTag === tag) {
            console.log('Tag ' + tag + ' was found in destination repo')
            tagFound = true
            break
          }
        }
        console.log('Tagfound: ' + tagFound)
        if (!tagFound) {
          unsyncedTags.push(tag)
          tagFound = false
        }
      }
    } else {
      unsyncedTags = dockerTags
    }

    if (unsyncedTags.length > 0) {
      for (const tag of unsyncedTags) {
        const index = unsyncedTags.indexOf(tag)
        const response = await this.addRepoSync(imageName, tag, provider).catch(error => {
          console.error(error)
        })
        console.log('Tag: ' + tag)
        console.log('Response: ' + response)
      }
    } else {
      console.log('No tags to sync')
    }
  }

  public async pullImageFromDocker(imageName: string, imageTag?: string): Promise<string> {
    if (await this.dockerService.pullImage(imageName, imageTag)) {
      return 'Image is now local'
    }
    return 'Image pull failed'
  }

  public async pushImage(provider: Providers, imageName: string, repoURL: string, tag: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      switch (provider) {
      case Providers.ecr:
          // TODO: check if repo exists
          // TODO: validate dockerhub login
          // TODO: Add repo to state and save
          this.ecrService?.getCreds().then(creds => {
            this.dockerService.dockerLoginRepo(repoURL, creds?.userName, creds?.password).then(response => {
              this.dockerService.pushImage(repoURL, imageName, tag).then(value => {
                if (value === true) return resolve(true)
                return resolve(false)
              }).catch(error => {
                console.error(error)
              })
            }, error => {
              console.log(error)
              return resolve(false)
            })
          }, error => {
            console.log(error)
            return resolve(false)
          })
          //

        break
      case Providers.docker:
        break
      default:
        console.log('No provider found... please try again')
        return resolve(false)
        break
      }
    })
  }

  public async createRepository(provider: Providers, repoName: string, tag?: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      // console.log(provider)
      switch (provider) {
      case Providers.ecr:
        if (await this.ecrService?.repoExists(repoName)) {
          const arn = await this.ecrService?.getServerURI(repoName)
          console.log('Repository already exists at ' + arn)
          return resolve(arn)
        }
          this.ecrService?.createRepoReturnUrl(repoName).then(arn => {
            console.log('Repository Created at ' + arn)
            return resolve(arn)
          }).catch(error => {
            return reject(error)
          })

        break
      case Providers.docker:
        return reject("We don't support docker registry currently")
        break
      default:
        return reject("No repo was created because there wasn't a properly defined provider")
        break
      }
    })
  }

  // adds a repo to sync
  // creates the registry repo (currently only ecr
  // authenticates, then pulls and pushes image
  public async addRepoSync(image: string, tag: string, provider: Providers): Promise<string> {
    return new Promise((resolve, reject) => {
      let arn = ''

      this.registryService.findRepo(image).then(async imageRepo => {
        const name = imageRepo.repoName
        // console.log(name, ' ', image)
        // TODO: handle state better
        /* if (name === image) {
          console.log('Registry is already in State with url ' + imageRepo.server)
          const cont = await cli.prompt('Do you want to continue? {y/n}')
          if (cont !== 'y') {
            process.nextTick(function () {
              process.exit(0)
            })
          }
        } */
        await this.createRepository(provider, image).then(async response => {
          arn = response
          await this.registryService.addRepo(provider, image, arn, true).then(async value => {
            await this.pullImageFromDocker(image, tag).then(async value => {
              await this.pushImage(provider, image, arn, tag).then(response => {
                if (response) {
                  return resolve('Repository created and image synced')
                }
              }).catch(error => {
                console.log(error)
                return reject(error)
              })
            }).catch(error => {
              console.error('Could not pull image.  Repo added to sync state\nNext auto sync will try again')
              console.log(error)
              return reject(error)
            })
          }).catch(error => {
            console.error('Stopping the sync.  Repo was created but not saved to state\n', error)
            return reject(error)
          })
        }).catch(error => {
          console.error('Stopping adding sync\nThe repository was not created\n', error)
          return reject(error)
        })
      }).catch(error => {
        console.error(error)
        return reject(error)
      })
    })
  }
}
