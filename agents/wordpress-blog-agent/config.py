import os
from dataclasses import dataclass


@dataclass
class Config:
    # WordPress
    wp_base_url: str = "https://founderz.com/es"
    wp_jwt_token: str = ""
    wp_author_id: int = 19

    # NeuronWriter
    neuronwriter_api_key: str = "n-7adb835c81a874416c2036ca33bbf889"
    neuronwriter_project_id: str = "64c70e6d66b9ed1b"
    neuronwriter_base_url: str = "https://app.neuronwriter.com/uapi/0.1"

    # ClickUp
    clickup_api_token: str = ""
    clickup_list_id: str = "901524149794"  # TEST BLOG IA

    # ClickUp statuses (adjust to match your workspace)
    status_pending: str = "to do"
    status_writing: str = "in progress"
    status_review: str = "review"
    status_published: str = "complete"


def load_config() -> Config:
    return Config(
        wp_jwt_token=os.environ.get("WP_JWT_TOKEN", ""),
        neuronwriter_api_key=os.environ.get("NEURONWRITER_API_KEY", "n-7adb835c81a874416c2036ca33bbf889"),
        neuronwriter_project_id=os.environ.get("NEURONWRITER_PROJECT_ID", "64c70e6d66b9ed1b"),
        clickup_api_token=os.environ.get("CLICKUP_API_TOKEN", ""),
        clickup_list_id=os.environ.get("CLICKUP_LIST_ID", "901524149794"),
    )
