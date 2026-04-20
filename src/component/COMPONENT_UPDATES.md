# Component Updates Log

## 2026-04-17

### Button Component (Figma `3739:69767`) sync

- Added button spec coverage for:
  - Variants: `normal`, `solid`, `outlined`, `brand-solid`, `brand-outlined`
  - Sizes: `extra-small`, `small`, `medium`, `large`, `extra-large`
  - States: `loading=true|false`, `disabled=true|false`
- Applied synchronization to:
  - `SYSTEM — Design System 345a57222b5c81ed8756d049bf479f19.md`
  - `src/builder.html`
  - `src/admin.html`

### Input Component (Figma `47047:72484`) sync

- Added input spec coverage for:
  - Size: `32`, `40`
  - States: `inactive`, `pressed`, `typing`, `complete`, `disabled`
  - Error cases: `error=false`, `error=true`
  - Optional slots: `title`, `help text`, `text button`, `clear button`
- Applied synchronization to:
  - `SYSTEM — Design System 345a57222b5c81ed8756d049bf479f19.md`
  - `src/builder.html`
  - `src/admin.html`

### Implementation Notes

- `builder.html`
  - Contact form inputs use `.input-field` composition.
  - Added clear button behavior with `data-clear-for`.
- `admin.html`
  - `createField()` now renders clear button for non-textarea fields.
  - Added `.field__input--32`, `.field__input--40`, and input control styles.

### Follow-up

- If counter UI is introduced later, enforce mutual exclusivity with `help text`.
- Keep state names and CSS class semantics aligned with this log and `SYSTEM`.
- Keep button legacy aliases (`primary`, `secondary`) until all call-sites migrate.
