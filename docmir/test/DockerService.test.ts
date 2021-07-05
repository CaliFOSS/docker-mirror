import {fancy} from 'fancy-test'
import {expect} from 'chai'
import {DockerService} from "../src/services/DockerService";
import {Docker, dockerCommand} from "docker-cli-js";
import {ImportMock} from "ts-mock-imports";

let docker = new Docker();

var manager = ImportMock.mockClass(docker);

manager.mock('command()', 'Login Succeeded');



const dockerService = new DockerService(manager);


describe('Docker Login', () => {
  fancy
    .stub(dockerCommand, 'login', () => 'Login Succeeded'  )
    .do( expect(dockerService.dockerLogin()).to.equal('Login Succeeded'))
    .it('Logged in', () => {})
})
