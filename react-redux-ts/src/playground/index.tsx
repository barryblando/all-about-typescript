import React from 'react'
import ReactDOM from 'react-dom'

interface AppProps {
  color: string
}

interface AppState {
  counter: number
}

class App extends React.Component<AppProps, AppState> {
  // NOTE: In TypeScript initializing state object is different than in JavaScript
  state = { counter: 0 } // this property initialization of state object will override super class Component readonly state
  // PS. You still need AppState for setState updater function
  // where constructor method needs a Object (AppState) type defined otherwise TS will throw error in setState that counter doesn't exist 
  // constructor(props: AppProps) {
  //   super(props)
  //   this.state = { counter: 0 }
  // }

  onIncrement = (): void => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }))
  }

  onDecrement = (): void => {
    this.setState(prevState => ({ counter: prevState.counter - 1 }))  
  }
  
  render() {
    return (
      <div>
        <button onClick={this.onIncrement}>Increment</button>
        <button onClick={this.onDecrement}>Decrement</button>
        {this.state.counter}
      </div>
    )
  }
}

// Functional Component
// const AppFunc = (props: AppProps): JSX.Element => {
//   return (
//     <div></div>
//   )
// }

ReactDOM.render(<App color="red"/>, document.querySelector('#root'))