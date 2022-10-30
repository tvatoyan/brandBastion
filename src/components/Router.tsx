import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import PostsApp from '../smallApps/Posts'
import CommentsApp from '../smallApps/Comments'



export default () => {
  return (
      <BrowserRouter>
        <Switch>
            <Route path={'/comments/:id'} component={CommentsApp} />
            <Route path={'/posts'} component={PostsApp} />
            <Route path={'/'} render={() => <Redirect to="/posts" />} />
        </Switch>
      </BrowserRouter>
  )
}
