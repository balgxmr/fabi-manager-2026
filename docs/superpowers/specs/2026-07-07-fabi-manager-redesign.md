# FABI Manager — Product Redesign Spec

**Date:** 2026-07-07
**Status:** Approved

---

## 1. Stack & Constraints

- Angular 20 + Ionic 8 (standalone components)
- Light theme only
- No backend, no real auth — all data mock
- Responsive desktop-first
- Ionic icons + custom CSS animations
- No external chart library — mock charts via CSS/SVG

---

## 2. Architecture

### 2.1 Project Structure

```
src/app/
├── core/
│   ├── models/
│   │   ├── flight.model.ts
│   │   └── crew.model.ts
│   ├── services/
│   │   ├── flight.service.ts
│   │   └── crew.service.ts
│   └── mock/
│       ├── flights.mock.ts      # 40 flights
│       └── crew.mock.ts         # 24 crew members
├── shared/
│   ├── components/
│   │   ├── kpi-card/
│   │   ├── status-chip/
│   │   ├── data-table/
│   │   ├── search-bar/
│   │   ├── page-header/
│   │   ├── empty-state/
│   │   └── skeleton-loader/
│   └── directives/
│       └── sortable-header.directive.ts
├── layout/
│   ├── sidebar/
│   ├── dashboard-layout/
│   └── dashboard-layout.component + header
├── features/
│   ├── dashboard/
│   ├── flights/
│   │   ├── flight-list/
│   │   ├── flight-detail/
│   │   └── assign-crew/
│   ├── crew/
│   │   ├── crew-list/
│   │   └── crew-card/
│   └── reports/
├── app.component.ts
├── app.component.html
└── app.routes.ts
```

### 2.2 Routes

| Path | Component | Purpose |
|---|---|---|
| `/` | DashboardPage | KPIs + top 10 flights + "View All" modal |
| `/flights/:id` | FlightDetailPage | Full flight info + crew + timeline |
| `/crew` | CrewPage | Searchable crew grid |
| `/reports` | ReportsPage | CSS/SVG mock charts & alerts |

### 2.3 Services

| Service | Responsibility |
|---|---|
| `FlightService` | getFlights(), getById(), filter(), search(), sort() |
| `CrewService` | getCrew(), getById(), filterByRole(), filterByAvailability() |

---

## 3. Layout

### 3.1 Sidebar (240px / 64px collapsed)

- Fixed left, full viewport height
- White bg, `border-right: 1px solid #e2e8f0`
- Logo section: airplane icon + "FABI" bold + "Manager" normal
- Nav items: Dashboard, Flights, Crew, Reports
- Each item: icon (24px) + label, `padding: 14px 20px`
- Active state: `bg #eff6ff`, primary text, 3px left bar
- Hover: `bg #f8fafc`
- Mobile: collapses to 64px icons-only, tooltip on hover

### 3.2 Header (inside content area)

- White bg, `border-bottom: 1px solid #e2e8f0`, `padding: 12px 24px`
- Left: breadcrumb (Dashboard > Section)
- Right: current date, notification bell (ion-icon + ion-badge), user avatar with initials

### 3.3 DashboardLayout component

- Flex row: sidebar | content
- Content: header + router-outlet with `padding: 24px 32px`
- Background page: `#f5f7fa`

### 3.4 Palette

| Token | Value |
|---|---|
| Primary | `#0054E9` |
| Page bg | `#f5f7fa` |
| Card bg | `#ffffff` |
| Text primary | `#1e293b` |
| Text secondary | `#64748b` |
| Border | `#e2e8f0` |
| Sidebar active | `#eff6ff` |
| Success | `#22c55e` |
| Warning | `#f59e0b` |
| Danger | `#ef4444` |

---

## 4. Shared Components

### 4.1 KpiCard
- **Inputs:** icon, label, value, trend (number + direction), color
- **States:** loading (skeleton shimmer), normal
- **Template:** icon circle (left) | value + label (center) | trend badge (bottom-right)
- Border-radius: 12px, shadow-lite

### 4.2 StatusChip
- **Inputs:** status string
- **Maps:** "On Time" → green, "Delayed" → yellow, "Boarding" → blue, "Departed" → gray
- Renders as `ion-chip` with custom color overrides

### 4.3 DataTable
- **Inputs:** columns config, rows, sortKey, sortDir
- **Outputs:** sort change, row click
- **Template:** `<table>` with sticky header, sortable columns, hover rows
- **Slots:** cell customization via ng-template

### 4.4 SearchBar
- **Inputs:** placeholder, value
- **Outputs:** search (with 300ms debounce)
- **Template:** ion-input with search icon, clear button

### 4.5 PageHeader
- **Inputs:** title, breadcrumbs[], actions[]
- **Template:** h1 + breadcrumb trail + action buttons slot

### 4.6 EmptyState
- **Inputs:** icon, message, actionLabel
- **Outputs:** action click
- **Template:** centered icon + text + optional button

### 4.7 SkeletonLoader
- **Inputs:** type ('card' | 'table-row' | 'chart'), count
- **Template:** CSS-only shimmer animation blocks

---

## 5. Pages

### 5.1 Dashboard (`/`)

**KPIs Row** (4 KpiCards):
- Total Flights: 40, ↑ 3.2%
- On Time: 31, ↑ 5.1%
- Delayed: 7, ↓ 2.3%
- Crew Assigned: 47, ↑ 1.8%

**Recent Flights Table** (top 10):
- Columns: Flight ID, Destination, Departure, Gate, Status, Crew, Actions
- Row click → navigates to `/flights/:id`
- Status column uses StatusChip
- Actions column: icon button "Assign Crew" → opens assign-crew modal

**"View All Flights"** button → opens a full-width modal with:
- SearchBar at top
- Filter chips (All, On Time, Delayed, Boarding, Departed)
- Full DataTable with 40 flights, paginated (10 per page)
- Sortable columns

### 5.2 Flight Detail (`/flights/:id`)

- Back button + Flight ID title + StatusChip
- Info grid (2 cols): Destination, Time, Gate, Aircraft, Terminal, Captain
- "Assigned Crew" section with horizontal crew cards + "Edit Crew" button
- Timeline: 4 events (Scheduled → Check-in → Boarding → Departed) with vertical line, icons, hours

### 5.3 Crew (`/crew`)

- PageHeader "Crew Management"
- SearchBar + filter dropdowns (role, availability)
- Crew grid: 3 cols desktop, 2 tablet, 1 mobile
- Each CrewCard: avatar initials, name, role, availability dot, hours progress bar, aircraft badges
- Total: 24 crew members

### 5.4 Reports (`/reports`)

- 2-column grid (2fr / 1fr)
- Top KPIs row (4 mini KpiCards)
- "Flight Status Distribution" — CSS bar chart, 7 days, stacked bars
- "Top Destinations" — horizontal bars with counts
- "Hourly Activity" — SVG line chart mock
- "Alerts" — 4 alert cards (warning, info, success variants)

---

## 6. Assign Crew Modal

Reusable modal component, used from Dashboard table and Flight Detail:
- Flight info header (ID, destination, time)
- Current crew list with remove button
- Search + select from existing crew members (pre-built crew from `CrewService`, filtered by name/role)
- Selected members appear as chips below search
- Save/Cancel buttons

---

## 7. Mock Data

### Flights (40)
- IDs: FAB-101 through FAB-140
- Destinations: Madrid, London, New York, Paris, Tokyo, Dubai, Rome, Berlin, Amsterdam, Singapore, Barcelona, Lisbon, Miami, Chicago, Toronto, Sydney (cycle)
- Statuses: weighted distribution (60% On Time, 20% Delayed, 10% Boarding, 10% Departed)
- Gates: A1-A20, B1-B20
- Times: spread across 6:00-23:00

### Crew (24)
- Roles: Captain (8), First Officer (6), Cabin Lead (4), Flight Attendant (6)
- Statuses: Available (12), On Flight (6), Standby (4), Off Duty (2)
- Realistic names, different nationalities
- Hours assigned: 80-160 range
- Aircraft certifications: Boeing 737, Airbus A320, Boeing 787

---

## 8. Animations

- Sidebar hover: background tint (0.2s ease)
- KPI cards: hover lift (`translateY(-2px)` + shadow increase, 0.3s)
- Table rows: hover background, active scale(0.99) on click
- Modal: fade + slide-up (Ionic default)
- Page transitions: fade 0.2s
- Skeleton: shimmer keyframe (sliding gradient 1.5s infinite)

---

## 9. Non-goals

- No real backend or API
- No authentication
- No real-time data
- No PWA configuration
- No e2e tests
