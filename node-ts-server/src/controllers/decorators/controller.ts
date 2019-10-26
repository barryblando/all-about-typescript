import { AppRouter } from '../../AppRouter'
import { HTTPMethods } from './HTTPMethods'
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler, Request, Response, NextFunction } from 'express'

function bodyValidators(keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    // TODO: Check if there's request body
    // TODO: Check if keys exist then proceed to next middleware otherwise send error response

    if (!req.body) {
      res.status(422).send('Invalid Request')
      return
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`)
        return
      }
    }

    next()
  }
}

export function controller(routerPrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance()
    // TODO: Loop through all methods in class where decorator exist and add route handler association
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key]
      const path = Reflect.getMetadata(MetadataKeys.PATH, target.prototype, key)
      // TODO: Applied HTTP Methods enum so Router definition know what method will be injected in router computed property
      const method: HTTPMethods = Reflect.getMetadata(MetadataKeys.METHOD, target.prototype, key)
      // TODO: Pull off the middlewares if there's one
      const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) || []
      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) || []

      const validator = bodyValidators(requiredBodyProps)

      // TODO: if path found then add route handler and middleware association
      if (path) {
        router[method](`${routerPrefix}${path}`, ...middlewares, validator, routeHandler)
      }
    }
  }
}