import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "info" | "warning";
type Toast = { id: number; title: string; description?: string; type: ToastType };
const ToastCtx = createContext<(t: Omit<Toast, "id" | "type"> & { type?: ToastType }) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((t: Omit<Toast, "id" | "type"> & { type?: ToastType }) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [...s, { type: "success", ...t, id }]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 3600);
  }, []);
  const icons = { success: Check, info: Info, warning: AlertTriangle };
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-[100] flex w-[380px] max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-col items-center gap-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl bg-ink p-2 pr-3 text-white shadow-lift"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-ink"><Icon className="h-4 w-4" strokeWidth={2.5} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{t.title}</p>
                  {t.description && <p className="truncate text-xs text-white/55">{t.description}</p>}
                </div>
                <button onClick={() => setToasts((s) => s.filter((x) => x.id !== t.id))} className="text-white/40 hover:text-white"><X className="h-4 w-4" /></button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastCtx);
