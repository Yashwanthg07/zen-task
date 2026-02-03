# 📄 PRD — Task Manager (v1.1)

## 1. Design Philosophy

The Task Manager should feel:

* Modern and minimal
* Smooth and responsive
* Comfortable for long usage (dark mode)
* Visually communicative (motion ≠ decoration)

---

## 2. New Core Requirements

### 2.1 Theme Support (Light / Dark)

**Requirements**

* App supports **Light** and **Dark** themes
* User can toggle theme manually
* Selected theme persists across sessions
* Default theme respects system preference (`prefers-color-scheme`)

**Success Criteria**

* No layout or contrast issues in either theme
* Smooth transition when switching themes

---

### 2.2 Animations & Motion

**Purpose of Animations**

* Improve UX feedback
* Guide user attention
* Make state changes feel natural

**Rules**

* Animations must be subtle and performant
* No blocking or excessive motion
* Respect reduced-motion preferences

---

## 3. Updated Non-Functional Requirements

* Theme switch completes in < 200ms
* Animations use GPU-friendly properties (`transform`, `opacity`)
* App respects `prefers-reduced-motion`
* No animation libraries (CSS + TS only)

---

## 4. Updated Success Metrics

* Theme persists after reload
* Animations enhance UX without hurting performance
* UI feels “alive” but not distracting
