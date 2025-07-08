import os
import shutil

def create_video_stub(path: str, label: str = 'default'):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    demo_video = os.path.join(base_dir, '..', 'assets', 'sample.mp4')

    if not os.path.exists(demo_video):
        raise FileNotFoundError(f'Demo video not found at {demo_video}')

    shutil.copyfile(demo_video, path)
