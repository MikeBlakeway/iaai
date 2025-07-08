# Image-to-Video API (itv-api)

This FastAPI backend powers the Image-to-Video functionality of the Interactive AI Avatar Interface (IAAI) project.

## Features

* Accepts image uploads and predefined action labels
* Saves the uploaded image and generates a corresponding animation video
* Serves the generated video back to the client
* Easily swappable model backend (currently uses stubbed videos)

## Requirements

* Python 3.9+
* ffmpeg (for video conversion)

## Installation

```bash
git clone https://github.com/your-username/itv-api.git
cd itv-api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Running the API

```bash
make dev
```

This starts the FastAPI server with `uvicorn` on `http://localhost:8000`.

## API Endpoints

### `POST /generate`

Accepts a multipart form with:

* `image`: A photo of a person (jpg/png)
* `action`: One of the supported action labels (e.g. `blow_kiss`, `dance`)

Returns:

* JSON response with `video_url` pointing to the generated video file

## Project Structure

```bash
itv-api/
├── app/
│   ├── api.py            # Defines routes
│   ├── core.py           # Core logic for video generation
│   ├── main.py           # FastAPI app setup
│   └── models/
│       └── model_stub.py # Stubbed animation function
├── demo_assets/          # Demo videos used in stub mode
├── requirements.txt
└── Makefile              # Dev shortcuts
```

## Next Steps

* Replace stub implementation with real AnimateDiff pipeline
* Add support for audio input/output
* Store and retrieve videos using cloud storage (optional)

## Notes

* All generated files are stored in `/tmp`
* Do not commit real images or videos to the repo
* Video demos must be `.mp4` for web compatibility

## License

MIT
