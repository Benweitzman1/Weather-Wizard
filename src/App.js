import React, { useState } from 'react';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import MainScreen from './containers/MainScreen';
import FavoritesScreen from './containers/FavoritesScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container  } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const favoriteCities = useSelector(state => state.favorites);

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#000',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: darkMode ? '#aaa' : '#000',  
          },
        },
      },
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          <SideBar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Container maxWidth="lg" style={{ display: 'flex', flexGrow: 1 }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
              <Routes>
                <Route path="/favorites"
                  element={
                    <FavoritesScreen
                      favoriteCities={favoriteCities}
                    />
                  }
                />
                <Route path="/"
                  element={
                    <MainScreen
                      setSnackbarOpen={setSnackbarOpen}
                      setSnackbarMessage={setSnackbarMessage}
                    />
                  }
                />
              </Routes>
            </div>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={closeSnackbar}
            >
              <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;