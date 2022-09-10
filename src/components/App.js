import React, { useState } from 'react';
import AppRouter from '../components/Router';
import { authService } from '../fbase';
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
