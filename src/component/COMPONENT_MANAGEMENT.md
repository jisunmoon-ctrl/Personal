# Component Management Guide

## Scope

- This document manages reusable UI components across `src/builder.html` and `src/admin.html`.
- The current baseline is Figma ODS Input documentation (`node-id=47047:72484`).

## Managed Components

### Input Field

- Canonical structure:
  - `.input-field`
  - `.input-field__title` (optional)
  - `.input-field__control`
  - `.input.input--32|.input--40`
  - `.input-field__text-btn` (optional)
  - `.input-field__clear` (optional, typing/complete)
  - `.input-field__help` (optional)
- State matrix:
  - Error false: `inactive`, `pressed`, `typing`, `complete`, `disabled`
  - Error true: `inactive`, `completed`
- Sizing:
  - `input--32`: 32px height, 14/20 typography
  - `input--40`: 40px height, 16/24 typography

### Box Button

- Figma baseline: `3739:69767` (`🌀 Box Button`)
- Canonical structure:
  - `.btn`
  - size modifier: `.btn--xs|sm|md|lg|xl`
  - variant modifier: `.btn--normal|solid|outlined|brand-solid|brand-outlined`
  - state class: `.is-loading` (optional)
- State matrix:
  - `disabled=true|false`
  - `loading=true|false` (disabled와 조합 가능)
- Compatibility aliases (legacy):
  - `.btn--primary` -> brand-solid
  - `.btn--secondary` -> normal

## Synchronization Rules

- If component UI/state behavior changes, update all of:
  - `SYSTEM — Design System 345a57222b5c81ed8756d049bf479f19.md`
  - `src/builder.html`
  - `src/admin.html`
  - `src/component/COMPONENT_UPDATES.md`
- No partial rollout is allowed (spec-only or implementation-only changes are disallowed).

## QA Checklist

- Focus border changes to primary color.
- Error border is applied when invalid.
- Disabled state blocks typing and shows muted UI.
- Clear button appears only when the field has value.
- `help text` and `counter` are never used together.
- Button loading state disables click and shows spinner.
- Button size/variant class names are identical in builder/admin.
