import { adaptExpressRoute as adapt } from '@/main/adaṕters'
import { makeAddBookController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/add/book', adapt(makeAddBookController()))
}
