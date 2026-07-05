from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from services.gemini_service import ask_gemini
from services.pdf_service import extract_text
from services.rag_service import get_company_context

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
TEXT_FOLDER = "uploads/text"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TEXT_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return {"message": "AI Company Brain API Running"}


@app.route("/upload", methods=["POST"])
def upload():

    if "file" not in request.files:
        return jsonify({"error": "No file"}), 400

    file = request.files["file"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    print("Saved to:", os.path.abspath(filepath))

    text = ""

    if file.filename.lower().endswith(".pdf"):

        try:

            text = extract_text(filepath)

            print("\n========= PDF CONTENT =========\n")
            print(text[:1000])
            print("\n===============================\n")

            text_file_path = os.path.join(
                TEXT_FOLDER,
                file.filename + ".txt"
            )

            with open(
                text_file_path,
                "w",
                encoding="utf-8"
            ) as f:

                f.write(text)

            print(
                "Text saved to:",
                os.path.abspath(text_file_path)
            )

        except Exception as e:

            print("PDF Extraction Error:", str(e))

    return jsonify({
        "message": "Uploaded Successfully",
        "filename": file.filename,
        "characters_extracted": len(text)
    })


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    question = data.get("question")

    if not question:
        return jsonify({
            "error": "Question required"
        }), 400

    try:

        company_context = get_company_context()

        prompt = f"""
You are AI Company Brain.

Answer ONLY using the uploaded company documents.

If the answer is not present in the documents, say:

'I could not find this information in the uploaded company knowledge.'

COMPANY DOCUMENTS:

{company_context}

QUESTION:

{question}
"""

        answer = ask_gemini(prompt)

        return jsonify({
            "answer": answer,
            "sources": os.listdir(TEXT_FOLDER)
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )