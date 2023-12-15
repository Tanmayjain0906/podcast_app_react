import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.jsx'
import LoginOrSingupProvider from './context/checking/LoginOrSingupProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <LoginOrSingupProvider>
          <App />
        </LoginOrSingupProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
