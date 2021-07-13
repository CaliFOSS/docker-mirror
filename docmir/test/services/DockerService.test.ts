import {fancy} from 'fancy-test'
import {expect} from 'chai'
import {DockerService} from '../../src/services/DockerService'
import {Docker, dockerCommand} from 'docker-cli-js'
import * as sinon from 'sinon'
import * as jest from 'jest'

const docker = new DockerService(true)

describe('Docker Login', () => {
  fancy
    .it('tests standard login', async () => {
      let value = await docker.dockerLogin();
      expect(value).to.equal('Login Succeeded');
    })
})
