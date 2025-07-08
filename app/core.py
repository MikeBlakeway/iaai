from pathlib import Path
from models.model_stub import create_video_stub

def generate_animation(input_path: Path, action: str, output_path: Path):
  # Replace with real model inference later
  create_video_stub(output_path, label=action)
