import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Comments from './pages/Comments'

export default () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={path} exact component={Comments} />
    </Switch>
  )
}