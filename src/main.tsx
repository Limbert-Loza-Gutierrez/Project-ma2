import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { UsersContextProvider } from './context/UsersContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UsersContextProvider>
        <App />
      </UsersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)

