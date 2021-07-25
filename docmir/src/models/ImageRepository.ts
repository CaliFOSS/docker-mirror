
import {Providers, Tag} from './types'

export class ImageRepository {
  get repoCreated(): boolean {
    return this._repoCreated
  }

  set repoCreated(value: boolean) {
    this._repoCreated = value
  }

  get provider(): Providers {
    return this._provider
  }

  set provider(value: Providers) {
    this._provider = value
  }

  private _server = '';

  private _provider: Providers = Providers.ecr;

  private _repoName: string;

  private _repoCreated = false;

  // @ts-ignore
  private _managedTags: Tag [];

  constructor(imageRepoName: string, registryServer: string, registryProvider: Providers, created?: boolean) {
    this._repoName = imageRepoName
    this._server = registryServer
    this._provider = registryProvider
    this._repoCreated = created || false
  }

  public returnFakeRepo(): ImageRepository {
    return new ImageRepository('error', 'error', Providers.docker)
  }

  get server(): string {
    return this._server
  }

  set server(value: string) {
    this._server = value
  }

  get repoName(): string {
    return this._repoName
  }

  set repoName(value: string) {
    this._repoName = value
  }

  get managedTags(): Tag[] {
    return this._managedTags
  }

  set managedTags(value: Tag[]) {
    this._managedTags = value
  }

  public addTag(tag: Tag) {
    this._managedTags.push(tag)
  }
}

