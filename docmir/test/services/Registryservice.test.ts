import {fancy} from 'fancy-test'
import {expect, assert} from 'chai'

import {Providers} from '../../src/models/types'
import {RegistryService} from '../../src/services/RegistryService'
import {ImageRepository} from '../../src/models/ImageRepository'
import {Repositories} from '../../src/models/Repositories'

const testImageRepos: ImageRepository[] = [
  new ImageRepository('happyPath', 'ecrArn', Providers.ecr),
  new ImageRepository('dockerProviderImage', 'ecrArn', Providers.docker),
]

const repos = new Repositories(testImageRepos)

describe('Registry Service', () => {
  fancy
  .it('Adding repo to repo model, save state and retrieve value', async () => {
    const registryService = new RegistryService()

    if (await registryService.addRepo(Providers.ecr, 'addRepo1', 'arn::ecr::name/asd')) {
      const expected = await registryService.findRepo('addRepo1')
      expect(expected.repoName).to.equal('addRepo1')
      expect(expected.server).to.equal('arn::ecr::name/asd')
      expect(expected.provider).to.equal(Providers.ecr)
    }

    registryService.resetService()
  })

  fancy
  .it('Find file added to a list', async () => {
    const registryService = new RegistryService(repos)

    if (await registryService.addRepo(Providers.ecr, 'addRepo2', 'arn::ecr::name/asd')  && await registryService.addRepo) {
      const expected = await registryService.findRepo('addRepo2')
      expect(expected.repoName).to.equal('addRepo2')
      expect(expected.server).to.equal('arn::ecr::name/asd')
      expect(expected.provider).to.equal(Providers.ecr)
    }

    registryService.resetService()
  })
})
