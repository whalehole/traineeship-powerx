import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './lib/auth.state';
import './index.css';
import LoginPage from './pages/login-page';
import { BrowserRouter, Route } from 'react-router-dom';
import RegisterPage from './pages/register-page';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/home-page';
import MoviePage from './pages/movie-page';
import UserPanel from './components/login-register-bar';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Route path="/">
            <UserPanel />
          </Route>
          {/* pages */}
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movie/:movieId">
            <MoviePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById('root')
);

