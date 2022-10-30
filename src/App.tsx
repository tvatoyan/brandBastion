import AppRouter from './components/Router'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore()

function App() {
  return (
    <div className="App">
       <Provider store={store}>
          <AppRouter />
       </Provider>
    </div>
  );
}

export default App;
