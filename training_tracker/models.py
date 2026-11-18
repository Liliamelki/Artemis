from dataclasses import dataclass


@dataclass
class Training:
    activity: str
    duration: int
    distance: float | None
    calories: int | None = None