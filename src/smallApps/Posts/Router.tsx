import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Posts from './pages/Posts'

export default () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={path} exact component={Posts} />
    </Switch>
  )
}
