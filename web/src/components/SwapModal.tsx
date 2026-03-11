"use client";
import { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface Props {
  currentName: string;
  onClose: () => void;
  onConfirm: (newName: string) => void;
}

export default function SwapModal({ currentName, onClose, onConfirm }: Props) {
  const [input, setInput] = useState('');

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-card rounded-lg p-6 w-full max-w-md shadow-card relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-muted hover:text-foreground"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-medium mb-4">Swap Exercise</h3>
        <p className="mb-2">Replace <span className="font-semibold">{currentName}</span> with:</p>
        <input
          type="text"
          placeholder="New exercise name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={clsx(
            'w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary',
            'bg-white text-foreground'
          )}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-muted text-foreground hover:bg-muted/80"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(input)}
            disabled={!input.trim()}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}
