import React from 'react'
import { connect } from 'react-redux'
import { fetchTodos, deleteTodo } from '../store/actions'
import { StoreState } from '../store/reducers'
import { Todo } from '../store/reducers/todo'

interface AppProps {
  todos: Todo[]
  fetchTodos: Function
  deleteTodo: typeof deleteTodo
}

interface AppState {
  fetching: boolean
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = { fetching: false }
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false })
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos()
    this.setState({ fetching: true })
  }

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id)
  }

  renderList(): JSX.Element[] {
    return this.props.todos && this.props.todos.map((todo: Todo) => {
      return <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>{todo.title}</div>
    })
  }

  render() {
    const { fetching } = this.state
    return (
      <div>
        <button disabled={fetching} onClick={this.onButtonClick}>
          Fetch{fetching? 'ing' : ''}
        </button>
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => ({
  todos
})

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App)