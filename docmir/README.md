docmir
======

A docker hub mirror application

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/docmir.svg)](https://npmjs.org/package/docmir)
[![Downloads/week](https://img.shields.io/npm/dw/docmir.svg)](https://npmjs.org/package/docmir)
[![License](https://img.shields.io/npm/l/docmir.svg)](https://github.com/CaliFOSS/docker-mirror/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g docmir
$ docmir COMMAND
running command...
$ docmir (-v|--version|version)
docmir/0.0.0 darwin-x64 node-v16.2.0
$ docmir --help [COMMAND]
USAGE
  $ docmir COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`docmir auth [DOCKERHUB]`](#docmir-auth-dockerhub)
* [`docmir hello [FILE]`](#docmir-hello-file)
* [`docmir help [COMMAND]`](#docmir-help-command)
* [`docmir registry [FILE]`](#docmir-registry-file)
* [`docmir searchtags [FILE]`](#docmir-searchtags-file)

## `docmir auth [DOCKERHUB]`

Working with Authentication for Dockerhub and registry

```
USAGE
  $ docmir auth [DOCKERHUB]

OPTIONS
  -f, --force
  -h, --help                       show CLI help
  -p, --userPassword=userPassword  docker password
  -u, --userName=userName          docker username
```

_See code: [src/commands/auth.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.0.0/src/commands/auth.ts)_

## `docmir hello [FILE]`

describe the command here

```
USAGE
  $ docmir hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ docmir hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.0.0/src/commands/hello.ts)_

## `docmir help [COMMAND]`

display help for docmir

```
USAGE
  $ docmir help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `docmir registry [FILE]`

describe the command here

```
USAGE
  $ docmir registry [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/registry.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.0.0/src/commands/registry.ts)_

## `docmir searchtags [FILE]`

describe the command here

```
USAGE
  $ docmir searchtags [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/searchtags.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.0.0/src/commands/searchtags.ts)_
<!-- commandsstop -->
