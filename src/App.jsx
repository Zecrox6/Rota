import { useState, useEffect, useLayoutEffect, useRef, useMemo, useDeferredValue, memo } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  X,
  ChevronDown,
  Trash2,
  ExternalLink,
  Link2,
  Gamepad2,
  Search,
  Pencil,
  Settings,
  ArrowLeft,
  Download,
  Upload,
  ArrowUpDown,
  ArrowDownAZ,
  TrendingUp,
  Dices,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  CheckCheck,
  Copy,
  Pause,
  Play,
  MoreVertical,
  Check,
} from "lucide-react";

const LOGO_DATA_URI = "data:image/png;base64,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";

const FADE_END = { WebkitMaskImage: "linear-gradient(to right, #000 calc(100% - 14px), transparent)", maskImage: "linear-gradient(to right, #000 calc(100% - 14px), transparent)" };
const FONT = "'Roboto', system-ui, -apple-system, sans-serif";
const EASE = "cubic-bezier(0.2,0,0,1)";

// Tokens neutres (base noire AMOLED, ne change pas selon l'accent choisi)
const NEUTRAL = {
  surface: "#000000",
  surfaceContainerLow: "#0B0B0D",
  surfaceContainer: "#141316",
  surfaceContainerHigh: "#1E1C20",
  surfaceContainerHighest: "#2A272C",
  onSurface: "#E6E1E5",
  onSurfaceVariant: "#C4BFCA",
  outline: "#938F99",
  outlineVariant: "#49454F",
  tertiaryContainer: "#633B48",
  onTertiaryContainer: "#FFD8E4",
  success: "#8FD99F",
  danger: "#FF8A80",
};

// Presets d'accent (palettes tonales Material 3 sombres)
const ACCENTS = [
  { key: "violet", label: "Violet", primary: "#D0BCFF", onPrimary: "#381E72", primaryContainer: "#4F378B", onPrimaryContainer: "#EADDFF" },
  { key: "bleu", label: "Bleu", primary: "#A9C7FF", onPrimary: "#00315C", primaryContainer: "#1D4E8F", onPrimaryContainer: "#D6E3FF" },
  { key: "turquoise", label: "Turquoise", primary: "#7DDBD3", onPrimary: "#003733", primaryContainer: "#1E4F4A", onPrimaryContainer: "#9EEFE6" },
  { key: "vert", label: "Vert", primary: "#8FD99F", onPrimary: "#00390F", primaryContainer: "#1E5128", onPrimaryContainer: "#ADEBB3" },
  { key: "ambre", label: "Ambre", primary: "#FFD873", onPrimary: "#402D00", primaryContainer: "#5C4200", onPrimaryContainer: "#FFE08A" },
  { key: "corail", label: "Corail", primary: "#FFB4A8", onPrimary: "#5C0F00", primaryContainer: "#7D2C1B", onPrimaryContainer: "#FFDAD3" },
  { key: "rose", label: "Rose", primary: "#FFAEDA", onPrimary: "#5C0038", primaryContainer: "#7D2959", onPrimaryContainer: "#FFD8EA" },
  { key: "gris", label: "Gris", primary: "#E2E2E2", onPrimary: "#2E2E2E", primaryContainer: "#4A4A4A", onPrimaryContainer: "#F2F2F2" },
];

const ORDER = ["todo", "playing", "done"];

const CATEGORIES = [
  { key: "jeux", label: "Jeux" },
  { key: "lecture", label: "Lecture" },
  { key: "visionnage", label: "Visionnage" },
];
const PLATFORM_PRESETS = ["PS5", "PS4", "Switch", "PC", "Xbox", "Mobile"];
const SORT_LABELS = { manual: "Ordre perso", alpha: "A-Z", completion: "Progression" };

function normalizeCategory(cat) {
  if (cat === "spinoff") return "jeux";
  if (cat === "roman" || cat === "manga") return "lecture";
  if (cat === "serie" || cat === "anime" || cat === "films") return "visionnage";
  if (CATEGORIES.some((c) => c.key === cat)) return cat;
  return "jeux";
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function normalizeLink(link) {
  if (!link) return null;
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
}

// @@PLATFORM_START
// Version APK : stockage local du téléphone, liens et vibrations natifs (Capacitor)
const store = {
  async get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  },
};

async function openLink(rawLink) {
  const link = normalizeLink(rawLink);
  if (!link) return;
  try {
    const { Browser } = await import("@capacitor/browser");
    await Browser.open({ url: link });
  } catch (e) {
    window.open(link, "_blank", "noopener,noreferrer");
  }
}

async function haptic(kind = "light") {
  try {
    const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
    await Haptics.impact({ style: kind === "success" ? ImpactStyle.Medium : ImpactStyle.Light });
  } catch (e) {
    try {
      if (navigator.vibrate) navigator.vibrate(kind === "success" ? 40 : 10);
    } catch (e2) {}
  }
}
// @@PLATFORM_END

function highlightMatch(text, query, T) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ background: T.primaryContainer, color: T.onPrimaryContainer, borderRadius: 4 }}>
        {text.slice(idx, idx + q.length)}
      </span>
      {text.slice(idx + q.length)}
    </>
  );
}

function flatten(games) {
  return CATEGORIES.flatMap((cat) => games.filter((g) => normalizeCategory(g.category) === cat.key));
}

function nextStep(games) {
  const flat = flatten(games);
  const playing = flat.find((g) => g.status === "playing");
  if (playing) return playing;
  return flat.find((g) => g.status === "todo") || null;
}

function isFullyDone(f) {
  return f.games.length > 0 && f.games.every((g) => g.status === "done");
}

function completionPct(f) {
  return f.games.length ? f.games.filter((g) => g.status === "done").length / f.games.length : 0;
}

// Monte/démonte un bloc avec une animation d'entrée et de sortie
function useMountTransition(open, exitMs) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(open);
  useEffect(() => {
    if (open) {
      setMounted(true);
      let id2 = 0;
      const id1 = requestAnimationFrame(() => {
        id2 = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(id1);
        cancelAnimationFrame(id2);
      };
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), exitMs);
    return () => clearTimeout(t);
  }, [open, exitMs]);
  return [mounted, shown];
}

// Pliage animé : le contenu n'existe dans la page que lorsqu'il est ouvert (gros gain de fluidité)
function Collapse({ open, children, ms = 280 }) {
  const [mounted, shown] = useMountTransition(open, ms);
  if (!mounted) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: shown ? "1fr" : "0fr",
        transition: `grid-template-rows ${ms}ms ${EASE}`,
      }}
    >
      <div style={{ overflow: "hidden", minHeight: 0, opacity: shown ? 1 : 0, transition: `opacity ${ms}ms ${EASE}` }}>
        {children}
      </div>
    </div>
  );
}

// Boîte de dialogue (centre) ou feuille (bas de l'écran), façon Material 3
function Overlay({ open, onClose, T, kind = "dialog", children }) {
  const [mounted, shown] = useMountTransition(open, 240);
  const last = useRef(children);
  if (open) last.current = children;
  if (!mounted) return null;
  const sheet = kind === "sheet";
  return createPortal(
    <div
      className="rota-root"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        display: "flex",
        alignItems: sheet ? "flex-end" : "center",
        justifyContent: "center",
        padding: sheet ? 0 : 24,
        fontFamily: FONT,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.64)",
          opacity: shown ? 1 : 0,
          transition: `opacity 240ms ${EASE}`,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: sheet ? 480 : 340,
          background: sheet ? T.surfaceContainer : T.surfaceContainerHigh,
          borderRadius: sheet ? "28px 28px 0 0" : 28,
          maxHeight: sheet ? "88vh" : "calc(100vh - 48px)",
          overflowY: "auto",
          paddingBottom: sheet ? "calc(16px + env(safe-area-inset-bottom))" : 0,
          transform: shown ? "none" : sheet ? "translate3d(0,100%,0)" : "scale(0.92)",
          opacity: sheet || shown ? 1 : 0,
          transition: `transform ${sheet ? 300 : 220}ms ${EASE}, opacity 200ms ${EASE}`,
        }}
      >
        {sheet && (
          <div style={{ width: 32, height: 4, borderRadius: 2, background: T.outlineVariant, margin: "16px auto 4px" }} />
        )}
        {last.current}
      </div>
    </div>,
    document.body
  );
}

// Anneau de progression façon Google (remplace la barre en bas de carte)
const ProgressRing = memo(function ProgressRing({ value, T, size = 40 }) {
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const full = value >= 1;
  const color = full ? T.success : T.primary;
  return (
    <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", display: "block" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.surfaceContainerHighest} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value)}
          strokeOpacity={value > 0 ? 1 : 0}
          style={{ transition: `stroke-dashoffset 500ms ${EASE}, stroke 300ms ${EASE}` }}
        />
      </svg>
      <span
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          inset: 0,
          fontSize: 11,
          fontWeight: 500,
          color: full ? T.success : T.onSurface,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {full ? <Check size={16} strokeWidth={2.5} /> : Math.round(value * 100)}
      </span>
    </div>
  );
});

// Champ de saisie rempli Material 3 (utilisé dans les feuilles)
function Field({ icon, value, onChange, placeholder, T, autoFocus, onEnter }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 min-w-0" style={{ height: 52, background: T.surfaceContainerHighest }}>
      {icon}
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter && onEnter()}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none"
        style={{ color: T.onSurface, fontSize: 16 }}
      />
    </div>
  );
}

function PlatformChips({ value, onPick, T }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORM_PRESETS.map((p) => {
        const on = value === p;
        return (
          <button
            key={p}
            onClick={() => onPick(on ? "" : p)}
            className="m3-btn flex items-center gap-1 rounded-lg px-3"
            style={{
              height: 32,
              fontSize: 13,
              fontWeight: 500,
              background: on ? T.primaryContainer : "transparent",
              color: on ? T.onPrimaryContainer : T.onSurfaceVariant,
              border: `1px solid ${on ? "transparent" : T.outlineVariant}`,
            }}
          >
            {on && <Check size={14} />}
            {p}
          </button>
        );
      })}
    </div>
  );
}

// --- Une ligne de jeu (pilule) ---
const GameRow = memo(function GameRow({ g, index, fid, catKey, T, STATUS, query, dragging, justAdded, act, refs }) {
  const s = STATUS[g.status];
  return (
    <div
      ref={(el) => (refs.item.current[g.id] = el)}
      className="flex items-center gap-2 min-w-0"
      style={{
        opacity: dragging ? 0.25 : 1,
        transition: "opacity 150ms ease",
        animation: justAdded ? `itemIn 300ms ${EASE}` : undefined,
      }}
    >
      <span
        className="shrink-0 text-right"
        style={{ width: 18, fontSize: 12, color: T.onSurfaceVariant, fontVariantNumeric: "tabular-nums" }}
      >
        {index + 1}
      </span>
      <div
        onPointerDown={(e) => act.gameDown(e, fid, catKey, g)}
        onContextMenu={(e) => e.preventDefault()}
        className="flex-1 min-w-0 flex items-center gap-2 rounded-2xl pl-3"
        style={{ minHeight: 52, paddingRight: 2, background: T.surfaceContainerHigh, touchAction: "manipulation" }}
      >
        <div className="no-scrollbar min-w-0 flex-1 overflow-x-auto" style={{ whiteSpace: "nowrap", paddingRight: 10, ...FADE_END }}>
          <span style={{ fontSize: 15, color: T.onSurface, lineHeight: "20px" }}>{highlightMatch(g.name, query, T)}</span>
        </div>
        {g.platform && (
          <span
            className="shrink-0 rounded-md px-1.5"
            style={{ fontSize: 11, lineHeight: "20px", fontWeight: 500, background: T.surfaceContainerHighest, color: T.onSurfaceVariant }}
          >
            {g.platform}
          </span>
        )}
        {g.link && (
          <button
            data-no-drag
            onClick={() => openLink(g.link)}
            className="m3-btn shrink-0 flex items-center justify-center rounded-full"
            style={{ width: 28, height: 28, color: T.onSurfaceVariant }}
            aria-label="Ouvrir le lien"
          >
            <ExternalLink size={15} />
          </button>
        )}
        <button
          data-no-drag
          onClick={() => act.cycle(fid, g.id)}
          className="m3-btn press shrink-0 rounded-lg"
          style={{
            height: 28,
            minWidth: 70,
            padding: "0 8px",
            fontSize: 12,
            fontWeight: 500,
            background: s.bg,
            color: s.text,
            transition: "background-color 200ms ease, color 200ms ease, transform 120ms ease",
          }}
        >
          {s.label}
        </button>
        <button
          data-no-drag
          ref={(el) => (refs.menuBtn.current[g.id] = el)}
          onClick={() => act.openMenu(fid, g)}
          className="m3-btn shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 36, height: 36, color: T.onSurfaceVariant }}
          aria-label="Options"
        >
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
});

// --- Une carte de licence ---
const FranchiseCard = memo(function FranchiseCard(p) {
  const {
    f,
    draggable,
    T,
    STATUS,
    query,
    hideCompleted,
    showRemaining,
    isExpanded,
    newGameInput,
    newGameCat,
    newGameLink,
    newGamePlatform,
    showLink,
    showPlatform,
    collapsedKey,
    draggingId,
    justAddedGameId,
    justAdded,
    isDraggingFranchise,
    act,
    refs,
  } = p;

  const total = f.games.length;
  const done = f.games.filter((g) => g.status === "done").length;
  const q = query.trim().toLowerCase();
  const matchesInside =
    !!q && !f.name.toLowerCase().includes(q) && f.games.some((g) => g.name.toLowerCase().includes(q));
  const isOpen = isExpanded || matchesInside;
  const activeCategory = newGameCat;
  const upNext = nextStep(f.games);
  const typed = newGameInput.trim().toLowerCase();
  const isDup = !!typed && f.games.some((g) => g.name.trim().toLowerCase() === typed);
  const catLabel = CATEGORIES.find((c) => c.key === activeCategory).label;

  return (
    <div
      ref={(el) => (refs.franchise.current[f.id] = el)}
      className="rounded-3xl overflow-hidden"
      style={{
        background: T.surfaceContainer,
        opacity: isDraggingFranchise ? 0.3 : 1,
        transition: "opacity 150ms ease",
        animation: justAdded ? `itemIn 300ms ${EASE}` : undefined,
      }}
    >
      <div
        role="button"
        onClick={() => act.toggleExpand(f.id)}
        onPointerDown={draggable ? (e) => act.franchiseDown(e, f) : undefined}
        onContextMenu={(e) => e.preventDefault()}
        className="m3-btn flex items-center gap-3 min-w-0 pl-4 pr-2"
        style={{ minHeight: 72, paddingTop: 12, paddingBottom: 12, touchAction: "manipulation", cursor: "pointer" }}
      >
        <ProgressRing value={total ? done / total : 0} T={T} />
        <div className="flex flex-col min-w-0 flex-1">
          <div className="no-scrollbar overflow-x-auto" style={{ whiteSpace: "nowrap", paddingRight: 10, ...FADE_END }}>
            <span style={{ fontSize: 16, fontWeight: 500, lineHeight: "24px", color: T.onSurface }}>
              {highlightMatch(f.name, query, T)}
            </span>
          </div>
          {upNext ? (
            <span style={{ fontSize: 13, lineHeight: "18px", color: upNext.status === "playing" ? T.primary : T.onSurfaceVariant }}>
              {upNext.status === "playing" ? "En cours : " : "Prochaine étape : "}
              {upNext.name}
            </span>
          ) : total > 0 ? (
            <span style={{ fontSize: 13, lineHeight: "18px", color: T.success, fontWeight: 500 }}>Terminé ✓</span>
          ) : (
            <span style={{ fontSize: 13, lineHeight: "18px", color: T.onSurfaceVariant }}>Rien d'ajouté pour l'instant</span>
          )}
        </div>
        <button
          data-no-drag
          onClick={(e) => {
            e.stopPropagation();
            act.toggleRemaining();
          }}
          className="m3-btn shrink-0 rounded-lg px-2"
          style={{ height: 32, fontSize: 13, fontWeight: 500, color: T.onSurfaceVariant, fontVariantNumeric: "tabular-nums" }}
        >
          {showRemaining ? `${total - done} restant${total - done > 1 ? "s" : ""}` : `${done}/${total}`}
        </button>
        <span
          className="shrink-0 flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            color: T.onSurfaceVariant,
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: `transform 280ms ${EASE}`,
          }}
        >
          <ChevronDown size={20} />
        </span>
      </div>

      <Collapse open={isOpen}>
        <div className="flex flex-col gap-4 px-3 pb-3 pt-1">
          {upNext && (
            <button
              onClick={() => act.advance(f.id)}
              className="m3-btn press flex items-center justify-center gap-2 rounded-full"
              style={{ height: 40, background: T.primaryContainer, color: T.onPrimaryContainer, fontSize: 14, fontWeight: 500 }}
            >
              <CheckCheck size={18} /> Valider & passer au suivant
            </button>
          )}

          {CATEGORIES.map((cat, ci) => {
            const items = f.games.filter(
              (g) => normalizeCategory(g.category) === cat.key && (!hideCompleted || g.status !== "done")
            );
            if (items.length === 0) return null;
            const collapsed = collapsedKey[ci] === "1";
            return (
              <div key={cat.key} className="flex flex-col">
                <button
                  onClick={() => act.toggleCategory(f.id, cat.key)}
                  className="m3-btn flex items-center gap-2 w-full rounded-xl px-1"
                  style={{ height: 36 }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: T.onSurface }}>{cat.label}</span>
                  <span
                    className="rounded-full px-2"
                    style={{ fontSize: 11, lineHeight: "18px", fontWeight: 500, background: T.surfaceContainerHighest, color: T.onSurfaceVariant }}
                  >
                    {items.length}
                  </span>
                  <span className="flex-1" />
                  <span
                    className="flex items-center"
                    style={{ color: T.onSurfaceVariant, transform: collapsed ? "rotate(-90deg)" : "none", transition: `transform 240ms ${EASE}` }}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>
                <Collapse open={!collapsed} ms={240}>
                  <div className="flex flex-col gap-2 pt-1">
                    {items.map((g, i) => (
                      <GameRow
                        key={g.id}
                        g={g}
                        index={i}
                        fid={f.id}
                        catKey={cat.key}
                        T={T}
                        STATUS={STATUS}
                        query={query}
                        dragging={draggingId === g.id}
                        justAdded={justAddedGameId === g.id}
                        act={act}
                        refs={refs}
                      />
                    ))}
                  </div>
                </Collapse>
              </div>
            );
          })}

          {/* Ajout d'un élément */}
          <div className="flex flex-col gap-2">
            <div className="flex rounded-full overflow-hidden" style={{ height: 36, border: `1px solid ${T.outline}` }}>
              {CATEGORIES.map((cat, idx) => {
                const on = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => act.setNewGameCat(f.id, cat.key)}
                    className="m3-btn flex-1 min-w-0 flex items-center justify-center gap-1"
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      background: on ? T.primaryContainer : "transparent",
                      color: on ? T.onPrimaryContainer : T.onSurfaceVariant,
                      borderLeft: idx === 0 ? "none" : `1px solid ${T.outline}`,
                      transition: "background-color 200ms ease, color 200ms ease",
                    }}
                  >
                    {on && <Check size={14} />}
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 rounded-full pl-4 min-w-0" style={{ height: 48, paddingRight: 4, background: T.surfaceContainerHigh }}>
              <input
                value={newGameInput}
                onChange={(e) => act.setNewGameInput(f.id, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && act.addGame(f.id)}
                placeholder={`Ajouter à « ${catLabel} »`}
                className="flex-1 min-w-0 bg-transparent outline-none"
                style={{ color: T.onSurface, fontSize: 15 }}
              />
              <button
                onClick={() => act.toggleLinkField(f.id)}
                className="m3-btn shrink-0 rounded-full flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  background: showLink ? T.primaryContainer : "transparent",
                  color: showLink ? T.onPrimaryContainer : T.onSurfaceVariant,
                }}
                aria-label="Ajouter un lien"
              >
                <Link2 size={17} />
              </button>
              {activeCategory === "jeux" && (
                <button
                  onClick={() => act.togglePlatformField(f.id)}
                  className="m3-btn shrink-0 rounded-full flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    background: showPlatform ? T.primaryContainer : "transparent",
                    color: showPlatform ? T.onPrimaryContainer : T.onSurfaceVariant,
                  }}
                  aria-label="Ajouter une plateforme"
                >
                  <Gamepad2 size={17} />
                </button>
              )}
              <button
                onClick={() => act.addGame(f.id)}
                className="m3-btn press shrink-0 rounded-full flex items-center justify-center"
                style={{ width: 40, height: 40, background: T.primary, color: T.onPrimary }}
                aria-label="Ajouter l'élément"
              >
                <Plus size={20} />
              </button>
            </div>
            {isDup && (
              <span className="px-4" style={{ fontSize: 12, color: "#FFCC80" }}>
                Déjà présent dans cette licence
              </span>
            )}

            <Collapse open={showLink} ms={220}>
              <div className="flex items-center gap-3 rounded-full px-4" style={{ height: 44, background: T.surfaceContainerHigh }}>
                <Link2 size={15} color={T.onSurfaceVariant} className="shrink-0" />
                <input
                  value={newGameLink}
                  onChange={(e) => act.setNewGameLink(f.id, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && act.addGame(f.id)}
                  placeholder="Lien (vidéo, résumé...)"
                  className="flex-1 min-w-0 bg-transparent outline-none"
                  style={{ color: T.onSurface, fontSize: 14 }}
                />
              </div>
            </Collapse>

            <Collapse open={showPlatform && activeCategory === "jeux"} ms={220}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 rounded-full px-4" style={{ height: 44, background: T.surfaceContainerHigh }}>
                  <Gamepad2 size={15} color={T.onSurfaceVariant} className="shrink-0" />
                  <input
                    value={newGamePlatform}
                    onChange={(e) => act.setNewGamePlatform(f.id, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && act.addGame(f.id)}
                    placeholder="Plateforme (PS5, Switch, PC...)"
                    className="flex-1 min-w-0 bg-transparent outline-none"
                    style={{ color: T.onSurface, fontSize: 14 }}
                  />
                </div>
                <PlatformChips value={newGamePlatform} onPick={(v) => act.setNewGamePlatform(f.id, v)} T={T} />
              </div>
            </Collapse>
          </div>

          {/* Actions de la licence, façon barre d'actions Google Photos */}
          <div className="grid pt-2" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", borderTop: `1px solid ${T.surfaceContainerHighest}` }}>
            {[
              { icon: <Pencil size={18} />, label: "Renommer", onClick: () => act.rename(f) },
              { icon: <Copy size={18} />, label: "Dupliquer", onClick: () => act.duplicateFranchise(f) },
              { icon: f.paused ? <Play size={18} /> : <Pause size={18} />, label: f.paused ? "Reprendre" : "Pause", onClick: () => act.togglePause(f.id) },
              { icon: <Trash2 size={18} />, label: "Supprimer", onClick: () => act.askDeleteFranchise(f), danger: true },
            ].map((a) => (
              <button
                key={a.label}
                onClick={a.onClick}
                className="m3-btn flex flex-col items-center justify-center gap-1 rounded-2xl min-w-0"
                style={{ height: 56, color: a.danger ? T.danger : T.onSurfaceVariant }}
              >
                {a.icon}
                <span style={{ fontSize: 12, fontWeight: 500 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
});

function IconBtn({ onClick, label, T, children, size = 48, onDoubleClick }) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      aria-label={label}
      className="m3-btn shrink-0 flex items-center justify-center rounded-full"
      style={{ width: size, height: size, color: T.onSurfaceVariant }}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [franchises, setFranchises] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [newGameInputs, setNewGameInputs] = useState({});
  const [newGameCategory, setNewGameCategory] = useState({});
  const [newGameLink, setNewGameLink] = useState({});
  const [newGamePlatform, setNewGamePlatform] = useState({});
  const [showLinkField, setShowLinkField] = useState({});
  const [showPlatformField, setShowPlatformField] = useState({});
  const [hideCompleted, setHideCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dq = useDeferredValue(searchQuery);
  const [draggingId, setDraggingId] = useState(null);
  const [draggingFid, setDraggingFid] = useState(null);
  const [ghost, setGhost] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [editName, setEditName] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editPlatform, setEditPlatform] = useState("");
  const [accentKey, setAccentKey] = useState("violet");
  const [view, setView] = useState("home");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [justAddedGameId, setJustAddedGameId] = useState(null);
  const [justAddedFranchiseId, setJustAddedFranchiseId] = useState(null);
  const [showPaused, setShowPaused] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [sortMode, setSortMode] = useState("manual");
  const [randomPick, setRandomPick] = useState(null);
  const [diceFace, setDiceFace] = useState(1);
  const [rollId, setRollId] = useState(0);
  const [menu, setMenu] = useState(null);
  const [showRemaining, setShowRemaining] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const T = useMemo(() => ({ ...NEUTRAL, ...(ACCENTS.find((a) => a.key === accentKey) || ACCENTS[0]) }), [accentKey]);
  const STATUS = useMemo(
    () => ({
      todo: { label: "À faire", bg: T.surfaceContainerHighest, text: T.onSurfaceVariant },
      playing: { label: "En cours", bg: T.tertiaryContainer, text: T.onTertiaryContainer },
      done: { label: "Terminé", bg: T.primary, text: T.onPrimary },
    }),
    [T]
  );

  const franchisesRef = useRef(franchises);
  const loadedRef = useRef(false);
  const saveTimer = useRef(null);
  const fileInputRef = useRef(null);
  const itemRefs = useRef({});
  const franchiseRefs = useRef({});
  const menuButtonRefs = useRef({});
  const listRef = useRef(null);
  const ghostRef = useRef(null);
  const dragRef = useRef(null);
  const pendingRef = useRef(null);
  const justDraggedRef = useRef(0);
  const hideCompletedRef = useRef(hideCompleted);
  const visibleActiveRef = useRef(new Set());
  const menuOpenRef = useRef(false);
  const homeScrollRef = useRef(0);
  hideCompletedRef.current = hideCompleted;
  menuOpenRef.current = !!menu;

  const refs = useMemo(() => ({ item: itemRefs, franchise: franchiseRefs, menuBtn: menuButtonRefs }), []);

  useEffect(() => {
    franchisesRef.current = franchises;
  }, [franchises]);

  // --- Sauvegarde : regroupée (200 ms) pour ne pas bloquer les taps, et forcée quand l'app passe en arrière-plan ---
  function flushSave() {
    clearTimeout(saveTimer.current);
    saveTimer.current = null;
    if (!loadedRef.current) return;
    store.set("licences-data", JSON.stringify(franchisesRef.current));
  }
  function scheduleSave() {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flushSave, 200);
  }
  function persist(next) {
    franchisesRef.current = next;
    setFranchises(next);
    scheduleSave();
  }

  useEffect(() => {
    const onHide = () => {
      if (saveTimer.current) flushSave();
    };
    const onVis = () => document.visibilityState === "hidden" && onHide();
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const raw = await store.get("licences-data");
      let data = [];
      try {
        data = raw ? JSON.parse(raw) : [];
      } catch (e) {
        data = [];
      }
      const list = Array.isArray(data) ? data : [];
      franchisesRef.current = list;
      setFranchises(list);
      loadedRef.current = true;
      setLoaded(true);
    })();
    (async () => {
      const v = await store.get("rota-accent");
      if (v && ACCENTS.some((a) => a.key === v)) setAccentKey(v);
    })();
  }, []);

  // --- Barre du haut qui se teinte au défilement (comportement Material 3) ---
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (menuOpenRef.current) setMenu(null);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const s = window.scrollY > 4;
        setScrolled((prev) => (prev === s ? prev : s));
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Empêche la page de défiler pendant un glisser-déposer (sinon le doigt fait scroller au lieu de déplacer)
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const block = (e) => {
      if (dragRef.current && e.cancelable) e.preventDefault();
    };
    el.addEventListener("touchmove", block, { passive: false });
    return () => el.removeEventListener("touchmove", block);
  }, [view]);

  // --- Navigation Paramètres ---
  useEffect(() => {
    function onPopState() {
      setView("home");
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, view === "settings" ? 0 : homeScrollRef.current);
  }, [view]);

  function openSettings() {
    homeScrollRef.current = window.scrollY;
    try {
      window.history.pushState({ view: "settings" }, "");
    } catch (e) {}
    setView("settings");
  }

  function closeSettings() {
    try {
      if (window.history.state && window.history.state.view === "settings") {
        window.history.back();
        return;
      }
    } catch (e) {}
    setView("home");
  }

  function selectAccent(key) {
    setAccentKey(key);
    store.set("rota-accent", key);
  }

  // --- Export / import ---
  function handleExport() {
    flushSave();
    const blob = new Blob([JSON.stringify(franchisesRef.current, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rota-sauvegarde.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function handleImportFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) return;
        const current = franchisesRef.current;
        const existingNames = new Set(current.map((f) => f.name.toLowerCase()));
        const cleaned = data
          .filter((f) => f && f.name && !existingNames.has(String(f.name).toLowerCase()))
          .map((f) => ({
            id: uid(),
            name: String(f.name),
            paused: !!f.paused,
            games: Array.isArray(f.games)
              ? f.games.map((g) => ({
                  id: uid(),
                  name: g && g.name ? String(g.name) : "Sans titre",
                  status: g && ORDER.includes(g.status) ? g.status : "todo",
                  category: normalizeCategory(g && g.category),
                  link: normalizeLink(g && g.link),
                  platform: (g && g.platform) || null,
                }))
              : [],
          }));
        persist([...current, ...cleaned]);
      } catch (err) {
        console.error("Import invalide", err);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  // --- Actions sur les licences ---
  function addFranchise() {
    const name = searchQuery.trim();
    if (!name) return;
    const f = { id: uid(), name, paused: false, games: [] };
    persist([...franchisesRef.current, f]);
    setSearchQuery("");
    setExpanded((e) => ({ ...e, [f.id]: true }));
    setJustAddedFranchiseId(f.id);
    setTimeout(() => setJustAddedFranchiseId((cur) => (cur === f.id ? null : cur)), 400);
    setTimeout(() => {
      const el = franchiseRefs.current[f.id];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  }

  function duplicateFranchise(f) {
    const list = franchisesRef.current;
    const copy = { id: uid(), name: `${f.name} (copie)`, paused: false, games: f.games.map((g) => ({ ...g, id: uid(), status: "todo" })) };
    const idx = list.findIndex((fr) => fr.id === f.id);
    const next = [...list];
    next.splice(idx + 1, 0, copy);
    persist(next);
    setJustAddedFranchiseId(copy.id);
    setTimeout(() => setJustAddedFranchiseId((cur) => (cur === copy.id ? null : cur)), 400);
  }

  function togglePause(id) {
    persist(franchisesRef.current.map((f) => (f.id === id ? { ...f, paused: !f.paused } : f)));
  }

  function openRename(f) {
    setEditName(f.name);
    setSheet({ type: "rename", fid: f.id });
  }

  function openEditGame(fid, g) {
    setEditName(g.name);
    setEditLink(g.link || "");
    setEditPlatform(g.platform || "");
    setSheet({ type: "editGame", fid, gid: g.id, category: normalizeCategory(g.category) });
  }

  function commitSheet() {
    if (!sheet) return;
    const name = editName.trim();
    if (!name) {
      setSheet(null);
      return;
    }
    if (sheet.type === "rename") {
      persist(franchisesRef.current.map((f) => (f.id === sheet.fid ? { ...f, name } : f)));
    } else {
      const link = normalizeLink(editLink.trim());
      const platform = editPlatform.trim();
      persist(
        franchisesRef.current.map((f) =>
          f.id !== sheet.fid
            ? f
            : { ...f, games: f.games.map((g) => (g.id === sheet.gid ? { ...g, name, link: link || null, platform: platform || null } : g)) }
        )
      );
    }
    setSheet(null);
  }

  function confirmDeleteNow() {
    if (!confirmDelete) return;
    if (confirmDelete.type === "franchise") {
      persist(franchisesRef.current.filter((f) => f.id !== confirmDelete.franchiseId));
    } else {
      persist(
        franchisesRef.current.map((f) =>
          f.id === confirmDelete.franchiseId ? { ...f, games: f.games.filter((g) => g.id !== confirmDelete.gameId) } : f
        )
      );
    }
    setConfirmDelete(null);
  }

  // --- Actions sur les jeux ---
  function addGame(fid) {
    const name = (newGameInputs[fid] || "").trim();
    if (!name) return;
    const category = newGameCategory[fid] || "jeux";
    const link = normalizeLink((newGameLink[fid] || "").trim());
    const platform = category === "jeux" ? (newGamePlatform[fid] || "").trim() : "";
    const newId = uid();
    persist(
      franchisesRef.current.map((f) =>
        f.id === fid
          ? { ...f, games: [...f.games, { id: newId, name, status: "todo", category, link: link || null, platform: platform || null }] }
          : f
      )
    );
    setNewGameInputs((s) => ({ ...s, [fid]: "" }));
    setNewGameLink((s) => ({ ...s, [fid]: "" }));
    setNewGamePlatform((s) => ({ ...s, [fid]: "" }));
    setShowLinkField((s) => ({ ...s, [fid]: false }));
    setShowPlatformField((s) => ({ ...s, [fid]: false }));
    setCollapsedCategories((s) => ({ ...s, [`${fid}:${category}`]: false }));
    setJustAddedGameId(newId);
    setTimeout(() => setJustAddedGameId((cur) => (cur === newId ? null : cur)), 400);
  }

  function duplicateGame(fid, gid) {
    let newId = null;
    persist(
      franchisesRef.current.map((f) => {
        if (f.id !== fid) return f;
        const idx = f.games.findIndex((g) => g.id === gid);
        if (idx === -1) return f;
        newId = uid();
        const games = [...f.games];
        games.splice(idx + 1, 0, { ...f.games[idx], id: newId, status: "todo" });
        return { ...f, games };
      })
    );
    if (newId) {
      const id = newId;
      setJustAddedGameId(id);
      setTimeout(() => setJustAddedGameId((cur) => (cur === id ? null : cur)), 400);
    }
  }

  function cycleStatus(fid, gid) {
    const list = franchisesRef.current;
    const before = list.find((f) => f.id === fid);
    const wasFullyDone = before ? isFullyDone(before) : false;
    const next = list.map((f) =>
      f.id !== fid
        ? f
        : { ...f, games: f.games.map((g) => (g.id !== gid ? g : { ...g, status: ORDER[(ORDER.indexOf(g.status) + 1) % ORDER.length] })) }
    );
    persist(next);
    const after = next.find((f) => f.id === fid);
    if (after && !wasFullyDone && isFullyDone(after)) haptic("success");
  }

  function advanceFranchise(fid) {
    const list = franchisesRef.current;
    const f = list.find((fr) => fr.id === fid);
    if (!f) return;
    const wasFullyDone = isFullyDone(f);
    const current = nextStep(f.games);
    if (!current) return;
    const flat = flatten(f.games);
    const idx = flat.findIndex((g) => g.id === current.id);
    let followUp = null;
    for (let i = idx + 1; i < flat.length; i++) {
      if (flat[i].status !== "done") {
        followUp = flat[i];
        break;
      }
    }
    const games = f.games.map((g) => {
      if (g.id === current.id) return { ...g, status: "done" };
      if (followUp && g.id === followUp.id) return { ...g, status: "playing" };
      return g;
    });
    const next = list.map((fr) => (fr.id === fid ? { ...fr, games } : fr));
    persist(next);
    const after = next.find((fr) => fr.id === fid);
    if (after && !wasFullyDone && isFullyDone(after)) haptic("success");
    else haptic("light");
  }

  function openMenu(fid, g) {
    const el = menuButtonRefs.current[g.id];
    const r = el ? el.getBoundingClientRect() : null;
    if (!r) return;
    const h = 3 * 48 + 16;
    const up = r.bottom + h > window.innerHeight - 8;
    setMenu({
      fid,
      g,
      right: Math.max(8, window.innerWidth - r.right),
      top: up ? Math.max(8, r.top - h - 4) : r.bottom + 4,
      up,
    });
  }

  // --- Glisser-déposer (appui long) ---
  // Le "fantôme" est déplacé directement en CSS (sans re-rendu React) et la liste n'est réordonnée
  // que lorsque la position change vraiment : c'est ce qui rend le déplacement fluide.
  function cancelPending() {
    if (pendingRef.current) {
      clearTimeout(pendingRef.current.timer);
      pendingRef.current.cleanup();
    }
  }

  function startPending(e, onActivate) {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest("[data-no-drag]")) return;
    if (dragRef.current) return;
    cancelPending();
    const sx = e.clientX;
    const sy = e.clientY;
    const pid = e.pointerId;
    const el = e.currentTarget;
    function cleanup() {
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      pendingRef.current = null;
    }
    const timer = setTimeout(() => {
      cleanup();
      try {
        el.setPointerCapture(pid);
      } catch (err) {}
      onActivate(sy);
      if (!dragRef.current) return;
      // Suivi au niveau de la fenêtre : si React déplace l'élément touché dans la page,
      // on ne perd plus le doigt (c'était la cause des pilules qui « restaient collées »).
      const onMove = (ev) => {
        if (ev.pointerId === pid) dragMove(ev);
      };
      const onUp = (ev) => {
        if (ev.pointerId !== pid) return;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        dragEnd();
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      haptic("light");
    }, 350);
    function mv(ev) {
      if (ev.pointerId !== pid) return;
      if (Math.abs(ev.clientX - sx) > 8 || Math.abs(ev.clientY - sy) > 8) {
        clearTimeout(timer);
        cleanup();
      }
    }
    function end(ev) {
      if (ev.pointerId !== pid) return;
      clearTimeout(timer);
      cleanup();
    }
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    pendingRef.current = { timer, cleanup };
  }

  function gameDown(e, fid, catKey, g) {
    startPending(e, (sy) => {
      const row = itemRefs.current[g.id];
      const pill = row ? row.children[1] : null;
      const r = pill ? pill.getBoundingClientRect() : null;
      dragRef.current = { type: "game", fid, catKey, id: g.id, startY: sy };
      setDraggingId(g.id);
      setMenu(null);
      if (r) setGhost({ type: "game", name: g.name, status: g.status, left: r.left, top: r.top, width: r.width, height: r.height });
    });
  }

  function franchiseDown(e, f) {
    startPending(e, (sy) => {
      const card = franchiseRefs.current[f.id];
      const header = card ? card.firstChild : null;
      const r = header ? header.getBoundingClientRect() : null;
      dragRef.current = { type: "franchise", id: f.id, startY: sy };
      setDraggingFid(f.id);
      if (r) setGhost({ type: "franchise", name: f.name, ratio: completionPct(f), left: r.left, top: r.top, width: r.width, height: r.height });
    });
  }

  function visibleGameIds(f, catKey) {
    return f.games
      .filter((g) => normalizeCategory(g.category) === catKey && (!hideCompletedRef.current || g.status !== "done"))
      .map((g) => g.id);
  }

  // Position finale = nombre d'autres éléments dont le milieu est au-dessus du doigt
  function targetIndex(otherIds, getEl, y) {
    let k = 0;
    for (const id of otherIds) {
      const el = getEl(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (r.top + r.height / 2 < y) k++;
    }
    return k;
  }

  function insertAmong(rest, moved, visibleOthers, k) {
    if (visibleOthers.length === 0) return null;
    let at;
    if (k < visibleOthers.length) at = rest.findIndex((x) => x.id === visibleOthers[k]);
    else at = rest.findIndex((x) => x.id === visibleOthers[visibleOthers.length - 1]) + 1;
    if (at < 0) return null;
    const out = [...rest];
    out.splice(at, 0, moved);
    return out;
  }

  function dragMove(e) {
    const d = dragRef.current;
    if (!d) return;
    const id = d.id;
    const dy = e.clientY - d.startY;
    if (ghostRef.current) ghostRef.current.style.transform = `translate3d(0, ${dy}px, 0)`;
    const list = franchisesRef.current;

    if (d.type === "game") {
      const f = list.find((x) => x.id === d.fid);
      if (!f) return;
      const visible = visibleGameIds(f, d.catKey);
      const others = visible.filter((x) => x !== id);
      const k = targetIndex(others, (x) => itemRefs.current[x], e.clientY);
      if (k === visible.indexOf(id)) return;
      const catItems = f.games.filter((g) => normalizeCategory(g.category) === d.catKey);
      const moved = catItems.find((g) => g.id === id);
      const reordered = insertAmong(catItems.filter((g) => g.id !== id), moved, others, k);
      if (!reordered) return;
      const games = CATEGORIES.flatMap((c) =>
        c.key === d.catKey ? reordered : f.games.filter((g) => normalizeCategory(g.category) === c.key)
      );
      const next = list.map((x) => (x.id === d.fid ? { ...x, games } : x));
      franchisesRef.current = next;
      setFranchises(next);
    } else {
      const visibleSet = visibleActiveRef.current;
      const visible = list.filter((f) => visibleSet.has(f.id)).map((f) => f.id);
      const others = visible.filter((x) => x !== id);
      const k = targetIndex(others, (x) => franchiseRefs.current[x], e.clientY);
      if (k === visible.indexOf(id)) return;
      const moved = list.find((f) => f.id === id);
      const next = insertAmong(list.filter((f) => f.id !== id), moved, others, k);
      if (!next) return;
      franchisesRef.current = next;
      setFranchises(next);
    }
  }

  function dragEnd() {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    justDraggedRef.current = Date.now();
    setDraggingId(null);
    setDraggingFid(null);
    setGhost(null);
    scheduleSave();
  }

  // --- Dé / navigation ---
  function goToItem(fid, gid) {
    setRandomPick(null);
    setExpanded((e) => ({ ...e, [fid]: true }));
    const game = franchisesRef.current.find((f) => f.id === fid)?.games.find((g) => g.id === gid);
    if (game) setCollapsedCategories((s) => ({ ...s, [`${fid}:${normalizeCategory(game.category)}`]: false }));
    setTimeout(() => {
      const el = itemRefs.current[gid];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 340);
  }

  function pickRandom() {
    setDiceFace(Math.floor(Math.random() * 6) + 1);
    setRollId((id) => id + 1);
    const candidates = [];
    franchisesRef.current.forEach((f) => {
      if (f.paused) return;
      f.games.forEach((g) => {
        if (g.status === "todo") candidates.push({ franchiseId: f.id, franchiseName: f.name, gameId: g.id, gameName: g.name });
      });
    });
    setRandomPick(candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : { empty: true });
  }

  // --- Données dérivées (mémorisées) ---
  const stats = useMemo(() => {
    let totalGames = 0;
    let totalDone = 0;
    let fullyDone = 0;
    for (const f of franchises) {
      totalGames += f.games.length;
      const d = f.games.filter((g) => g.status === "done").length;
      totalDone += d;
      if (f.games.length > 0 && d === f.games.length) fullyDone++;
    }
    return { totalGames, totalDone, fullyDone, pct: totalGames ? Math.round((totalDone / totalGames) * 100) : 0 };
  }, [franchises]);

  const { activeFranchises, pausedFranchises, searchedCount } = useMemo(() => {
    const q = dq.trim().toLowerCase();
    const searched = q
      ? franchises.filter((f) => f.name.toLowerCase().includes(q) || f.games.some((g) => g.name.toLowerCase().includes(q)))
      : franchises;
    const active = searched.filter((f) => !f.paused);
    const sorted =
      sortMode === "alpha"
        ? [...active].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
        : sortMode === "completion"
        ? [...active].sort((a, b) => completionPct(b) - completionPct(a))
        : active;
    return { activeFranchises: sorted, pausedFranchises: searched.filter((f) => f.paused), searchedCount: searched.length };
  }, [franchises, dq, sortMode]);

  visibleActiveRef.current = new Set(activeFranchises.map((f) => f.id));

  function jumpToPlaying() {
    for (const f of activeFranchises) {
      const playing = f.games.find((g) => g.status === "playing");
      if (playing) {
        goToItem(f.id, playing.id);
        return;
      }
    }
  }

  function toggleAll() {
    const anyOpen = activeFranchises.some((f) => expanded[f.id]);
    const next = {};
    activeFranchises.forEach((f) => (next[f.id] = !anyOpen));
    setExpanded((e) => ({ ...e, ...next }));
  }

  // --- Actions stables passées aux cartes (évite de re-rendre toutes les cartes à chaque frappe) ---
  const actRef = useRef(null);
  actRef.current = {
    toggleExpand: (fid) => {
      if (Date.now() - justDraggedRef.current < 400) return;
      setExpanded((e) => ({ ...e, [fid]: !e[fid] }));
    },
    toggleRemaining: () => setShowRemaining((v) => !v),
    toggleCategory: (fid, catKey) => setCollapsedCategories((s) => ({ ...s, [`${fid}:${catKey}`]: !s[`${fid}:${catKey}`] })),
    franchiseDown,
    gameDown,
    cycle: cycleStatus,
    advance: advanceFranchise,
    openMenu,
    addGame,
    setNewGameInput: (fid, v) => setNewGameInputs((s) => ({ ...s, [fid]: v })),
    setNewGameCat: (fid, v) => setNewGameCategory((s) => ({ ...s, [fid]: v })),
    setNewGameLink: (fid, v) => setNewGameLink((s) => ({ ...s, [fid]: v })),
    setNewGamePlatform: (fid, v) => setNewGamePlatform((s) => ({ ...s, [fid]: v })),
    toggleLinkField: (fid) => setShowLinkField((s) => ({ ...s, [fid]: !s[fid] })),
    togglePlatformField: (fid) => setShowPlatformField((s) => ({ ...s, [fid]: !s[fid] })),
    rename: openRename,
    duplicateFranchise,
    togglePause,
    askDeleteFranchise: (f) => setConfirmDelete({ type: "franchise", franchiseId: f.id, label: f.name }),
  };
  const act = useMemo(() => new Proxy({}, { get: (_, k) => (...a) => actRef.current[k](...a) }), []);

  function cardProps(f, draggable) {
    const has = (id) => !!id && f.games.some((g) => g.id === id);
    return {
      f,
      draggable,
      T,
      STATUS,
      query: dq,
      hideCompleted,
      showRemaining,
      isExpanded: !!expanded[f.id],
      newGameInput: newGameInputs[f.id] || "",
      newGameCat: newGameCategory[f.id] || "jeux",
      newGameLink: newGameLink[f.id] || "",
      newGamePlatform: newGamePlatform[f.id] || "",
      showLink: !!showLinkField[f.id],
      showPlatform: !!showPlatformField[f.id],
      collapsedKey: CATEGORIES.map((c) => (collapsedCategories[`${f.id}:${c.key}`] ? "1" : "0")).join(""),
      draggingId: has(draggingId) ? draggingId : null,
      justAddedGameId: has(justAddedGameId) ? justAddedGameId : null,
      justAdded: justAddedFranchiseId === f.id,
      isDraggingFranchise: draggingFid === f.id,
      act,
      refs,
    };
  }

  const DiceIcon = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][diceFace - 1];
  const sheetFranchise = sheet ? franchises.find((f) => f.id === sheet.fid) : null;

  return (
    <div className="rota-root min-h-screen w-full" style={{ background: T.surface, fontFamily: FONT, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        html, body { background: #000; margin: 0; -webkit-tap-highlight-color: transparent; overscroll-behavior-y: none; }
        .rota-root { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; -webkit-font-smoothing: antialiased; }
        .rota-root input { -webkit-user-select: text; user-select: text; }
        .rota-root button { -webkit-tap-highlight-color: transparent; }
        input::placeholder { color: ${T.onSurfaceVariant}; opacity: 0.7; }
        .m3-btn { position: relative; overflow: hidden; isolation: isolate; }
        .m3-btn::after { content: ""; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity 200ms ease; pointer-events: none; border-radius: inherit; }
        .m3-btn:active::after { opacity: 0.12; transition-duration: 40ms; }
        @media (hover: hover) { .m3-btn:hover::after { opacity: 0.08; } }
        .press { transition: transform 120ms ease; }
        .press:active { transform: scale(0.96); }
        @keyframes popIn { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
        @keyframes diceRoll { 0% { transform: rotate(0deg) scale(0.5); opacity: 0.4; } 60% { transform: rotate(300deg) scale(1.15); opacity: 1; } 100% { transform: rotate(360deg) scale(1); } }
        @keyframes itemIn { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: none; } }
        @keyframes viewIn { from { opacity: 0; transform: translate3d(24px,0,0); } to { opacity: 1; transform: none; } }
        @keyframes homeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes liftIn { from { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); } to { transform: scale(1.03); box-shadow: 0 12px 32px rgba(0,0,0,0.6); } }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) { .rota-root *, .rota-root *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; } }
      `}</style>

      {view === "home" ? (
        <div key="home" style={{ animation: "homeIn 200ms ease" }}>
          {/* Barre du haut façon Play Store : logo + nom à gauche, paramètres à droite */}
          <header
            className="sticky top-0 z-30"
            style={{
              background: scrolled ? T.surfaceContainer : T.surface,
              transition: "background-color 220ms ease",
              paddingTop: "env(safe-area-inset-top)",
            }}
          >
            <div className="mx-auto w-full max-w-md flex items-center gap-3 pl-4 pr-1" style={{ height: 64 }}>
              <img src={LOGO_DATA_URI} alt="" width={32} height={32} draggable={false} style={{ borderRadius: 10, display: "block" }} />
              <span
                onDoubleClick={toggleAll}
                className="flex-1 min-w-0"
                style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.2px", color: T.onSurface }}
              >
                Rota
              </span>
              <IconBtn onClick={openSettings} label="Paramètres" T={T}>
                <Settings size={22} />
              </IconBtn>
            </div>
          </header>

          <main className="mx-auto w-full max-w-md px-4" style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom))" }}>
            {/* Barre de recherche / ajout */}
            <div className="flex items-center gap-3 rounded-full pl-4 min-w-0 mt-1" style={{ height: 56, paddingRight: 8, background: T.surfaceContainerHigh }}>
              <Search size={22} color={T.onSurfaceVariant} className="shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFranchise()}
                placeholder="Rechercher ou ajouter une licence"
                className="flex-1 min-w-0 bg-transparent outline-none"
                style={{ color: T.onSurface, fontSize: 16 }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="m3-btn shrink-0 rounded-full flex items-center justify-center"
                  style={{ width: 36, height: 36, color: T.onSurfaceVariant }}
                  aria-label="Effacer"
                >
                  <X size={18} />
                </button>
              )}
              <button
                onClick={addFranchise}
                className="m3-btn press shrink-0 rounded-full flex items-center justify-center"
                style={{ width: 40, height: 40, background: T.primary, color: T.onPrimary }}
                aria-label="Ajouter la licence"
              >
                <Plus size={22} />
              </button>
            </div>

            {/* Puces de filtre, façon Play Store */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button
                onClick={() => setSortMode((m) => (m === "manual" ? "alpha" : m === "alpha" ? "completion" : "manual"))}
                className="m3-btn shrink-0 flex items-center gap-1.5 rounded-lg"
                style={{
                  height: 32,
                  padding: "0 10px",
                  fontSize: 13,
                  fontWeight: 500,
                  background: sortMode !== "manual" ? T.primaryContainer : "transparent",
                  color: sortMode !== "manual" ? T.onPrimaryContainer : T.onSurfaceVariant,
                  border: `1px solid ${sortMode !== "manual" ? "transparent" : T.outlineVariant}`,
                }}
              >
                {sortMode === "alpha" ? <ArrowDownAZ size={16} /> : sortMode === "completion" ? <TrendingUp size={16} /> : <ArrowUpDown size={16} />}
                {SORT_LABELS[sortMode]}
              </button>
              <button
                onClick={() => setHideCompleted((h) => !h)}
                className="m3-btn shrink-0 flex items-center gap-1.5 rounded-lg"
                style={{
                  height: 32,
                  padding: "0 10px",
                  fontSize: 13,
                  fontWeight: 500,
                  background: hideCompleted ? T.primaryContainer : "transparent",
                  color: hideCompleted ? T.onPrimaryContainer : T.onSurfaceVariant,
                  border: `1px solid ${hideCompleted ? "transparent" : T.outlineVariant}`,
                }}
              >
                {hideCompleted && <Check size={16} />}
                Masquer terminés
              </button>
              <button
                onClick={pickRandom}
                className="m3-btn shrink-0 flex items-center gap-1.5 rounded-lg"
                style={{ height: 32, padding: "0 10px", fontSize: 13, fontWeight: 500, color: T.onSurfaceVariant, border: `1px solid ${T.outlineVariant}` }}
              >
                <Dices size={16} />
                Au hasard
              </button>
            </div>

            {/* Résumé global */}
            {franchises.length > 0 && (
              <button
                onClick={jumpToPlaying}
                className="m3-btn w-full text-left rounded-3xl p-4 mt-4 flex flex-col gap-3"
                style={{ background: T.surfaceContainer, color: T.onSurface }}
              >
                <div className="flex items-baseline justify-between gap-3 w-full">
                  <span style={{ fontSize: 16, fontWeight: 500 }}>
                    {stats.totalDone}/{stats.totalGames} jeux terminés
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 500, color: T.primary, fontVariantNumeric: "tabular-nums" }}>{stats.pct} %</span>
                </div>
                <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: T.surfaceContainerHighest }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${stats.pct}%`, background: T.primary, transition: `width 500ms ${EASE}` }}
                  />
                </div>
                <span style={{ fontSize: 13, color: T.onSurfaceVariant }}>
                  {franchises.length} licence{franchises.length !== 1 ? "s" : ""}
                  {stats.fullyDone > 0 && (
                    <span style={{ color: T.success }}>
                      {" "}
                      · {stats.fullyDone} terminée{stats.fullyDone > 1 ? "s" : ""} à 100 % ✓
                    </span>
                  )}
                </span>
              </button>
            )}

            {loaded && franchises.length === 0 && (
              <div className="flex flex-col items-center text-center gap-3 px-6" style={{ paddingTop: 72 }}>
                <img src={LOGO_DATA_URI} alt="" width={64} height={64} draggable={false} style={{ borderRadius: 18, opacity: 0.9 }} />
                <span style={{ fontSize: 18, fontWeight: 500, color: T.onSurface }}>Aucune licence pour l'instant</span>
                <span style={{ fontSize: 14, color: T.onSurfaceVariant, lineHeight: "20px" }}>
                  Tape le nom d'une licence dans la barre en haut, puis appuie sur +.
                </span>
              </div>
            )}
            {loaded && franchises.length > 0 && searchedCount === 0 && (
              <p className="text-center" style={{ fontSize: 14, color: T.onSurfaceVariant, padding: "40px 16px" }}>
                Aucune licence ne correspond à « {searchQuery} ». Appuie sur + pour la créer.
              </p>
            )}

            {activeFranchises.length > 0 && (
              <div className="flex items-center gap-2 px-1" style={{ marginTop: 24, marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: T.onSurface }}>Tes licences</span>
                <span style={{ fontSize: 14, color: T.onSurfaceVariant }}>{activeFranchises.length}</span>
              </div>
            )}

            <div ref={listRef}>
              <div className="flex flex-col gap-3">
                {activeFranchises.map((f) => (
                  <FranchiseCard key={f.id} {...cardProps(f, sortMode === "manual")} />
                ))}
              </div>

              {pausedFranchises.length > 0 && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowPaused((v) => !v)}
                    className="m3-btn flex items-center gap-2 rounded-xl px-1 w-full"
                    style={{ height: 40, color: T.onSurfaceVariant }}
                  >
                    <Pause size={16} />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>En pause</span>
                    <span style={{ fontSize: 14 }}>{pausedFranchises.length}</span>
                    <span className="flex-1" />
                    <span className="flex items-center" style={{ transform: showPaused ? "rotate(180deg)" : "none", transition: `transform 280ms ${EASE}` }}>
                      <ChevronDown size={20} />
                    </span>
                  </button>
                  <Collapse open={showPaused}>
                    <div className="flex flex-col gap-3 pt-2">
                      {pausedFranchises.map((f) => (
                        <FranchiseCard key={f.id} {...cardProps(f, false)} />
                      ))}
                    </div>
                  </Collapse>
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <div key="settings" style={{ animation: `viewIn 260ms ${EASE}` }}>
          <header
            className="sticky top-0 z-30"
            style={{ background: scrolled ? T.surfaceContainer : T.surface, transition: "background-color 220ms ease", paddingTop: "env(safe-area-inset-top)" }}
          >
            <div className="mx-auto w-full max-w-md flex items-center gap-1 px-1" style={{ height: 64 }}>
              <IconBtn onClick={closeSettings} label="Retour" T={T}>
                <ArrowLeft size={22} color={T.onSurface} />
              </IconBtn>
              <span style={{ fontSize: 22, fontWeight: 400, color: T.onSurface }}>Paramètres</span>
            </div>
          </header>

          <main className="mx-auto w-full max-w-md px-4" style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom))" }}>
            <div className="px-4" style={{ fontSize: 14, fontWeight: 500, color: T.primary, margin: "8px 0 8px" }}>
              Apparence
            </div>
            <div className="rounded-3xl p-4" style={{ background: T.surfaceContainer }}>
              <div style={{ fontSize: 16, color: T.onSurface, marginBottom: 16 }}>Couleur d'accent</div>
              <div className="grid gap-y-4" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", justifyItems: "center" }}>
                {ACCENTS.map((a) => {
                  const on = accentKey === a.key;
                  return (
                    <button key={a.key} onClick={() => selectAccent(a.key)} aria-label={a.label} className="press flex flex-col items-center gap-2">
                      <span
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: 44,
                          height: 44,
                          background: a.primary,
                          color: a.onPrimary,
                          boxShadow: on ? `0 0 0 3px ${T.surfaceContainer}, 0 0 0 5px ${a.primary}` : "none",
                          transition: "box-shadow 200ms ease",
                        }}
                      >
                        {on && <Check size={20} strokeWidth={2.5} />}
                      </span>
                      <span style={{ fontSize: 12, color: on ? T.onSurface : T.onSurfaceVariant }}>{a.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-4" style={{ fontSize: 14, fontWeight: 500, color: T.primary, margin: "24px 0 8px" }}>
              Données
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ background: T.surfaceContainer }}>
              {[
                { icon: <Download size={22} />, title: "Exporter mes données", sub: "Sauvegarde tout dans un fichier", onClick: handleExport },
                {
                  icon: <Upload size={22} />,
                  title: "Importer une sauvegarde",
                  sub: "Ajoute les licences absentes, n'écrase rien",
                  onClick: () => fileInputRef.current && fileInputRef.current.click(),
                },
              ].map((it) => (
                <button
                  key={it.title}
                  onClick={it.onClick}
                  className="m3-btn w-full flex items-center gap-4 px-4 text-left"
                  style={{ minHeight: 72, color: T.onSurface }}
                >
                  <span className="shrink-0" style={{ color: T.onSurfaceVariant }}>
                    {it.icon}
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span style={{ fontSize: 16 }}>{it.title}</span>
                    <span style={{ fontSize: 14, color: T.onSurfaceVariant }}>{it.sub}</span>
                  </span>
                </button>
              ))}
              <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImportFile} />
            </div>

            <div className="flex items-center justify-center gap-2" style={{ marginTop: 40 }}>
              <img src={LOGO_DATA_URI} alt="" width={20} height={20} draggable={false} style={{ borderRadius: 6 }} />
              <span style={{ fontSize: 13, color: T.onSurfaceVariant }}>Rota</span>
            </div>
          </main>
        </div>
      )}

      {/* Fantôme du glisser-déposer */}
      {ghost &&
        createPortal(
          <div
            ref={ghostRef}
            className="rota-root"
            style={{
              position: "fixed",
              left: ghost.left,
              top: ghost.top,
              width: ghost.width,
              height: ghost.height,
              zIndex: 60,
              pointerEvents: "none",
              willChange: "transform",
              fontFamily: FONT,
            }}
          >
            <div
              className="w-full h-full flex items-center gap-3 min-w-0"
              style={{
                padding: ghost.type === "game" ? "0 12px" : "0 16px",
                borderRadius: ghost.type === "game" ? 16 : 24,
                background: T.surfaceContainerHighest,
                animation: `liftIn 180ms ${EASE} forwards`,
              }}
            >
              {ghost.type === "franchise" && <ProgressRing value={ghost.ratio} T={T} />}
              <span className="flex-1 min-w-0 truncate" style={{ fontSize: ghost.type === "game" ? 15 : 16, fontWeight: ghost.type === "game" ? 400 : 500, color: T.onSurface }}>
                {ghost.name}
              </span>
              {ghost.type === "game" && (
                <span
                  className="shrink-0 rounded-lg flex items-center justify-center"
                  style={{ height: 28, minWidth: 70, padding: "0 8px", fontSize: 12, fontWeight: 500, background: STATUS[ghost.status].bg, color: STATUS[ghost.status].text }}
                >
                  {STATUS[ghost.status].label}
                </span>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* Menu ⋮ d'une pilule (rendu par-dessus tout, jamais coupé) */}
      {menu &&
        createPortal(
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 75 }} onClick={() => setMenu(null)} />
            <div
              className="rota-root flex flex-col rounded-2xl overflow-hidden"
              style={{
                position: "fixed",
                top: menu.top,
                right: menu.right,
                zIndex: 80,
                minWidth: 184,
                padding: "8px 0",
                background: T.surfaceContainerHighest,
                boxShadow: "0 8px 28px rgba(0,0,0,0.55)",
                animation: `popIn 160ms ${EASE}`,
                transformOrigin: menu.up ? "bottom right" : "top right",
                fontFamily: FONT,
              }}
            >
              {[
                { icon: <Pencil size={18} />, label: "Modifier", onClick: () => openEditGame(menu.fid, menu.g) },
                { icon: <Copy size={18} />, label: "Dupliquer", onClick: () => duplicateGame(menu.fid, menu.g.id) },
                {
                  icon: <Trash2 size={18} />,
                  label: "Supprimer",
                  danger: true,
                  onClick: () => setConfirmDelete({ type: "game", franchiseId: menu.fid, gameId: menu.g.id, label: menu.g.name }),
                },
              ].map((it) => (
                <button
                  key={it.label}
                  onClick={() => {
                    setMenu(null);
                    it.onClick();
                  }}
                  className="m3-btn flex items-center gap-3 px-4 text-left"
                  style={{ height: 48, fontSize: 15, color: it.danger ? T.danger : T.onSurface }}
                >
                  <span style={{ color: it.danger ? T.danger : T.onSurfaceVariant, display: "flex" }}>{it.icon}</span>
                  {it.label}
                </button>
              ))}
            </div>
          </>,
          document.body
        )}

      {/* Feuille de modification (jeu ou nom de licence) */}
      <Overlay open={!!sheet} onClose={() => setSheet(null)} T={T} kind="sheet">
        {sheet && (
          <div className="flex flex-col gap-3 px-6 pt-2">
            <span style={{ fontSize: 22, color: T.onSurface, marginBottom: 4 }}>
              {sheet.type === "rename" ? "Renommer la licence" : "Modifier"}
            </span>
            {sheet.type === "editGame" && sheetFranchise && (
              <span style={{ fontSize: 14, color: T.onSurfaceVariant, marginTop: -8 }}>{sheetFranchise.name}</span>
            )}
            <Field value={editName} onChange={setEditName} placeholder="Nom" T={T} autoFocus onEnter={commitSheet} />
            {sheet.type === "editGame" && (
              <>
                <Field
                  icon={<Link2 size={18} color={T.onSurfaceVariant} className="shrink-0" />}
                  value={editLink}
                  onChange={setEditLink}
                  placeholder="Lien (optionnel)"
                  T={T}
                  onEnter={commitSheet}
                />
                {sheet.category === "jeux" && (
                  <>
                    <Field
                      icon={<Gamepad2 size={18} color={T.onSurfaceVariant} className="shrink-0" />}
                      value={editPlatform}
                      onChange={setEditPlatform}
                      placeholder="Plateforme (optionnel)"
                      T={T}
                      onEnter={commitSheet}
                    />
                    <PlatformChips value={editPlatform} onPick={setEditPlatform} T={T} />
                  </>
                )}
              </>
            )}
            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                onClick={() => setSheet(null)}
                className="m3-btn rounded-full px-4"
                style={{ height: 40, fontSize: 14, fontWeight: 500, color: T.primary }}
              >
                Annuler
              </button>
              <button
                onClick={commitSheet}
                className="m3-btn press rounded-full px-6"
                style={{ height: 40, fontSize: 14, fontWeight: 500, background: T.primary, color: T.onPrimary }}
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </Overlay>

      {/* Confirmation de suppression */}
      <Overlay open={!!confirmDelete} onClose={() => setConfirmDelete(null)} T={T}>
        {confirmDelete && (
          <div className="p-6 flex flex-col gap-4">
            <span style={{ fontSize: 22, color: T.onSurface, lineHeight: "28px" }}>
              Supprimer {confirmDelete.type === "franchise" ? "la licence" : "l'élément"} ?
            </span>
            <span style={{ fontSize: 14, color: T.onSurfaceVariant, lineHeight: "20px" }}>
              « {confirmDelete.label} » sera supprimé{confirmDelete.type === "franchise" ? "e avec tout son contenu" : ""}. Cette action est irréversible.
            </span>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="m3-btn rounded-full px-4"
                style={{ height: 40, fontSize: 14, fontWeight: 500, color: T.primary }}
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteNow}
                className="m3-btn rounded-full px-4"
                style={{ height: 40, fontSize: 14, fontWeight: 500, color: T.danger }}
              >
                Supprimer
              </button>
            </div>
          </div>
        )}
      </Overlay>

      {/* Tirage au sort */}
      <Overlay open={!!randomPick} onClose={() => setRandomPick(null)} T={T}>
        {randomPick && (
          <div className="p-6 flex flex-col items-center text-center gap-1" style={{ position: "relative" }}>
            <button
              onClick={() => setRandomPick(null)}
              aria-label="Fermer"
              className="m3-btn rounded-full flex items-center justify-center"
              style={{ position: "absolute", top: 8, right: 8, width: 40, height: 40, color: T.onSurfaceVariant }}
            >
              <X size={20} />
            </button>
            <DiceIcon key={rollId} size={40} color={T.primary} style={{ animation: "diceRoll 450ms cubic-bezier(0.34,1.56,0.64,1)" }} />
            {randomPick.empty ? (
              <>
                <span style={{ fontSize: 18, fontWeight: 500, color: T.onSurface, marginTop: 12 }}>Rien à piocher</span>
                <span style={{ fontSize: 14, color: T.onSurfaceVariant, marginBottom: 12 }}>Aucun jeu « à faire » dans tes licences actives.</span>
                <button
                  onClick={() => setRandomPick(null)}
                  className="m3-btn rounded-full px-4"
                  style={{ height: 40, fontSize: 14, fontWeight: 500, color: T.primary }}
                >
                  Fermer
                </button>
              </>
            ) : (
              <>
                <span style={{ fontSize: 13, color: T.onSurfaceVariant, marginTop: 12 }}>{randomPick.franchiseName}</span>
                <span style={{ fontSize: 18, fontWeight: 500, color: T.onSurface, marginBottom: 16, lineHeight: "24px" }}>{randomPick.gameName}</span>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={pickRandom}
                    className="m3-btn rounded-full px-4"
                    style={{ height: 40, fontSize: 14, fontWeight: 500, color: T.primary }}
                  >
                    Relancer
                  </button>
                  <button
                    onClick={() => goToItem(randomPick.franchiseId, randomPick.gameId)}
                    className="m3-btn press rounded-full px-6"
                    style={{ height: 40, fontSize: 14, fontWeight: 500, background: T.primaryContainer, color: T.onPrimaryContainer }}
                  >
                    Y aller
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Overlay>
    </div>
  );
}
