# Index Metasearch Engine

Index is a hackable, modular metasearch engine that aggregates results from multiple search providers ("clients") and presents them in a unified, customizable interface. It is designed for extensibility, theming, and experimentation with search UI and logic.

## Features

- **Multiple Search Clients**: Supports DuckDuckGo, Qwant, Wikipedia, and more via a pluggable client system.
- **Traditional UI**: Responsive, traditional interface with support for custom CSS, backgrounds, and interactive widgets ("islands").
- **Special Blocks**: Supports rich result blocks (weather, color picker, etc.) alongside standard web results.
- **OpenSearch Support**: Integrates with browsers via `opensearch.xml`.
- **Easy Theming**: Change backgrounds, inject custom CSS, and tweak layout from the UI.
- **Extensible**: Add new search clients or UI widgets with minimal code.

## Project Structure

- `main.py` — FastAPI backend serving HTML, static files, and API endpoints.
- `clients/` — Python modules for each search provider ("client").
- `client/js/` — Frontend JavaScript (rendering, UI logic, widgets).
- `css/` — Stylesheets for layout, themes, and widgets.
- `index.html`, `indsearch.html` — Main and search result pages.
- `test/indsearch.html` — UI/UX and rendering test page.

## Running Locally

1. **Install dependencies** (Python 3.10+ recommended):
   ```bash
   pip install fastapi uvicorn aiohttp
   ```
2. **Start the server:**
   ```bash
   uvicorn main:app --reload
   ```
3. **Open in browser:**
   - Home: [http://localhost:8000/](http://localhost:8000/)
   - Search: [http://localhost:8000/indsearch.html](http://localhost:8000/indsearch.html)

## Adding a New Search Client

1. Create a new Python file in `clients/` (see `clients/qwant.py` for an example).
2. Implement a class with a `search(self, query: str)` async method returning a list of results.
3. Register your client in `main.py`.

## Customization

- **UI Themes & CSS**: Use the customization panel in the UI to link external CSS or edit files in `css/`.
- **Widgets**: Add new interactive blocks in `client/js/bento-widgets/` and register them.
- **Islands**: Add new interactive blocks in `client/js/islands/` and register them.

## License

AGPL-3.0-or-later. See individual files for details.

## Credits

- SearXNG for QWant client https://github.com/searxng/
- KDE Plasma 4 designers and photographers for backgrounds. They're really amazing. Currently you can find them here https://github.com/MartinF99/plasma-classic-wallpapers
- Yandex for UI inspiration
- You

---

*This project is experimental and intended for research, learning, and personal use.*
