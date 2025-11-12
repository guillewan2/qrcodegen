import { useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import QRGenerator from './components/QRGenerator'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6750A4',
      light: '#8B7EC8',
      dark: '#4F378B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#625B71',
      light: '#847D96',
      dark: '#4A4458',
      contrastText: '#FFFFFF',
    },
    surface: {
      main: '#FEF7FF',
      variant: '#E7E0EC',
    },
    background: {
      default: '#FEF7FF',
      paper: '#FFFFFF',
    },
    error: {
      main: '#B3261E',
      light: '#F2B8B5',
      dark: '#8C1D18',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 500,
          letterSpacing: '0.1px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QRGenerator />
    </ThemeProvider>
  )
}

export default App
