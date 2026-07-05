import { Bot, BrainCircuit, Search, Send, User, Trash2, MessageSquarePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { FormEvent } from "react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import PageHeader from "../components/dashboard/PageHeader";
import { askBrain, getConversations, getConversationMessages, deleteConversation } from "../services/api";
import type { Message } from "../types";
import type { Conversation } from "../services/api";

export default function AskBrain() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryParam = searchParams.get("q");

  const loadConversations = async () => {
    try {
      const list = await getConversations();
      setConversations(list);
    } catch (e) {
      console.error("Failed to load conversations:", e);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const selectConversation = async (id: string) => {
    setActiveConversationId(id);
    setIsLoading(true);
    try {
      const msgs = await getConversationMessages(id);
      setMessages(msgs);
    } catch (e) {
      console.error("Failed to load messages:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
  };

  useEffect(() => {
    if (queryParam) {
      const triggerQuery = async (prompt: string) => {
        const userMessage: Message = {
          id: `msg-${Date.now()}`,
          role: "user",
          content: prompt,
          createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        };

        setMessages((current) => [...current, userMessage]);
        setIsLoading(true);
        try {
          const response = await askBrain(prompt);
          if (response.conversation_id) {
            setActiveConversationId(response.conversation_id);
            await loadConversations();
          }
          setMessages((current) => [...current, response]);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };

      triggerQuery(queryParam);
      setSearchParams({}, { replace: true });
    }
  }, [queryParam, setSearchParams]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: prompt,
      createdAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await askBrain(prompt, activeConversationId || undefined);
      if (!activeConversationId && response.conversation_id) {
        setActiveConversationId(response.conversation_id);
        await loadConversations();
      }
      setMessages((current) => [...current, response]);
    } catch (e) {
      console.error("Failed to submit query:", e);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-112px)] min-h-[680px] flex-col gap-6">
      <PageHeader
        eyebrow="Ask Brain"
        title="Ask your company knowledge"
        subtitle="Chat with source-backed answers from documents, tools, and team knowledge."
        icon={BrainCircuit}
      />

      <Card className="grid min-h-0 flex-1 overflow-hidden p-0 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 border-r border-white/10 light:border-slate-200 lg:flex lg:flex-col">
          <div className="border-b border-white/10 p-4 light:border-slate-200">
            <Button
              onClick={startNewChat}
              variant="secondary"
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm cursor-pointer border-dashed border-white/20 hover:border-violet-500/50"
            >
              <MessageSquarePlus size={16} />
              New Conversation
            </Button>
            <div className="relative mt-4">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-2 pl-9 pr-3 text-sm outline-none light:border-slate-200 light:bg-slate-50"
                placeholder="Search history..."
              />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {filteredConversations.map((conv) => (
              <div key={conv.id} className="relative group mb-1.5">
                <button
                  type="button"
                  onClick={() => selectConversation(conv.id)}
                  className={`w-full rounded-2xl p-3 text-left text-sm transition pr-10 cursor-pointer ${
                    activeConversationId === conv.id
                      ? "bg-violet-600/20 border border-violet-500/40 text-violet-200 font-semibold"
                      : "text-zinc-400 border border-transparent hover:bg-white/[0.04] hover:text-white light:text-slate-600 light:hover:bg-slate-100"
                  }`}
                >
                  <span className="block truncate">{conv.title}</span>
                </button>
                <button
                  type="button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await deleteConversation(conv.id);
                      if (activeConversationId === conv.id) {
                        startNewChat();
                      }
                      loadConversations();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex min-h-0 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <div className="mx-auto max-w-4xl space-y-5">
              {messages.length === 0 && (
                <div className="flex h-[350px] flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-violet-500/10 p-4 text-violet-300">
                    <BrainCircuit size={40} className="animate-pulse" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white light:text-slate-900">Start a new conversation</h3>
                  <p className="mt-2 max-w-sm text-sm text-zinc-500 light:text-slate-500">
                    Ask questions about your uploaded documents, company guides, policies, or general processes.
                  </p>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <div key={message.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
                    {!isUser && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-200">
                        <Bot size={18} />
                      </div>
                    )}
                    <div className={`max-w-[78%] rounded-3xl px-5 py-4 ${isUser ? "bg-violet-600 text-white" : "bg-[#111118] light:bg-slate-50"}`}>
                      <p className="text-sm leading-7">{message.content}</p>
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-4">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Sources
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source) => (
                              <Badge key={source} tone="violet">
                                {source.replace(".txt", "")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="mt-2 text-xs opacity-60">{message.createdAt}</p>
                    </div>
                    {isUser && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                        <User size={18} />
                      </div>
                    )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Bot size={18} className="text-violet-300" />
                  Brain is typing
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300 [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-violet-300 [animation-delay:240ms]" />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#0B0B12] p-4 light:border-slate-200 light:bg-white">
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-4xl gap-3 rounded-3xl border border-white/10 bg-white/[0.05] p-2 light:border-slate-200 light:bg-slate-50">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none placeholder:text-zinc-500 text-white light:text-slate-900"
                placeholder="Ask a question..."
              />
              <Button type="submit" disabled={isLoading} className="rounded-2xl cursor-pointer">
                <Send size={17} />
              </Button>
            </form>
          </div>
        </section>
      </Card>
    </div>
  );
}
