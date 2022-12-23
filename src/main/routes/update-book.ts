import { adaptExpressRoute as adapt } from '@/main/adaṕters'
import { makeUpdateBookController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.put('/update/book', adapt(makeUpdateBookController()))
}
