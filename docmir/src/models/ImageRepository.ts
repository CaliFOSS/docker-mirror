import {Docker, Options} from 'docker-cli-js';

import axios from 'axios';

// @ts-ignore
import TagState = ImageRepository.TagState;
import {RegistryProvider} from "../services/RegistryProvider";
import {Providers, Tag} from "./types";

export class ImageRepository {

  private _registryServer: string = "";
  private registryProvider: Providers = Providers.ecr;
  private _imageRepoName: string;
  private _managedTags: Tag [];

  constructor(imageRepoName: string, registryServer?: string, registryProvider?: Providers) {

    this._imageRepoName = imageRepoName;
    if (registryServer) {
      this._registryServer = registryServer;
    }

    if (registryProvider) {
      this.registryProvider = registryProvider;
    }
  }


  get registryServer(): string {
    return this._registryServer;
  }

  set registryServer(value: string) {
    this._registryServer = value;
  }


  get imageRepoName(): string {
    return this._imageRepoName;
  }

  set imageRepoName(value: string) {
    this._imageRepoName = value;
  }


  get managedTags(): Tag[] {
    return this._managedTags;
  }

  set managedTags(value: Tag[]) {
    this._managedTags = value;
  }

  public addTag(tag: Tag) {
    this._managedTags.push(tag);
  }

}

