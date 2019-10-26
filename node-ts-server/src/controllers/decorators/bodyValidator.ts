import { MetadataKeys } from './MetadataKeys'

// INFO: This will be a factory decorator to list strings (email, pass, confirmation) to check for inside the request body
export function bodyValidator(...keys: string[]) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.VALIDATOR, keys, target, key)
  }
} 