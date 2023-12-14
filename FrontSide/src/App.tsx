import './App.css';
import useRoutes from './hooks/useRoutes';

function App() {

  const isAuth = true

  const routes = useRoutes({ isAuth })

  return (
    <main>
      {routes}
    </main>
  )
}

export default App
