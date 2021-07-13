import {fancy} from 'fancy-test'
import {expect} from 'chai'
import {DockerService} from "../../src/services/DockerService";
import {Docker, dockerCommand} from "docker-cli-js";
import * as sinon from "sinon";

let docker = new Docker();
let spy = sinon.spy();
let dockerMock = sinon.mock(docker);

let dockerService = DockerService()

dockerMock.expects("command").once().throws();


describe('Docker Login', () => {
  fancy
    .do( expect(docker.dockerLogin()).to.equal('Login Succeeded'))
    .it('Logged in', () => {})
})
