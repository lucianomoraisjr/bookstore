import { adaptExpressRoute as adapt } from '@/main/adaṕters'
import { makeSerchBookController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/serch/:name', adapt(makeSerchBookController()))
}
