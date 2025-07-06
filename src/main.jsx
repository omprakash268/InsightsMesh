import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './redux/store/store.js';
import { Provider } from 'react-redux';
import { router } from './router.js';
import { RouterProvider } from 'react-router-dom';


const initialTheme = store.getState().theme;
document.documentElement.setAttribute('data-theme', initialTheme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>

)
