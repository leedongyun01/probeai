# UI/UX Design Specification

## 1. Design Philosophy
- **Style:** Modern, Minimalist, and Clean.
- **Atmosphere:** Calm, Professional, and Trustworthy.
- **Focus:** Content-centric, prioritizing readability and ease of research consumption.

## 2. Color Palette
A calm and muted color scheme to reduce eye strain and maintain a professional look.

### Primary Colors
- **Slate / Muted Blue:** Used for primary actions, headers, and key accents.
  - *Effect:* Instills a sense of stability and intelligence.
- **Sage / Soft Green:** Used for success states or positive indicators.
  - *Effect:* Calming and natural.

### Neutral Colors
- **Background (Light):** Off-white / Very light gray (e.g., `#F8F9FA` or `#FFFFFF`).
- **Background (Dark):** Deep Slate / Charcoal (e.g., `#0F172A` or `#1E293B`).
- **Text (Light):** Dark Slate (e.g., `#334155`) for high contrast without the harshness of pure black.
- **Text (Dark):** Light Gray / Off-white (e.g., `#E2E8F0`) for readability.

## 3. Typography
- **Font Family:** Modern Sans-serif (e.g., Inter, SF Pro, or System UI default).
- **Weights:**
  - **Regular:** Body text.
  - **Medium/Semi-Bold:** Headings and interactive elements.
- **Readability:** Generous line height and comfortable spacing between sections.

## 4. Navigation & Layout

### Global Header
A persistent header bar across all pages.

- **Logo:**
  - **Position:** Top-Left corner.
  - **Interaction:** Clickable.
  - **Behavior:** Navigates the user to the Search/Home screen (`/`).
  - **Visual:** Simple, recognizable icon or wordmark consistent with the "Calm" theme.

### Screens
1.  **Home / Search Screen:**
    -   Centered search input.
    -   Minimal distractions.
    -   Clear call to action.
2.  **Research / Result Screen:**
    -   Split view or focused content area.
    -   Sidebar for navigation (optional) or history.
    -   Clear distinct sections for "Summary", "Sources", and "Details".

## 5. UI Components
- **Buttons:** Rounded corners (soft edges), subtle shadows or flat design.
- **Cards:** Clean borders, light shadow for depth, sufficient padding.
- **Inputs:** Clear focus states, minimalist borders.

## 6. Theme Switching
The application supports both Light and Dark modes to accommodate user preference and environment.

- **Theme Toggle Button:**
  - **Position:** Bottom-Right corner (Fixed).
  - **Interaction:** Single click to toggle between Light and Dark modes.
  - **Visual:** Minimalist icon representing the current or target state (e.g., Sun/Moon).

## 7. Implementation Notes
- Use Tailwind CSS variables for theming to easily adjust the "Calm" palette.
- Ensure Dark Mode support is consistent with the calm aesthetic (avoid high-contrast pure black/white).
- The theme toggle should be easily accessible but non-intrusive.
