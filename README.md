# QR Code Generator

Professional QR Code Generator built with React and Material Design 3. Generate high-quality QR codes from URLs with customizable options.

## Features

- Modern Material Design 3 interface
- Fully responsive design (mobile, tablet, desktop)
- Customizable QR code options:
  - Adjustable size (200px - 800px)
  - Error correction levels (L, M, Q, H)
  - Custom colors (dark and light)
- Download QR codes as PNG
- Copy QR codes to clipboard
- Real-time preview
- URL validation
- Professional and clean design

## Technology Stack

- **React 18** - Frontend framework
- **Material-UI v5** - UI component library with Material Design 3
- **Vite** - Build tool and development server
- **QRCode** - QR code generation library
- **Docker** - Containerization
- **Nginx** - Production web server

## Prerequisites

- Node.js 20+ (for local development)
- Docker and Docker Compose (for containerized deployment)

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/guillewan2/qrcodegen.git
cd qrcodegen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Docker Deployment

1. Clone the repository:
```bash
git clone https://github.com/guillewan2/qrcodegen.git
cd qrcodegen
```

2. Build and run with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application at `http://localhost:32123`

The application is configured to only accept connections from localhost for security.

## Usage

1. Enter a valid URL in the input field (e.g., `https://example.com`)
2. Adjust the QR code settings:
   - **Size**: Drag the slider to set the desired size
   - **Error Correction**: Choose the level of redundancy
   - **Colors**: Click on color pickers to customize dark and light colors
3. Click "Generate QR Code" to create your QR code
4. Use the "Download" button to save the QR code as PNG
5. Use the "Copy" button to copy the QR code to clipboard
6. Click "Reset" to clear all fields and start over

## Error Correction Levels

- **Low (L)**: ~7% of codewords can be restored
- **Medium (M)**: ~15% of codewords can be restored
- **Quartile (Q)**: ~25% of codewords can be restored
- **High (H)**: ~30% of codewords can be restored

Higher error correction allows the QR code to be readable even if partially damaged or obscured.

## Docker Configuration

The application runs inside a Docker container with the following characteristics:

- **Port**: 32123 (bound to localhost only)
- **Base Image**: nginx:alpine (production)
- **Build**: Multi-stage Docker build for optimized size
- **Security**: Only accepts connections from localhost
- **Health Check**: Automatic health monitoring
- **Auto-restart**: Configured to restart unless stopped

## Building for Production

### Manual Build

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Docker Build

```bash
docker build -t qrcodegen .
docker run -d -p 127.0.0.1:32123:80 --name qrcodegen qrcodegen
```

## Project Structure

```
qrcodegen/
├── src/
│   ├── components/
│   │   └── QRGenerator.jsx    # Main QR generator component
│   ├── App.jsx                 # Root component with theme
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose configuration
├── nginx.conf                  # Nginx server configuration
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Environment Variables

No environment variables are required for basic operation. The application is fully configured through the UI.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Features

- Localhost-only access in Docker deployment
- Security headers configured in Nginx
- Input validation for URLs
- No external API calls (all processing client-side)
- No data storage or tracking

## License

MIT License

## Author

guillewan2

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

https://github.com/guillewan2/qrcodegen.git

## Support

For issues and questions, please use the GitHub Issues page.
