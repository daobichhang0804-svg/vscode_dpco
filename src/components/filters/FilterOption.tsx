import React from 'react';

interface FilterOptionProps {
  key?: React.Key;
  value: string;
  label: string;
  count: number;
  disabled: boolean;
  selected: boolean;
  type?: 'checkbox' | 'radio';
  onToggle: (value: string) => void;
}

export default function FilterOption({
  value,
  label,
  count,
  disabled,
  selected,
  type = 'checkbox',
  onToggle
}: FilterOptionProps) {
  const isClickable = !disabled || selected;

  return (
    <label
      className={`flex items-center justify-between py-1.5 px-2 rounded transition-colors select-none ${
        isClickable 
          ? 'cursor-pointer hover:bg-zinc-50' 
          : 'cursor-not-allowed opacity-40 bg-zinc-50/50'
      }`}
      title={disabled && !selected ? 'Không có sản phẩm phù hợp với tổ hợp bộ lọc hiện tại' : undefined}
    >
      <div className="flex items-center space-x-2.5 min-w-0 pr-2">
        <input
          type={type}
          checked={selected}
          disabled={!isClickable}
          onChange={() => {
            if (isClickable) {
              onToggle(value);
            }
          }}
          className={`h-4 w-4 rounded border-zinc-300 text-brand-green focus:ring-brand-green transition-colors ${
            isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
        />
        <span
          className={`text-sm truncate ${
            selected 
              ? 'font-medium text-brand-green' 
              : disabled 
                ? 'text-zinc-400' 
                : 'text-zinc-700'
          }`}
        >
          {label}
        </span>
      </div>

      <span
        className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
          selected
            ? 'bg-emerald-100 text-brand-green font-semibold'
            : disabled
              ? 'text-zinc-300'
              : 'text-zinc-400 bg-zinc-100'
        }`}
      >
        {count}
      </span>
    </label>
  );
}
