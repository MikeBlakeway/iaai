# apps/api/image-to-video/models/animatediff_runner.py

from pathlib import Path
from PIL import Image
import torch
from diffusers import AnimateDiffPipeline, MotionAdapter
from typing import Union

# Define paths to model folders (assumes you run download_models.py first or manually place them)
BASE_MODEL_PATH = Path("models/weights/stable-diffusion")
MOTION_MODEL_PATH = Path("models/weights/animatediff")

class AnimateDiffRunner:
    def __init__(self, device: str = "cuda" if torch.cuda.is_available() else "cpu"):
        self.device = device
        self.pipe = None
        self._load_pipeline()

    def _load_pipeline(self):
        print("Loading AnimateDiff pipeline...")

        adapter = MotionAdapter.from_pretrained(MOTION_MODEL_PATH)
        self.pipe = AnimateDiffPipeline.from_pretrained(
            BASE_MODEL_PATH,
            motion_adapter=adapter,
            torch_dtype=torch.float16 if self.device == "cuda" else torch.float32
        ).to(self.device)

        self.pipe.enable_model_cpu_offload() if self.device == "cuda" else None
        print("Pipeline loaded.")

    def generate(self, prompt: str, image_path: Union[str, Path], output_path: Union[str, Path], num_frames: int = 16):
        print(f"Generating animation for prompt: {prompt}")

        image = Image.open(image_path).convert("RGB").resize((512, 512))

        video_frames = self.pipe(
            prompt=prompt,
            num_frames=num_frames,
            image=image,
            guidance_scale=7.5
        ).frames

        # Save frames as a video
        from moviepy.editor import ImageSequenceClip
        clip = ImageSequenceClip([frame for frame in video_frames], fps=8)
        clip.write_videofile(str(output_path), codec="libx264")

        print(f"Saved video to: {output_path}")
