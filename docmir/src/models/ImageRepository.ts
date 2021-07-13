import {Docker, Options} from 'docker-cli-js';

import axios from 'axios';

// @ts-ignore
import TagState = ImageRepository.TagState;
import {RegistryProvider} from "../services/RegistryProvider";
import {Providers, Tag} from "./types";

export class ImageRepository {
  get provider(): Providers {
    return this._provider;
  }

  set provider(value: Providers) {
    this._provider = value;
  }

  private _server: string = "";
  private _provider: Providers = Providers.ecr;
  private _repoName: string;
  // @ts-ignore
  private _managedTags: Tag [];

  constructor(imageRepoName: string, registryServer: string, registryProvider: Providers) {

    this._repoName = imageRepoName;
    this._server = registryServer;
    this._provider = registryProvider;
  }


  get server(): string {
    return this._server;
  }

  set server(value: string) {
    this._server = value;
  }

  get repoName(): string {
    return this._repoName;
  }

  set repoName(value: string) {
    this._repoName = value;
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

