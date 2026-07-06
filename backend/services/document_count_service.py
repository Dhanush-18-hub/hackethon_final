import os

SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".txt", ".csv", ".json", ".xml"}


def list_uploaded_documents(upload_folder: str) -> list[str]:
    if not os.path.isdir(upload_folder):
        return []

    documents = []
    for entry in sorted(os.listdir(upload_folder)):
        full_path = os.path.join(upload_folder, entry)
        if not os.path.isfile(full_path):
            continue

        if os.path.splitext(entry)[1].lower() in SUPPORTED_EXTENSIONS:
            documents.append(entry)

    return documents


def count_uploaded_documents(upload_folder: str) -> int:
    return len(list_uploaded_documents(upload_folder))
