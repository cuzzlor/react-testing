import { Container, CssBaseline, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { NameFormPage } from './features/personal-details/NameFormPage';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: { type: 'light' },
  })
);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <RecoilRoot>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography variant="h2" align="center">
            Welcome
          </Typography>
          <NameFormPage />
        </Container>
      </RecoilRoot>
    </MuiThemeProvider>
  );
}

export default App;
