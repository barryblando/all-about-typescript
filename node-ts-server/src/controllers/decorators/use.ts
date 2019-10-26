import { MetadataKeys } from './MetadataKeys'
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    // TODO: If getMetadata returns undefined, initialize empty array
    const middlewares = Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || []

    // TODO: Define middlewares
    Reflect.defineMetadata(MetadataKeys.MIDDLEWARE, [...middlewares, middleware], target, key)
  }
}