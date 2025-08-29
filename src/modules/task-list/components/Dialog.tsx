// components/Dialog.tsx
"use client";
import React, { useEffect, useRef } from "react";

const Dialog = ({
  show,
  title = "Delete task?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: {
  show: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (show) {
      lastActiveRef.current = document.activeElement as HTMLElement;
      cancelBtnRef.current?.focus();
    } else {
      lastActiveRef.current?.focus();
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [show, onCancel]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-desc"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div
        ref={panelRef}
        className="relative w-[90%] max-w-sm rounded-lg border border-[#333333] bg-[#262626] p-5 shadow-xl"
      >
        <h2
          id="dialog-title"
          className="mb-2 text-center text-[16px] text-[#F2F2F2]"
        >
          {title}
        </h2>
        <p
          id="dialog-desc"
          className="mb-6 text-center text-[14px] text-[#D9D9D9]"
        >
          {message}
        </p>
        <div className="flex justify-center gap-3">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
            className="rounded-md bg-[#333333] px-3 py-2 text-[14px] text-[#F2F2F2] cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-[#E25858] px-3 py-2 text-[14px] font-semibold text-white hover:opacity-90 cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
