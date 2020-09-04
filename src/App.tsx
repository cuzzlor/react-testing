import { Container, CssBaseline, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import React from 'react';
import { NameFormPage } from './features/personal-details/NameFormPage';

const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: { type: 'light' },
  })
);

function App() {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h2" align="center">
          Welcome
        </Typography>
        <NameFormPage />
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
