import { Request, Response, NextFunction } from 'express'
import { controller, get, post, bodyValidator } from './decorators'
import { RequestWithBody } from '../@types/RequestBody'

// NOTE: This class would never actually be executed it will just act like a container for middleware functions 
@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response, next: NextFunction): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" type="email"/>
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password"/>
        </div>
        <button>Submit</button>
      </form>
    `)
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response){
    const { email, password } = req.body

    if (email && password) {
      req.session = { loggedIn: true }
      res.redirect('/')
    } else {
      res.send('Invalid email or password')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined
    res.redirect('/')
  }
}