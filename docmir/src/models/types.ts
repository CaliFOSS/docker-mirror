export interface DockerCreds {
  userName: string;
  password: string;
}

export interface Tag {
  tag: string;
  isSynced: boolean;
}

export enum Providers {
  ecr,
  docker
}




