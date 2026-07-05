import os

TEXT_FOLDER = "uploads/text"

def get_company_context():

    context = ""

    if not os.path.exists(TEXT_FOLDER):
        return ""

    for filename in os.listdir(TEXT_FOLDER):

        filepath = os.path.join(
            TEXT_FOLDER,
            filename
        )

        try:
            with open(
                filepath,
                "r",
                encoding="utf-8"
            ) as f:

                context += f"--- START OF DOCUMENT: {filename} ---\n"
                context += f.read()
                context += f"\n--- END OF DOCUMENT: {filename} ---\n\n"

        except:
            pass

    return context[:1000000]