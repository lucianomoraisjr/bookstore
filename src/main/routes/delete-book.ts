import { adaptExpressRoute as adapt } from '@/main/adaṕters'
import { makeDeleteBookController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.delete('/delete/book', adapt(makeDeleteBookController()))
}
