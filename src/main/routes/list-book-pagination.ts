import { adaptExpressRoute as adapt } from '@/main/adaṕters'
import { makeListBookPaginationController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/list/book/:page', adapt(makeListBookPaginationController()))
}
