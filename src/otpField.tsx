import React from 'react';
import { isValidNumber, toEnglishNumber } from './utils';

type fieldProps = {
  fields: number;
  autoFocus?: boolean;
  className?: string;
};

export default function OTPField({ fields = 5, autoFocus, className }: fieldProps) {
  const [inputValues, setInputValues] = React.useState<string[]>(new Array(fields).fill(''));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value.trim();

    // only accept english and persian digits
    if (!isValidNumber(value) || value.length === fields) return;

    const englishNumber = toEnglishNumber(value).substring(0, 1);
    setInputValues(prevInputs => {
      return prevInputs.map((lastValue, inputIndex) =>
        inputIndex === index ? englishNumber : lastValue
      );
    });

    if (value) {
      focusNext(e.target);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { key, target } = e;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      focusNext(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      focusPrev(target);
    }

    if (key === 'Backspace' && target.value === '') {
      focusPrev(target);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const paste = e.clipboardData.getData('text');

    if (isValidNumber(paste) && paste.length === fields) {
      const englishNumber = toEnglishNumber(paste);
      setInputValues(englishNumber.split(''));
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.focus();
    e.target.setSelectionRange(0, e.target.value.length);
  }

  function focusNext(target: HTMLElement) {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;
    nextElementSibling?.focus();
  }

  function focusPrev(target: HTMLElement) {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;
    previousElementSibling?.focus();
  }

  return (
    <>
      {inputValues.map((_, index) => (
        <input
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          key={index}
          className={className}
          autoFocus={autoFocus && index === 0}
          maxLength={fields}
          value={inputValues[index]}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e)}
          onFocus={e => handleFocus(e)}
          onPaste={e => handlePaste(e)}
        />
      ))}
    </>
  );
}
