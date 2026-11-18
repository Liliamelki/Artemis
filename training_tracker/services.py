
import json
from pathlib import Path
from dataclasses import asdict
from training_tracker.models import Training

def calculate_total_duration(trainings: list[Training]) -> int:
    """
    Calculate the total duration of a list of Training objects.

    Args:
        trainings (list): A list of Training objects.

    Returns:
        int: The total duration in minutes.
    """
    return sum(training.duration for training in trainings)

def calculate_total_distance(trainings: list[Training]) -> float:
    """
    Calculate the total distance of a list of Training objects.

    Args:
        trainings (list): A list of Training objects.

    Returns:
        float: The total distance in kilometers.
    """
    return sum(training.distance for training in trainings if training.distance is not None)

def load_trainings(file_path: Path) -> list[Training]:
    """
    Load a list of Training objects from a JSON file.

    Args:
        file_path (Path): The path to the JSON file.
    """
    try:
        json_data = Path(file_path).read_text(encoding="utf-8")
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return []

    try:
        trainings_data = json.loads(json_data)
    except json.JSONDecodeError as error:
        raise ValueError(f"Invalid JSON in file {file_path}") from error

    return [Training(**data) for data in trainings_data]


def save_trainings(trainings: list[Training], file_path: Path) -> None:
    """
    Save a list of Training objects to a JSON file.

    Args:
        trainings: A list of Training objects.
        file_path: The path to the JSON file.
    """
    trainings_data = [asdict(training) for training in trainings]
    json_data = json.dumps(
        trainings_data,
        indent=4,
        ensure_ascii=False
    )
    file_path.write_text(json_data, encoding="utf-8")
