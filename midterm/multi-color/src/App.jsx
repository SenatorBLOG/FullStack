import React, { useState, useEffect, useRef, useMemo, createContext, useContext } from 'react';
import { FaTrash, FaStar, FaPlus, FaCog, FaEdit } from 'react-icons/fa';

// ========== Theme Context (example of Context API) ==========
const ThemeContext = createContext({ theme: 'light' });

// ========== Sample initial data ==========
const initialPalettes = [
  { id: 1, name: 'Sunset', color: '#FF7F50', sample: '#FFB28A', rating: 4, favorite: true },
  { id: 2, name: 'Ocean', color: '#00A9CE', sample: '#99E0F2', rating: 3, favorite: false },
  { id: 3, name: 'Emerald', color: '#009874', sample: '#8FE3C0', rating: 5, favorite: false },
];

// ========== Inline style objects (all styling here) ==========
const styles = {
  container: (theme) => ({
    minHeight: '100vh',
    padding: 24,
    backgroundColor: theme === 'dark' ? '#0b0f12' : '#ffffff',
    color: theme === 'dark' ? '#f7fafc' : '#0f172a',
    fontFamily: 'Inter, Roboto, system-ui, -apple-system, sans-serif',
    boxSizing: 'border-box'
  }),
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  grid: { display: 'grid', gridTemplateColumns: '1fr', gap: 16 },
  gridMd: { gridTemplateColumns: 'repeat(3, 1fr)' },
  card: { padding: 16, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', background: 'transparent' },
  input: { width: '100%', marginTop: 8, padding: 8, borderRadius: 6, border: '1px solid rgba(0,0,0,0.12)', boxSizing: 'border-box' },
  button: { padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.12)', background: 'transparent', cursor: 'pointer' },
  smallButton: { padding: '6px 8px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer', background: 'transparent' },
  footer: { marginTop: 24, textAlign: 'center', fontSize: 12, opacity: 0.75 },
  paletteItem: { display: 'flex', gap: 16, alignItems: 'flex-start', padding: 12, borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' },
  colorBox: (palette) => ({ width: 90, height: 90, borderRadius: 8, background: `linear-gradient(135deg, ${palette.color}, ${palette.sample})` }),
  inlineEditor: { marginTop: 8, padding: 8, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.03)' },
  star: (active) => ({ cursor: 'pointer', color: active ? '#f6c000' : '#cfcfcf' }),
  formRow: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }
};

// ========== App (root, demonstrates lifting state & many patterns) ==========
export default function App() {
  // Main state lives here and is passed down
  const [palettes, setPalettes] = useState(initialPalettes);
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('name'); // name | rating
  const [uiVariant, setUiVariant] = useState('button'); // demonstrates swapping child UI
  const [faviconMode, setFaviconMode] = useState('default');
  const [theme, setTheme] = useState('light');

  // LIFTED ACTIONS (passed down to children)
  const addPalette = (newPalette) => setPalettes(p => [{ ...newPalette, id: Date.now() }, ...p]);
  const removePalette = (id) => setPalettes(p => p.filter(x => x.id !== id));
  const ratePalette = (id, rating) => setPalettes(p => p.map(x => x.id !== id ? x : { ...x, rating }));
  const toggleFavorite = (id) => setPalettes(p => p.map(x => x.id !== id ? x : { ...x, favorite: !x.favorite }));
  const editPalette = (id, data) => setPalettes(p => p.map(x => x.id !== id ? x : { ...x, ...data }));

  // Derived (useMemo) and demonstration of map/filter
  const filtered = useMemo(() => {
    return palettes
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .filter(p => p.rating >= minRating)
      .filter(p => (showOnlyFavorites ? p.favorite : true))
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.name.localeCompare(b.name);
      });
  }, [palettes, query, minRating, showOnlyFavorites, sortBy]);

  // Side effect: change favicon when faviconMode changes
  useEffect(() => {
    const setIcon = (emoji) => {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'icon';
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><text y='20' font-size='20'>${emoji}</text></svg>`;
      const url = 'data:image/svg+xml,' + encodeURIComponent(svg);
      link.href = url;
      document.getElementsByTagName('head')[0].appendChild(link);
    };

    if (faviconMode === 'default') setIcon('🎨');
    else if (faviconMode === 'star') setIcon('⭐');
    else if (faviconMode === 'heart') setIcon('💚');
  }, [faviconMode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={styles.container(theme)}>
        <Header />

        <div style={{ ...styles.grid, ...(window.innerWidth >= 768 ? styles.gridMd : {}) }}>
          <div style={{ gridColumn: 'span 1' }}>
            <Controls
              query={query}
              setQuery={setQuery}
              minRating={minRating}
              setMinRating={setMinRating}
              showOnlyFavorites={showOnlyFavorites}
              setShowOnlyFavorites={setShowOnlyFavorites}
              sortBy={sortBy}
              setSortBy={setSortBy}
              uiVariant={uiVariant}
              setUiVariant={setUiVariant}
              faviconMode={faviconMode}
              setFaviconMode={setFaviconMode}
              theme={theme}
              setTheme={setTheme}
            />

            <AddPaletteForm onAdd={addPalette} />

            <Stats palettes={palettes} />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <PaletteList
              palettes={filtered}
              onRemove={removePalette}
              onRate={ratePalette}
              onToggleFavorite={toggleFavorite}
              onEdit={editPalette}
              uiVariant={uiVariant}
            />
          </div>
        </div>

        <Footer palettesCount={palettes.length} />
      </div>
    </ThemeContext.Provider>
  );
}

// ========== Header & Footer ==========
function Header() {
  const { theme } = useContext(ThemeContext);
  return (
    <header style={styles.header}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>React Midterm — Multi-layer Demo</h1>
      <div style={{ fontSize: 13, opacity: 0.8 }}>Theme: {theme}</div>
    </header>
  );
}

function Footer({ palettesCount }) {
  return (
    <footer style={styles.footer}>Total palettes managed: {palettesCount}</footer>
  );
}

// ========== Controls (parent passes many setters down) ==========
function Controls({ query, setQuery, minRating, setMinRating, showOnlyFavorites, setShowOnlyFavorites, sortBy, setSortBy, uiVariant, setUiVariant, faviconMode, setFaviconMode, theme, setTheme }) {
  return (
    <div style={{ ...styles.card, marginBottom: 12 }}>
      <h3 style={{ fontWeight: 600 }}>Controls / Filters</h3>

      <label style={{ display: 'block', marginTop: 8 }}>
        Search
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="type to filter" style={styles.input} />
      </label>

      <label style={{ display: 'block', marginTop: 8 }}>
        Min Rating: {minRating}
        <input type="range" min={0} max={5} value={minRating} onChange={e => setMinRating(Number(e.target.value))} style={{ width: '100%', marginTop: 8 }} />
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <input type="checkbox" checked={showOnlyFavorites} onChange={e => setShowOnlyFavorites(e.target.checked)} /> Only favorites
      </label>

      <label style={{ display: 'block', marginTop: 8 }}>
        Sort
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ ...styles.input, padding: 8 }}>
          <option value="name">Name (A-Z)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </label>

      <label style={{ display: 'block', marginTop: 8 }}>
        UI Variant (child component swap)
        <select value={uiVariant} onChange={e => setUiVariant(e.target.value)} style={styles.input}>
          <option value="button">Button (default)</option>
          <option value="form">Inline Form</option>
          <option value="icon">Icon-only</option>
        </select>
      </label>

      <label style={{ display: 'block', marginTop: 8 }}>
        Favicon
        <select value={faviconMode} onChange={e => setFaviconMode(e.target.value)} style={styles.input}>
          <option value="default">🎨 Default</option>
          <option value="star">⭐ Star</option>
          <option value="heart">💚 Heart</option>
        </select>
      </label>

      <label style={{ display: 'block', marginTop: 8 }}>
        Theme
        <select value={theme} onChange={e => setTheme(e.target.value)} style={styles.input}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  );
}

// ========== AddPaletteForm (controlled component) ==========
function AddPaletteForm({ onAdd }) {
  const nameRef = useRef();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name, color, sample: color, rating: 0, favorite: false });
    setName('');
    setColor('#000000');
    nameRef.current?.focus();
  };

  return (
    <form onSubmit={submit} style={{ ...styles.card, marginTop: 12 }}>
      <h4 style={{ fontWeight: 500 }}>Add new palette</h4>
      <input ref={nameRef} value={name} onChange={e => setName(e.target.value)} placeholder="Palette name" style={styles.input} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <button style={{ marginLeft: 'auto', ...styles.button }} type="submit"><FaPlus style={{ marginRight: 6 }} /> Add</button>
      </div>
    </form>
  );
}

// ========== Stats (demonstrates reduce) ==========
function Stats({ palettes }) {
  const avg = palettes.length === 0 ? 0 : Math.round(palettes.reduce((s, p) => s + p.rating, 0) / palettes.length * 10) / 10;
  return (
    <div style={{ ...styles.card, marginTop: 12 }}>
      <div>Palettes: {palettes.length}</div>
      <div>Average rating: {avg}</div>
    </div>
  );
}

// ========== PaletteList & PaletteItem (deep nesting + prop drilling) ==========
function PaletteList({ palettes, onRemove, onRate, onToggleFavorite, onEdit, uiVariant }) {
  if (!palettes.length) return <div style={{ padding: 12 }}>No palettes match your filters.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {palettes.map(p => (
        <PaletteItem
          key={p.id}
          palette={p}
          onRemove={onRemove}
          onRate={onRate}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          uiVariant={uiVariant}
        />
      ))}
    </div>
  );
}

function PaletteItem({ palette, onRemove, onRate, onToggleFavorite, onEdit, uiVariant }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={styles.paletteItem}>
      <div style={styles.colorBox(palette)} />

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontWeight: 600 }}>{palette.name}</h4>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button title="toggle favorite" onClick={() => onToggleFavorite(palette.id)} style={styles.smallButton}>{palette.favorite ? '★' : '☆'}</button>
            <button onClick={() => setIsEditing(s => !s)} style={styles.smallButton}><FaEdit /></button>
            <button onClick={() => onRemove(palette.id)} style={{ ...styles.smallButton, color: '#dc2626' }}><FaTrash /></button>
          </div>
        </div>

        {isEditing ? (
          <InlineEditor palette={palette} onSave={(data) => { onEdit(palette.id, data); setIsEditing(false); }} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            <p style={{ fontSize: 13, opacity: 0.8, margin: 6 }}>Rating:</p>
            <StarRating total={5} selected={palette.rating} onRate={(r) => onRate(palette.id, r)} />

            {/* Child component swap: demonstrate the UI variant being passed down and used */}
            <div style={{ marginTop: 8 }}>
              {uiVariant === 'button' && (
                <ActionButton palette={palette} onEdit={() => setIsEditing(true)} />
              )}

              {uiVariant === 'form' && (
                <QuickInlineForm palette={palette} onEdit={(data) => onEdit(palette.id, data)} />
              )}

              {uiVariant === 'icon' && (
                <IconActions palette={palette} onEdit={() => setIsEditing(true)} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ========== InlineEditor (controlled inputs) ==========
function InlineEditor({ palette, onSave, onCancel }) {
  const [name, setName] = useState(palette.name);
  const [color, setColor] = useState(palette.color);

  return (
    <div style={styles.inlineEditor}>
      <input value={name} onChange={e => setName(e.target.value)} style={{ ...styles.input, marginBottom: 8 }} />
      <div style={styles.formRow}>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => onSave({ name, color, sample: color })} style={{ ...styles.button, marginRight: 8 }}>Save</button>
          <button onClick={onCancel} style={styles.button}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ========== StarRating (stateless controlled child) ==========
function StarRating({ total = 5, selected = 0, onRate = f => f }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
      {[...Array(total)].map((_, i) => (
        <FaStar key={i} onClick={() => onRate(i + 1)} style={styles.star(i < selected)} />
      ))}
    </div>
  );
}

// ========== Different child UI components (demonstrate passing functions down) ==========
function ActionButton({ palette, onEdit = f => f }) {
  return <button style={{ ...styles.button, marginTop: 8 }}>Open {palette.name}</button>;
}

function QuickInlineForm({ palette, onEdit = f => f }) {
  const [name, setName] = useState(palette.name);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onEdit({ name }); }} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      <input value={name} onChange={e => setName(e.target.value)} style={styles.input} />
      <button style={styles.button} type="submit">Save</button>
    </form>
  );
}

function IconActions({ palette, onEdit = f => f }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
      <button title="edit" onClick={onEdit} style={styles.smallButton}><FaEdit /></button>
    </div>
  );
}

т