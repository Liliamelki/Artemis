
from pathlib import Path
from training_tracker.models import Training
from training_tracker.services import (
    load_trainings,
    save_trainings,
    calculate_total_duration,
    calculate_total_distance
)

def main():
    # 1. Définir où sont stockées les données
    file_path = Path("trainings.json")

    # 2. Charger les entraînements existants
    trainings = load_trainings(file_path)

    # 3. Afficher les statistiques
    print(f"Nombre d'entraînements : {len(trainings)}")
    print(f"Durée totale : {calculate_total_duration(trainings)} minutes")
    print(f"Distance totale : {calculate_total_distance(trainings)} km")

    # 4. Ajouter un nouvel entraînement
    new_training = Training(
        activity="Volleyball",
        duration=60,
        distance=None
    )
    trainings.append(new_training)

    # 5. Sauvegarder les modifications
    save_trainings(trainings, file_path)


if __name__ == "__main__":
    main()
