import { View } from  './View'
import { User, UserProps } from '../models/User'

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void }  {
    this.model.get('name')
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick
    }    
  }

  onSaveClick = (): void => {
    this.model.save()
  }

  onSetNameClick = (): void => {
    if (this.parent) {
      const input = this.parent.querySelector('input')
      
      if (input) {
        this.model.set({ name: input.value })
      }
    }
  }
  
  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }
  
  template(): string {
    return `
    <div>
      <input placeholder="${this.model.get('name')}" />
      <button class="set-name">Set Name</button>
      <button class="set-age">Set Random Age</button>
      <button class="save-model">Save User</button>
    </div>
    `
  }

}