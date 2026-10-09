"""Download this project's raw data into data/.

Set DATASET to the Kaggle identifier (owner/dataset-name), or replace the
body of main() if the data come from another source.
"""
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATASET = ""  # for example: "mlg-ulb/creditcardfraud"


def main() -> None:
    if not DATASET:
        raise SystemExit("Set DATASET in scripts/download_data.py first.")
    from kaggle.api.kaggle_api_extended import KaggleApi

    DATA_DIR.mkdir(exist_ok=True)
    api = KaggleApi()
    api.authenticate()
    api.dataset_download_files(DATASET, path=str(DATA_DIR), unzip=True)
    print(f"Dataset downloaded to {DATA_DIR}")


if __name__ == "__main__":
    main()
