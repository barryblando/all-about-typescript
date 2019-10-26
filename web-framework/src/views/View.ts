import { Model } from "../models/Model"

/**
 * Type T is going to have all the same properties as a model with Type K loaded into it
 * T - Type of Model (i.e User Instance), K - Set of Properties (i.e UserProps) that model is going to have
 */
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {}

  /**
   * @constructor
   * @param parent - root element
   * @param model - access to user model properties
   */
  constructor(public parent: Element, public model: T) {
    this.bindModel()
  }

  abstract template(): string

  regionsMap(): { [key: string]: string } {
    return {}
  }

  // #region this method will be overridden by child class, cause not all child class will implement it, so no need to make it abstract anymore
  eventsMap(): { [key : string]: () => void } {
    return {}
  }
  // #endregion
  
  bindModel(): void {    
    this.model.on('change', () => {
      this.render()
    })
  }

  /**
   * @function bindEvents
   * @param fragment - essentially a reference to all the html that we're trying to insert into the DOM
   */
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap()

    // iterate all events
    for (let eventKey in eventsMap) {
      // get the eventName and selector
      const [eventName, selector] = eventKey.split(':')
      
      // select all elements based on selector name and attach event listener
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap()

    for (let key in regionsMap) {
      const selector = regionsMap[key]
      const element = fragment.querySelector(selector)

      if (element) { 
        this.regions[key] = element
      }
    }
  }

  onRender(): void {}

  render(): void {
    // clear before rendering again
    this.parent.innerHTML = ''

    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()

    this.bindEvents(templateElement.content)
    this.mapRegions(templateElement.content)

    this.onRender()

    this.parent.append(templateElement.content)
  }
}