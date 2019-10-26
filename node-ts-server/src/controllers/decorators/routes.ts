import { HTTPMethods } from './HTTPMethods'
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler } from 'express'

interface RouteHandlerDescriptor extends PropertyDescriptor { 
  // When extend a base interface and if you want to override some of its properties you have to mark it as optional
  value?: RequestHandler
}

// Route Binder
function routeBinder(method: string) {
  return function(path: string) {
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key)
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key)
    }
  }
}

export const get = routeBinder(HTTPMethods.GET)
export const put = routeBinder(HTTPMethods.PUT)
export const post = routeBinder(HTTPMethods.POST)
export const del = routeBinder(HTTPMethods.DELETE)
export const patch = routeBinder(HTTPMethods.PATCH)