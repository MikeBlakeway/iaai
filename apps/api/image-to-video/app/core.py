# apps/api/image-to-video/app/core.py

from diffusers import StableDiffusionPipeline
from animatediff.pipelines import AnimateDiffPipeline
from animatediff.models.motion_adapter import MotionAdapter
from PIL import Image
import torch
from pathlib import Path

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

SD_MODEL_PATH = Path("models/weights/stable-diffusion")
ADAPTER_PATH = Path("models/weights/animatediff")

def load_pipeline():
    print("🔧 Loading AnimateDiff pipeline...")

    adapter = MotionAdapter.from_pretrained(ADAPTER_PATH, torch_dtype=torch.float16)
    pipeline = AnimateDiffPipeline.from_pretrained(
        SD_MODEL_PATH,
        motion_adapter=adapter,
        torch_dtype=torch.float16,
        variant="fp16"
    )
    pipeline.enable_model_cpu_offload()
    pipeline.to(DEVICE)

    print("✅ AnimateDiff pipeline loaded.")
    return pipeline

def generate_animation(input_image_path: str, action: str, output_path: str):
    pipeline = load_pipeline()

    # Prepare prompt based on action
    prompt = f"a person {action}, cinematic lighting, ultra high resolution"
    negative_prompt = "blurry, distorted, cropped"

    # Load and convert the uploaded image
    init_image = Image.open(input_image_path).convert("RGB").resize((512, 512))

    # Generate animation (16 frames by default)
    animation = pipeline(
        prompt=prompt,
        negative_prompt=negative_prompt,
        image=init_image,
        num_frames=16,
        guidance_scale=7.5
    ).frames

    # Save as video (mp4)
    animation[0].save(
        output_path,
        save_all=True,
        append_images=animation[1:],
        duration=100,  # ms per frame
        loop=0,
        format="mp4"
    )

    print(f"🎬 Animation saved to {output_path}")
