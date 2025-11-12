import { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import QRCode from 'qrcode'
import DownloadIcon from '@mui/icons-material/Download'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import RefreshIcon from '@mui/icons-material/Refresh'

const QRGenerator = () => {
  const [url, setUrl] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [size, setSize] = useState(300)
  const [errorCorrection, setErrorCorrection] = useState('M')
  const [darkColor, setDarkColor] = useState('#000000')
  const [lightColor, setLightColor] = useState('#FFFFFF')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const validateUrl = (inputUrl) => {
    if (!inputUrl.trim()) {
      return false
    }
    try {
      new URL(inputUrl)
      return true
    } catch (e) {
      return false
    }
  }

  const generateQRCode = async () => {
    setError('')
    setSuccess('')

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    try {
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: size,
        margin: 2,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      })
      setQrCode(qrDataUrl)
      setSuccess('QR Code generated successfully')
    } catch (err) {
      setError('Failed to generate QR Code. Please try again.')
      console.error(err)
    }
  }

  const downloadQRCode = () => {
    if (!qrCode) return

    const link = document.createElement('a')
    link.href = qrCode
    link.download = `qrcode-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setSuccess('QR Code downloaded successfully')
  }

  const copyToClipboard = async () => {
    if (!qrCode) return

    try {
      const blob = await fetch(qrCode).then(res => res.blob())
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setSuccess('QR Code copied to clipboard')
    } catch (err) {
      setError('Failed to copy to clipboard')
      console.error(err)
    }
  }

  const resetForm = () => {
    setUrl('')
    setQrCode('')
    setError('')
    setSuccess('')
    setSize(300)
    setErrorCorrection('M')
    setDarkColor('#000000')
    setLightColor('#FFFFFF')
  }

  useEffect(() => {
    if (qrCode && url) {
      generateQRCode()
    }
  }, [size, errorCorrection, darkColor, lightColor])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            QR Code Generator
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 300,
            }}
          >
            Create professional QR codes from URLs instantly
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}
                >
                  Configuration
                </Typography>

                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    label="URL"
                    variant="outlined"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    sx={{ mb: 3 }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        generateQRCode()
                      }
                    }}
                  />

                  <Typography gutterBottom sx={{ color: 'text.secondary' }}>
                    Size: {size}px
                  </Typography>
                  <Slider
                    value={size}
                    onChange={(e, newValue) => setSize(newValue)}
                    min={200}
                    max={800}
                    step={50}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ mb: 3 }}
                  />

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Error Correction Level</InputLabel>
                    <Select
                      value={errorCorrection}
                      label="Error Correction Level"
                      onChange={(e) => setErrorCorrection(e.target.value)}
                    >
                      <MenuItem value="L">Low (7%)</MenuItem>
                      <MenuItem value="M">Medium (15%)</MenuItem>
                      <MenuItem value="Q">Quartile (25%)</MenuItem>
                      <MenuItem value="H">High (30%)</MenuItem>
                    </Select>
                  </FormControl>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                      <Box>
                        <Typography gutterBottom sx={{ color: 'text.secondary' }}>
                          Dark Color
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <input
                            type="color"
                            value={darkColor}
                            onChange={(e) => setDarkColor(e.target.value)}
                            style={{
                              width: '100%',
                              height: '56px',
                              border: '1px solid #ddd',
                              borderRadius: '12px',
                              cursor: 'pointer',
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography gutterBottom sx={{ color: 'text.secondary' }}>
                          Light Color
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <input
                            type="color"
                            value={lightColor}
                            onChange={(e) => setLightColor(e.target.value)}
                            style={{
                              width: '100%',
                              height: '56px',
                              border: '1px solid #ddd',
                              borderRadius: '12px',
                              cursor: 'pointer',
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      onClick={generateQRCode}
                      disabled={!url}
                      sx={{ flex: 1, minWidth: '120px' }}
                    >
                      Generate QR Code
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={resetForm}
                      startIcon={<RefreshIcon />}
                      sx={{ flex: 1, minWidth: '120px' }}
                    >
                      Reset
                    </Button>
                  </Box>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mt: 3 }} onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ mt: 3 }} onClose={() => setSuccess('')}>
                    {success}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}
                >
                  Preview
                </Typography>

                {qrCode ? (
                  <Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        backgroundColor: 'grey.50',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px',
                        mb: 3,
                      }}
                    >
                      <img
                        src={qrCode}
                        alt="QR Code"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          display: 'block',
                        }}
                      />
                    </Paper>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Tooltip title="Download QR Code">
                        <Button
                          variant="contained"
                          startIcon={<DownloadIcon />}
                          onClick={downloadQRCode}
                          sx={{ flex: 1, minWidth: '120px' }}
                        >
                          Download
                        </Button>
                      </Tooltip>
                      <Tooltip title="Copy to Clipboard">
                        <Button
                          variant="outlined"
                          startIcon={<ContentCopyIcon />}
                          onClick={copyToClipboard}
                          sx={{ flex: 1, minWidth: '120px' }}
                        >
                          Copy
                        </Button>
                      </Tooltip>
                    </Box>
                  </Box>
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      backgroundColor: 'grey.50',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '400px',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 11V3H11V11H3ZM3 21V13H11V21H3ZM13 11V3H21V11H13ZM13 21V13H21V21H13Z"
                        fill="#E0E0E0"
                      />
                    </svg>
                    <Typography variant="body1" color="text.secondary" align="center">
                      Enter a URL and click Generate to create your QR code
                    </Typography>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Professional QR Code Generator
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Created with Material Design 3
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default QRGenerator
