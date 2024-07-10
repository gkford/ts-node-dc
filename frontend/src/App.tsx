import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import { AuthenticationGuard } from './components/authentication-guard';
import { PageLoader } from './components/page-loader';
import { LoginButton } from './components/buttons/login-button';
import { SignupButton } from './components/buttons/signup-button';
import { LogoutButton } from './components/buttons/logout-button';
import { ProfilePage } from './pages/profile-page';
import './App.css';

// Placeholder components for the routes
const HomePage: React.FC = () => <h1>Home Page</h1>;
const PublicPage: React.FC = () => <h1>Public Page</h1>;
const ProtectedPage: React.FC = () => <h1>Protected Page</h1>;
const AdminPage: React.FC = () => <h1>Admin Page</h1>;
const CallbackPage: React.FC = () => <h1>Callback Page</h1>;
const NotFoundPage: React.FC = () => <h1>404: Not Found</h1>;

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App</h1>
        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <>
            <LoginButton />
            <SignupButton />
          </>
        )}
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
        <Route path="/public" element={<PublicPage />} />
        <Route
          path="/protected"
          element={<AuthenticationGuard component={ProtectedPage} />}
        />
        <Route
          path="/admin"
          element={<AuthenticationGuard component={AdminPage} />}
        />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
