<template>
  <section
    class="panel"
    aria-labelledby="typing-title"
  >
    <div class="flex min-h-10 items-center justify-between gap-3">
      <h2
        id="typing-title"
        class="text-15px font-600"
      >
        <label for="typing-input">Give it a type</label>
      </h2>
      <span
        class="i-ri:text-cursor text-muted"
        aria-hidden="true"
      />
    </div>
    <textarea
      :spellcheck="false"
      id="typing-input"
      class="typing-input"
      name="keyboard-test"
      placeholder="The quick brown fox jumps over the lazy dog…"
      rows="3"
      autocomplete="off"
      autocapitalize="off"
      aria-describedby="typing-help"
    />
    <p
      id="typing-help"
      class="mt-3 text-12px text-muted"
    >
      Try letters, symbols, or a combination like Shift + A.
    </p>
  </section>
</template>
