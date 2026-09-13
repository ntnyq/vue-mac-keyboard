import type { KeycodeData } from 'vue-mac-keyboard'

export interface KeyboardKey {
  code: string
  key: string
  keycode: number | null
  label: string
  source: 'Keyboard' | 'On-screen'
}

export interface KeyStroke extends KeyboardKey {
  id: number
  chord: string
}

const codeKeycodes: Record<string, number> = {
  Backspace: 8,
  Tab: 9,
  Enter: 13,
  NumpadEnter: 13,
  ShiftLeft: 16,
  ShiftRight: 16,
  ControlLeft: 17,
  ControlRight: 17,
  AltLeft: 18,
  AltRight: 18,
  CapsLock: 20,
  Escape: 27,
  Space: 32,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  MetaLeft: 91,
  MetaRight: 91,
  Semicolon: 186,
  Equal: 187,
  Comma: 188,
  Minus: 189,
  Period: 190,
  Slash: 191,
  Backquote: 192,
  BracketLeft: 219,
  Backslash: 220,
  BracketRight: 221,
  Quote: 222,
}

const keyLabels: Record<string, string> = {
  ' ': 'Space',
  Shift: '⇧ Shift',
  Control: '⌃ Control',
  Alt: '⌥ Option',
  Meta: '⌘ Command',
  ArrowLeft: '←',
  ArrowUp: '↑',
  ArrowRight: '→',
  ArrowDown: '↓',
  Escape: 'Esc',
  Backspace: '⌫ Delete',
  Enter: '↵ Return',
  CapsLock: '⇪ Caps Lock',
}

const virtualLabels: Record<number, string> = {
  8: '⌫ Delete',
  9: 'Tab',
  13: '↵ Return',
  16: '⇧ Shift',
  17: '⌃ Control',
  18: '⌥ Option',
  20: '⇪ Caps Lock',
  27: 'Esc',
  32: 'Space',
  37: '←',
  38: '↑',
  39: '→',
  40: '↓',
  91: '⌘ Command',
}

/**
 * Match physical positions to the library's legacy keycodes, including during IME input.
 */
export function fromKeyboardEvent(event: KeyboardEvent): KeyboardKey {
  let keycode: number | null = codeKeycodes[event.code] ?? null
  if (/^Key[A-Z]$/.test(event.code)) {
    keycode = event.code.codePointAt(3) ?? null
  }
  if (/^Digit\d$/.test(event.code)) {
    keycode = Number(event.code.slice(5)) + 48
  }
  if (/^F(?:[1-9]|1[0-2])$/.test(event.code)) {
    keycode = Number(event.code.slice(1)) + 111
  }

  return {
    code: event.code || 'Unidentified',
    key: event.key,
    keycode,
    label:
      keyLabels[event.key]
      || (event.key.length === 1 ? event.key.toUpperCase() : event.key)
      || event.code
      || 'Unknown',
    source: 'Keyboard',
  }
}

export function fromVirtualKey(data: KeycodeData): KeyboardKey {
  const label =
    virtualLabels[data.keycode]
    || data.name.filter(Boolean).join(' ')
    || 'Unknown'
  return {
    code: `virtual:${data.keycode}:${label}`,
    key: label,
    keycode: data.keycode < 0 ? null : data.keycode,
    label,
    source: 'On-screen',
  }
}
