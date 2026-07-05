import { useState, useRef } from "react";
import { ArrowUp, Bot, ChevronDown, Mic, Paperclip, Sparkles, Loader2 } from "lucide-react";
import Button from "../common/Button";
import { uploadDocument } from "../../services/api";
import { useNotification } from "../../context/NotificationContext";
import { clsx } from "clsx";

interface PromptBoxProps {
  placeholder?: string;
  suggestions?: string[];
  onSubmit?: (value: string) => void;
}

export default function PromptBox({
  placeholder = "Ask your company brain anything...",
  suggestions = [],
  onSubmit,
}: PromptBoxProps) {
  const [inputValue, setInputValue] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const { addNotification } = useNotification();

  const handleAsk = () => {
    onSubmit?.(inputValue.trim());
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setUploadStatus("Listening...");
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setUploadStatus("");
    };

    recognition.onend = () => {
      setIsListening(false);
      setUploadStatus("");
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInputValue((prev) => prev + (prev ? " " : "") + finalTranscript);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadStatus(`Uploading ${files.length} file(s)...`);
    try {
      await Promise.all(
        Array.from(files).map(async (file) => {
          await uploadDocument(file);
          addNotification("Document Uploaded", `Successfully indexed '${file.name}' from prompt box.`);
        })
      );
      setUploadStatus(`Successfully uploaded ${files.length} file(s)!`);
      setTimeout(() => setUploadStatus(""), 4000);
    } catch (error) {
      console.error(error);
      setUploadStatus("Upload failed.");
      addNotification("Upload Failed", "An error occurred while uploading documents from prompt box.");
      setTimeout(() => setUploadStatus(""), 4000);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111118]/90 p-3 shadow-2xl shadow-violet-950/20 backdrop-blur-xl light:border-slate-200 light:bg-white">
      <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4 light:border-slate-200 light:bg-slate-50">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-2xl bg-violet-500/15 p-2 text-violet-200 light:text-violet-700">
            <Sparkles size={18} />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAsk();
              }
            }}
            className="min-h-12 flex-1 bg-transparent text-lg font-medium text-white outline-none placeholder:text-zinc-500 light:text-slate-950"
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt,.csv,.pptx"
              className="hidden"
            />
            <Button
              variant="secondary"
              className="rounded-2xl cursor-pointer"
              disabled={isUploading}
              onClick={handleUploadClick}
            >
              {isUploading ? (
                <Loader2 size={16} className="animate-spin text-violet-400" />
              ) : (
                <Paperclip size={16} />
              )}
              Upload Document
            </Button>
            <Button
              variant="secondary"
              className={clsx(
                "rounded-2xl cursor-pointer transition-colors duration-300",
                isListening ? "bg-rose-500/25 border-rose-500 text-rose-300 hover:bg-rose-500/30" : ""
              )}
              onClick={toggleListening}
            >
              {isListening ? (
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              ) : (
                <Mic size={16} />
              )}
              {isListening ? "Listening..." : "Voice Input"}
            </Button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-violet-400/50 light:border-slate-200 light:bg-white light:text-slate-700 cursor-pointer"
            >
              <Bot size={16} />
              General Agent
              <ChevronDown size={15} />
            </button>
            {uploadStatus && (
              <span className="text-xs font-medium text-violet-400 ml-2 animate-pulse">
                {uploadStatus}
              </span>
            )}
          </div>
          <Button onClick={handleAsk} className="rounded-2xl px-5 cursor-pointer">
            Ask AI
            <ArrowUp size={18} />
          </Button>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 px-1">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setInputValue(suggestion);
                onSubmit?.(suggestion);
              }}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:-translate-y-0.5 hover:border-violet-400/60 hover:text-white light:border-slate-200 light:bg-slate-50 light:text-slate-700 cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
