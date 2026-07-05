from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from services.gemini_service import ask_gemini
from services.pdf_service import extract_text
from services.rag_service import get_company_context
import sqlite3

DATABASE = "brainvault.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute("""
    CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        title TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT,
        role TEXT,
        content TEXT,
        sources TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversation_id) REFERENCES conversations (id) ON DELETE CASCADE
    )
    """)
    conn.commit()
    conn.close()

init_db()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
TEXT_FOLDER = "uploads/text"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TEXT_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return {"message": "BrainVault API Running"}


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
    filename_lower = file.filename.lower()
    text_file_path = os.path.join(
        TEXT_FOLDER,
        file.filename + ".txt" if not filename_lower.endswith(".txt") else file.filename
    )

    try:
        if filename_lower.endswith(".pdf"):
            text = extract_text(filepath)
            with open(text_file_path, "w", encoding="utf-8") as f:
                f.write(text)
        elif filename_lower.endswith(".docx"):
            from services.docx_service import extract_docx_text
            text = extract_docx_text(filepath)
            with open(text_file_path, "w", encoding="utf-8") as f:
                f.write(text)
        elif filename_lower.endswith((".txt", ".csv", ".json", ".xml")):
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f_src:
                text = f_src.read()
            with open(text_file_path, "w", encoding="utf-8") as f_dest:
                f_dest.write(text)
        print(f"Extracted {len(text)} characters from {file.filename}.")
    except Exception as e:
        print("Extraction Error for", file.filename, ":", str(e))

    return jsonify({
        "message": "Uploaded Successfully",
        "filename": file.filename,
        "characters_extracted": len(text)
    })


@app.route("/chat", methods=["POST"])
def chat():
    import uuid
    import json
    
    data = request.get_json()
    question = data.get("question")
    conversation_id = data.get("conversation_id")

    if not question:
        return jsonify({
            "error": "Question required"
        }), 400

    try:
        company_context = get_company_context()

        if not company_context.strip():
            return jsonify({
                "answer": "No documents have been uploaded yet. Please upload files in the Documents section to populate the knowledge base.",
                "sources": []
            })

        conn = get_db_connection()
        
        # 1. Ensure conversation exists
        if not conversation_id:
            conversation_id = "conv-" + uuid.uuid4().hex[:8]
            title = question[:35] + "..." if len(question) > 35 else question
            conn.execute("INSERT INTO conversations (id, title) VALUES (?, ?)", (conversation_id, title))
            conn.commit()

        # 2. Retrieve history context
        rows = conn.execute("SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC", (conversation_id,)).fetchall()
        history_str = ""
        for row in rows:
            role_label = "User" if row["role"] == "user" else "AI"
            history_str += f"{role_label}: {row['content']}\n"

        prompt = f"""
# SYSTEM PROMPT — Enterprise Knowledge AI (High-Precision RAG Assistant)

You are BrainVault, an advanced Enterprise AI Knowledge Assistant.

Your primary objective is to answer user questions by reasoning over uploaded documents with extremely high precision, factual accuracy, and minimal hallucination.

Your highest priority is **truthfulness over completeness.**

---

## CONVERSATIONAL RULES (SMALL TALK / GREETINGS):
- If the user's input is a greeting, introduction, politeness, or general friendly small talk (e.g., "hello", "hi", "how are you", "who are you", "thank you", "thanks"), respond in a warm, helpful, and conversational tone as BrainVault. Remind them that you can answer questions based on their uploaded company documents. Do NOT search the company documents or check for fallbacks for these inputs, and set CITED_DOCUMENTS: [].
- If the user is asking a fact-based question or querying corporate/knowledge details, follow the rules below.

---

## CORE OBJECTIVE
You can access one or more uploaded documents.
Your responsibility is to understand all uploaded information as a unified knowledge base.

---

# KNOWLEDGE PRIORITY
When answering a question, use the following hierarchy:
Priority 1: Uploaded documents
Priority 2: Cross-document reasoning
Priority 3: Reliable general world knowledge
Priority 4: Logical reasoning
Never reverse this priority.

---

# DOCUMENT UNDERSTANDING
Do not treat documents independently. Instead:
* understand relationships
* merge duplicate information
* identify contradictions
* connect entities
* infer references
Resolution of abbreviations, and concepts linking across files.
Treat all uploaded files as one connected knowledge graph.

---

# RETRIEVAL STRATEGY
Before answering:
1. Understand the question.
2. Determine the intent.
3. Search ALL uploaded documents.
4. Retrieve every relevant section.
5. Rank evidence by relevance.
6. Compare evidence.
7. Resolve contradictions.
8. Generate the answer ONLY from verified evidence.
9. Cite the supporting document(s).
10. Check for unsupported claims before responding.

---

# MULTI-HOP REASONING
Perform multi-hop reasoning whenever necessary by combining evidence from multiple documents before answering.

---

# HALLUCINATION PREVENTION
Never invent facts, numbers, dates, people, emails, phone numbers, project names, citations, sources, or relationships.
If evidence is missing, explicitly state:
"I could not find information related to this question in the uploaded documents."
Do not guess. Never fabricate.

---

# CONFIDENCE CHECK
Internally estimate confidence. If confidence is low:
Search again. Retrieve more evidence.
If still uncertain, say:
"The uploaded documents do not contain enough evidence to answer confidently."

---

# USE GENERAL KNOWLEDGE CAREFULLY
General knowledge must NEVER override uploaded documents.
If a document contradicts general knowledge:
Clearly state: "The uploaded document states X, although this differs from common external knowledge."
Do not silently replace document content.

---

# ANSWERING STYLE
Always answer in this order:
1. Direct answer
2. Supporting evidence
3. Reasoning (if needed)
4. Citations
5. Confidence level

Example:
Answer:
Employees are eligible after completing six months of service.
Evidence:
The HR Policy specifies eligibility after six months of continuous employment.
Citation:
HR Policy.pdf
Page 18
Confidence:
Very High

---

# CONTRADICTION HANDLING
If two documents disagree, report both. Do not choose arbitrarily.

---

# NUMERICAL ACCURACY
Double-check percentages, currency, financial values, dates, calculations, measurements, IDs, and versions. Never estimate numerical values.

---

# OUTPUT FORMAT:
- You MUST append a line at the very end of your response in this exact format:
  `CITED_DOCUMENTS: [file1.pdf, file2.docx]`
- Use the actual original filenames as they appear in the headers. If no documents were used to answer (e.g. for small talk, general conversation, or when information was not found), output `CITED_DOCUMENTS: []`.

---

{ 'CHAT HISTORY:\n' + history_str if history_str else '' }
COMPANY DOCUMENTS:
{company_context}

QUESTION:
{question}
"""

        raw_answer = ask_gemini(prompt)
        
        import re
        sources_list = []
        cited_match = re.search(r"CITED_DOCUMENTS:\s*\[(.*?)\]", raw_answer, re.IGNORECASE)
        if cited_match:
            files_str = cited_match.group(1).strip()
            if files_str:
                raw_sources = [f.strip() for f in files_str.split(",") if f.strip()]
                for src in raw_sources:
                    clean_src = src
                    if clean_src.lower().endswith(".txt"):
                        orig = clean_src[:-4]
                        if os.path.exists(os.path.join(UPLOAD_FOLDER, orig)):
                            clean_src = orig
                        elif clean_src.lower().endswith(".pdf.txt"):
                            clean_src = clean_src[:-4]
                    sources_list.append(clean_src)
            answer = re.sub(r"CITED_DOCUMENTS:\s*\[.*?\]", "", raw_answer, flags=re.IGNORECASE).strip()
        else:
            answer = raw_answer.strip()

        # 3. Save user and assistant messages to database
        user_msg_id = "msg-" + uuid.uuid4().hex[:8]
        asst_msg_id = "msg-" + uuid.uuid4().hex[:8]
        conn.execute("INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?)", (user_msg_id, conversation_id, "user", question))
        conn.execute("INSERT INTO messages (id, conversation_id, role, content, sources) VALUES (?, ?, ?, ?, ?)", (asst_msg_id, conversation_id, "assistant", answer, json.dumps(sources_list)))
        conn.commit()
        conn.close()

        return jsonify({
            "conversation_id": conversation_id,
            "answer": answer,
            "sources": sources_list
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "error": str(e)
        }), 500


@app.route("/sync", methods=["POST"])
def sync_knowledge():
    synced = []
    try:
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        if not os.path.exists(TEXT_FOLDER):
            os.makedirs(TEXT_FOLDER, exist_ok=True)

        for filename in os.listdir(UPLOAD_FOLDER):
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            if os.path.isdir(filepath):
                continue

            txt_filename = filename + ".txt" if not filename.lower().endswith(".txt") else filename
            txt_filepath = os.path.join(TEXT_FOLDER, txt_filename)

            if not os.path.exists(txt_filepath):
                if filename.lower().endswith(".pdf"):
                    text = extract_text(filepath)
                    with open(txt_filepath, "w", encoding="utf-8") as f:
                        f.write(text)
                    synced.append(filename)
                elif filename.lower().endswith(".docx"):
                    from services.docx_service import extract_docx_text
                    text = extract_docx_text(filepath)
                    with open(txt_filepath, "w", encoding="utf-8") as f:
                        f.write(text)
                    synced.append(filename)
                elif filename.lower().endswith((".txt", ".csv", ".json", ".xml")):
                    with open(filepath, "r", encoding="utf-8", errors="ignore") as f_src:
                        text = f_src.read()
                    with open(txt_filepath, "w", encoding="utf-8") as f_dest:
                        f_dest.write(text)
                    synced.append(filename)
        
        return jsonify({
            "status": "success",
            "message": f"Successfully synchronized {len(synced)} source file(s).",
            "synced_files": synced
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/documents", methods=["GET"])
def get_documents_api():
    docs = []
    if os.path.exists(UPLOAD_FOLDER):
        for filename in os.listdir(UPLOAD_FOLDER):
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            if os.path.isdir(filepath):
                continue
            stats = os.stat(filepath)
            size_mb = stats.st_size / (1024 * 1024)
            size_str = f"{max(size_mb, 0.1):.1f} MB"
            ext = filename.split(".")[-1].upper() if "." in filename else "TXT"
            
            import datetime
            creation_time = datetime.datetime.fromtimestamp(stats.st_mtime).strftime("%b %d, %Y")

            docs.append({
                "id": filename,
                "name": filename,
                "type": ext,
                "owner": "You",
                "size": size_str,
                "uploadedAt": creation_time,
                "status": "Indexed",
                "progress": 100,
                "source": "Upload"
            })
    return jsonify(docs)


@app.route("/documents/<filename>", methods=["DELETE"])
def delete_document_api(filename):
    try:
        filename = os.path.basename(filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        if os.path.exists(filepath):
            os.remove(filepath)
            
        txt_filename = filename + ".txt" if not filename.lower().endswith(".txt") else filename
        txt_filepath = os.path.join(TEXT_FOLDER, txt_filename)
        if os.path.exists(txt_filepath):
            os.remove(txt_filepath)
            
        return jsonify({"status": "success", "message": f"Deleted {filename} successfully."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/conversations", methods=["GET"])
def get_conversations_api():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM conversations ORDER BY created_at DESC").fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])


@app.route("/conversations/<id>/messages", methods=["GET"])
def get_conversation_messages_api(id):
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC", (id,)).fetchall()
    conn.close()
    
    messages_list = []
    for row in rows:
        msg = dict(row)
        if msg.get("sources"):
            import json
            try:
                msg["sources"] = json.loads(msg["sources"])
            except:
                msg["sources"] = []
        else:
            msg["sources"] = []
        messages_list.append(msg)
        
    return jsonify(messages_list)


@app.route("/conversations/<id>", methods=["DELETE"])
def delete_conversation_api(id):
    try:
        conn = get_db_connection()
        conn.execute("DELETE FROM conversations WHERE id = ?", (id,))
        conn.commit()
        conn.close()
        return jsonify({"status": "success", "message": f"Deleted conversation {id}"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)