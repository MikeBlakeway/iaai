from fastapi import APIRouter, File, Form, UploadFile
from fastapi.responses import FileResponse
from pathlib import Path
import uuid
from app.core import generate_animation

router = APIRouter()

@router.post('/generate')
async def generate_avatar_video(
  image: UploadFile = File(...),
  action: str = Form(...)
):
  temp_id = uuid.uuid4().hex
  input_path = Path(f'/tmp/input_{temp_id}.jpg')
  output_path = Path(f'/tmp/output_{temp_id}.mp4')

  print(f'Action: {action}')
  print(f'Input saved to: {input_path}')
  print(f'Output will be saved to: {output_path}')

  with open(input_path, 'wb') as f:
    f.write(await image.read())

  generate_animation(input_path, action, output_path)

  return FileResponse(output_path, media_type='video/mp4')
