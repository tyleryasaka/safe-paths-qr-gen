# safe-paths-qr-gen
Web page which encodes location coordinates as a QR code for the COVID SafePaths app

Demo: https://safepaths-qr-6b479.web.app/

## Development

### Setup:

- `npm install`
- `cp .env.example .env`
- Edit this `.env` file with your own [google api key](https://developers.google.com/maps/documentation). You will need to enable the `Maps Javascript API` and `Places API` in the Google Cloud Platform console for your project.

### Run locally
- `npm start`

### Build and deploy to firebase
- `npm run build`
- `npm run deploy`
