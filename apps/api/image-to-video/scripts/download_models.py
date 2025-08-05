# apps/api/image-to-video/scripts/download_models.py

from pathlib import Path
from huggingface_hub import snapshot_download

BASE_MODEL_ID = "stabilityai/stable-diffusion-2-1-base"
MOTION_ADAPTER_ID = "guoyww/animatediff-motion-adapter-v1-5-2"

def download_model(model_id: str, local_dir: Path):
    print(f"Downloading model '{model_id}' into '{local_dir}'")
    snapshot_download(repo_id=model_id, local_dir=local_dir, local_dir_use_symlinks=False)
    print(f"✅ Downloaded '{model_id}'")

def main():
    base_path = Path("models/weights")
    base_model_path = base_path / "stable-diffusion"
    motion_adapter_path = base_path / "animatediff"

    base_model_path.mkdir(parents=True, exist_ok=True)
    motion_adapter_path.mkdir(parents=True, exist_ok=True)

    download_model(BASE_MODEL_ID, base_model_path)
    download_model(MOTION_ADAPTER_ID, motion_adapter_path)

if __name__ == "__main__":
    main()
