import os
import tempfile
import unittest

from services.document_count_service import count_uploaded_documents


class DocumentCountTests(unittest.TestCase):
    def test_count_uploaded_documents_uses_supported_files_only(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            open(os.path.join(tmpdir, "plan.pdf"), "w", encoding="utf-8").close()
            open(os.path.join(tmpdir, "data.csv"), "w", encoding="utf-8").close()
            open(os.path.join(tmpdir, "notes.txt"), "w", encoding="utf-8").close()
            open(os.path.join(tmpdir, "ignore.tmp"), "w", encoding="utf-8").close()
            open(os.path.join(tmpdir, "subfolder"), "a").close()

            self.assertEqual(count_uploaded_documents(tmpdir), 3)


if __name__ == "__main__":
    unittest.main()
