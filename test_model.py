from pathlib import Path
from training_tracker.models import Training
from training_tracker.services import save_trainings, load_trainings

trainings = [
    Training("Volleyball", 60, 5.2),
    Training("Gym", 90, None, 500),
    Training("Course", 45, 7.3, 350)
]

file_path = Path("test_trainings.json")

# Sauvegarder
save_trainings(trainings, file_path)

# Recharger
loaded_trainings = load_trainings(file_path)

# Vérifier
print(loaded_trainings)
print(trainings == loaded_trainings)