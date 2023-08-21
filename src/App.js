import React, { useState } from 'react';
import Header from './components/Header/Header';
import MainScreen from './containers/MainScreen';
import FavoritesScreen from './containers/FavoritesScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container  } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
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
        <Container>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
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
      </Router>
    </ThemeProvider>
  );
}

export default App;