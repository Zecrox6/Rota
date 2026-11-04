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
  BookOpen,
  Clapperboard,
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
  Check,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  StickyNote,
  AlertCircle,
} from "lucide-react";

const LOGO_DATA_URI = "data:image/png;base64,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";

const FONT = "'Roboto Flex Variable', 'Roboto Flex', 'Roboto', system-ui, -apple-system, sans-serif";
const EASE = "cubic-bezier(0.2,0,0,1)";

// Tokens neutres (base noire AMOLED)
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
  onSuccess: "#00390F",
  danger: "#FF8A80",
};

// Couleur d'accent de l'app (paramètres)
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

// Couleurs propres à chaque licence (teintes sombres pour rester AMOLED)
const LIC_COLORS = [
  { key: "rouge", label: "Rouge", card: "#1F1211", c1: "#2A1C1B", c2: "#3A1A17", c3: "#5A2A24", accent: "#FFB4A8", on: "#5C0F00", text: "#FFDAD3" },
  { key: "orange", label: "Orange", card: "#21150C", c1: "#2C1E14", c2: "#3A2414", c3: "#5C3418", accent: "#FFB68A", on: "#4A1A00", text: "#FFDBCA" },
  { key: "ambre", label: "Ambre", card: "#1F1A08", c1: "#2A230F", c2: "#3A2E0A", c3: "#5C4200", accent: "#FFD873", on: "#402D00", text: "#FFE08A" },
  { key: "vert", label: "Vert", card: "#0F1C12", c1: "#16261A", c2: "#1E3324", c3: "#1E5128", accent: "#8FD99F", on: "#00390F", text: "#ADEBB3" },
  { key: "turquoise", label: "Turquoise", card: "#0D1E1C", c1: "#142725", c2: "#1E3F3B", c3: "#1E4F4A", accent: "#7DDBD3", on: "#003733", text: "#9EEFE6" },
  { key: "bleu", label: "Bleu", card: "#0F1724", c1: "#16202F", c2: "#1D2C44", c3: "#1D4E8F", accent: "#A9C7FF", on: "#00315C", text: "#D6E3FF" },
  { key: "violet", label: "Violet", card: "#18131F", c1: "#211B2A", c2: "#2E2540", c3: "#4F378B", accent: "#D0BCFF", on: "#381E72", text: "#EADDFF" },
  { key: "rose", label: "Rose", card: "#1F1119", c1: "#2A1822", c2: "#3D2032", c3: "#7D2959", accent: "#FFAEDA", on: "#5C0038", text: "#FFD8EA" },
];

function licColor(f, T) {
  if (f.color === "neutre") {
    return {
      key: "neutre",
      card: T.surfaceContainer,
      c1: T.surfaceContainerHigh,
      c2: T.surfaceContainerHighest,
      c3: T.primaryContainer,
      accent: T.primary,
      on: T.onPrimary,
      text: T.onPrimaryContainer,
    };
  }
  const found = LIC_COLORS.find((c) => c.key === f.color);
  if (found) return found;
  let h = 0;
  for (const ch of String(f.id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return LIC_COLORS[h % LIC_COLORS.length];
}

const ORDER = ["todo", "playing", "done"];
const STATUS_LABEL = { todo: "À faire", playing: "En cours", done: "Terminé" };

const CATEGORIES = [
  { key: "jeux", label: "Jeux", Icon: Gamepad2 },
  { key: "lecture", label: "Lecture", Icon: BookOpen },
  { key: "visionnage", label: "Visionnage", Icon: Clapperboard },
];
const PLATFORM_PRESETS = ["PS5", "PS4", "Switch", "PC", "Xbox", "Mobile"];
const SORT_LABELS = { manual: "Ordre perso", alpha: "A-Z", completion: "Progression" };
const WINDOW = 8; // éléments affichés par catégorie avant « Voir les autres »
const SWIPE_OPEN = -156;

// Forme « cookie » (Material 3 Expressive), viewBox 48×48
const COOKIE =
  "M47.2,24 L46.7,25.6 L45.5,27 L43.9,28.2 L42.5,29.3 L41.7,30.4 L41.6,31.8 L41.9,33.5 L42.4,35.5 L42.4,37.4 L41.8,38.9 L40.4,39.8 L38.5,40.1 L36.5,40 L34.7,39.9 L33.4,40.3 L32.4,41.3 L31.6,42.8 L30.7,44.6 L29.5,46.1 L28,46.8 L26.4,46.7 L24.8,45.7 L23.3,44.3 L22,43.1 L20.7,42.5 L19.4,42.6 L17.7,43.3 L15.9,44.1 L14,44.5 L12.4,44.1 L11.3,42.9 L10.7,41.1 L10.4,39.1 L10.2,37.4 L9.6,36.1 L8.5,35.3 L6.8,34.8 L4.9,34.2 L3.2,33.3 L2.2,31.9 L2.1,30.3 L2.8,28.5 L3.9,26.8 L4.8,25.3 L5.2,24 L4.8,22.7 L3.9,21.2 L2.8,19.5 L2.1,17.7 L2.2,16.1 L3.2,14.7 L4.9,13.8 L6.8,13.2 L8.5,12.7 L9.6,11.9 L10.2,10.6 L10.4,8.9 L10.7,6.9 L11.3,5.1 L12.4,3.9 L14,3.5 L15.9,3.9 L17.7,4.7 L19.4,5.4 L20.7,5.5 L22,4.9 L23.3,3.7 L24.8,2.3 L26.4,1.3 L28,1.2 L29.5,1.9 L30.7,3.4 L31.6,5.2 L32.4,6.7 L33.4,7.7 L34.7,8.1 L36.5,8 L38.5,7.9 L40.4,8.2 L41.8,9.1 L42.4,10.6 L42.4,12.5 L41.9,14.5 L41.6,16.2 L41.7,17.6 L42.5,18.7 L43.9,19.8 L45.5,21 L46.7,22.4 Z";

const waveCache = new Map();
function waveBg(color) {
  if (!waveCache.has(color)) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='12'><path d='M0 6 q4 -5 8 0 t8 0' fill='none' stroke='${color}' stroke-width='3' stroke-linecap='round'/></svg>`;
    waveCache.set(color, `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
  }
  return waveCache.get(color);
}

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

async function exportFile(name, text) {
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (Capacitor.isNativePlatform()) {
      const { Filesystem, Directory, Encoding } = await import("@capacitor/filesystem");
      const { Share } = await import("@capacitor/share");
      const res = await Filesystem.writeFile({ path: name, data: text, directory: Directory.Cache, encoding: Encoding.UTF8 });
      await Share.share({ title: "Sauvegarde Rota", url: res.uri, dialogTitle: "Enregistrer la sauvegarde" });
      return true;
    }
  } catch (e) {
    return false;
  }
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}
// @@PLATFORM_END

function highlightMatch(text, query, color) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ background: color.bg, color: color.fg, borderRadius: 4 }}>{text.slice(idx, idx + q.length)}</span>
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

function followUpOf(games, currentId) {
  const flat = flatten(games);
  const idx = flat.findIndex((g) => g.id === currentId);
  for (let i = idx + 1; i < flat.length; i++) if (flat[i].status !== "done") return flat[i];
  return null;
}

function fmtMonth(ts) {
  try {
    return new Date(ts).toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
  } catch (e) {
    return "";
  }
}

// Change le statut et note le moment où l'élément est terminé
function withStatus(g, status) {
  const next = { ...g, status };
  if (status === "done") next.doneAt = g.status === "done" && g.doneAt ? g.doneAt : Date.now();
  else delete next.doneAt;
  return next;
}

function daysSince(ts) {
  return Math.floor((Date.now() - ts) / 86400000);
}

function sinceLabel(ts) {
  if (!ts) return "jamais";
  const d = daysSince(ts);
  if (d <= 0) return "aujourd'hui";
  if (d === 1) return "hier";
  return `il y a ${d} jours`;
}

function isFullyDone(f) {
  return f.games.length > 0 && f.games.every((g) => g.status === "done");
}

function completionPct(f) {
  return f.games.length ? f.games.filter((g) => g.status === "done").length / f.games.length : 0;
}

// Éléments affichés dans une catégorie : une fenêtre autour de là où tu en es, sauf si « tout voir »
function visibleCatItems(f, catKey, hideCompleted, showAll) {
  const all = f.games.filter((g) => normalizeCategory(g.category) === catKey && (!hideCompleted || g.status !== "done"));
  if (showAll || all.length <= WINDOW + 1) return { all, items: all, start: 0, hidden: 0 };
  let anchor = all.findIndex((g) => g.status !== "done");
  if (anchor < 0) anchor = all.length;
  const start = Math.max(0, Math.min(anchor - 3, all.length - WINDOW));
  return { all, items: all.slice(start, start + WINDOW), start, hidden: all.length - WINDOW };
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

function Collapse({ open, children, ms = 280 }) {
  const [mounted, shown] = useMountTransition(open, ms);
  if (!mounted) return null;
  return (
    <div style={{ display: "grid", gridTemplateRows: shown ? "1fr" : "0fr", transition: `grid-template-rows ${ms}ms ${EASE}` }}>
      <div style={{ overflow: "hidden", minHeight: 0, opacity: shown ? 1 : 0, transition: `opacity ${ms}ms ${EASE}` }}>{children}</div>
    </div>
  );
}

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
        color: T.onSurface,
      }}
    >
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.64)", opacity: shown ? 1 : 0, transition: `opacity 240ms ${EASE}` }}
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
        {sheet && <div style={{ width: 32, height: 4, borderRadius: 2, background: T.outlineVariant, margin: "16px auto 4px" }} />}
        {last.current}
      </div>
    </div>,
    document.body
  );
}

// Compteur en forme de cookie : pourcentage, ou coche verte à 100 %
const Cookie = memo(function Cookie({ value, lc, T, size = 48 }) {
  const full = value >= 1;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        style={{ display: "block", transform: `rotate(${Math.round(value * 320)}deg)`, transition: `transform 700ms ${EASE}` }}
        aria-hidden="true"
      >
        <path d={COOKIE} fill={full ? T.success : lc.c2} style={{ transition: "fill 300ms ease" }} />
      </svg>
      <span
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          inset: 0,
          fontSize: size >= 48 ? 14 : 12,
          fontWeight: 750,
          color: full ? T.onSuccess : lc.accent,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {full ? <Check size={size >= 48 ? 22 : 18} strokeWidth={3} /> : Math.round(value * 100)}
      </span>
    </div>
  );
});

// Barre de progression ondulée (Material 3 Expressive)
function WaveProgress({ value, lc, moving }) {
  const partial = value > 0 && value < 1;
  return (
    <div className="flex items-center" style={{ gap: partial ? 6 : 0, height: 12 }}>
      <div
        className={moving ? "wave-move" : undefined}
        style={{
          width: `${value * 100}%`,
          flexShrink: 0,
          height: 12,
          backgroundImage: waveBg(lc.accent),
          backgroundRepeat: "repeat-x",
          backgroundSize: "16px 12px",
          backgroundPosition: "left center",
          transition: `width 500ms ${EASE}`,
        }}
      />
      <div style={{ flex: "1 1 0", minWidth: 0, height: 4, borderRadius: 2, background: lc.c2 }} />
    </div>
  );
}

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

function PlatformChips({ value, onPick, T, selBg, selText }) {
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
              background: on ? selBg || T.primaryContainer : "transparent",
              color: on ? selText || T.onPrimaryContainer : T.onSurfaceVariant,
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

function StatusNode({ status, lc, T }) {
  if (status === "done") {
    return (
      <span className="flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: 9, background: lc.accent, color: lc.on }}>
        <Check size={11} strokeWidth={3.5} />
      </span>
    );
  }
  if (status === "playing") {
    return (
      <span
        className="flex items-center justify-center node-pulse"
        style={{ width: 22, height: 22, borderRadius: 11, background: lc.card, border: `2px solid ${lc.accent}`, boxSizing: "border-box", "--halo": `${lc.accent}33` }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 5, background: lc.accent }} />
      </span>
    );
  }
  return <span style={{ width: 16, height: 16, borderRadius: 8, background: lc.card, border: `2px solid ${T.outlineVariant}`, boxSizing: "border-box" }} />;
}

// --- Une étape de la chronologie (jeu, livre ou film) ---
const GameRow = memo(function GameRow({ g, fid, catKey, lc, T, query, dragging, justAdded, topLine, bottomLine, compact, swipeOpen, act, refs }) {
  const playing = g.status === "playing";
  const done = g.status === "done";
  const nextStatus = ORDER[(ORDER.indexOf(g.status) + 1) % ORDER.length];
  const NextIcon = nextStatus === "done" ? Check : nextStatus === "playing" ? Play : RotateCcw;
  const fgMin = compact ? 34 : playing ? 48 : 40;
  const hl = { bg: lc.c3, fg: lc.text };
  return (
    <div
      ref={(el) => (refs.item.current[g.id] = el)}
      className="flex items-stretch min-w-0"
      style={{ gap: 8, opacity: dragging ? 0.25 : 1, transition: "opacity 150ms ease", animation: justAdded ? `itemIn 300ms ${EASE}` : undefined }}
    >
      <div className="shrink-0 flex flex-col items-center" style={{ width: 28 }}>
        <div style={{ width: 2, flex: "1 1 0", background: topLine }} />
        <button
          data-no-drag
          onClick={() => act.cycle(fid, g.id)}
          aria-label={`Statut : ${STATUS_LABEL[g.status]}`}
          className="shrink-0 flex items-center justify-center"
          style={{ width: 28, height: 28, margin: "-4px 0", background: "transparent", position: "relative", zIndex: 1 }}
        >
          <StatusNode status={g.status} lc={lc} T={T} />
        </button>
        <div style={{ width: 2, flex: "1 1 0", background: bottomLine }} />
      </div>

      <div className="relative flex-1 min-w-0" data-dir={swipeOpen ? "left" : undefined} style={{ margin: playing && !compact ? "6px 0" : "2px 0", overflow: "hidden", borderRadius: 16 }}>
        <div
          className="swipe-layer swipe-status flex items-center gap-2"
          style={{ position: "absolute", inset: 0, borderRadius: 16, background: lc.c3, color: lc.text, paddingLeft: 14, fontSize: 13, fontWeight: 600 }}
        >
          <NextIcon size={16} strokeWidth={2.4} />
          {STATUS_LABEL[nextStatus]}
        </div>
        <div
          data-swipe-actions={g.id}
          className="swipe-layer swipe-actions flex items-center justify-end gap-2"
          style={{ position: "absolute", inset: 0, paddingRight: 4 }}
        >
          <button
            onClick={() => act.editGame(fid, g)}
            aria-label="Modifier"
            tabIndex={swipeOpen ? 0 : -1}
            className="m3-btn flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, background: lc.c3, color: lc.text }}
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => act.duplicateGame(fid, g.id)}
            aria-label="Dupliquer"
            tabIndex={swipeOpen ? 0 : -1}
            className="m3-btn flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, background: T.surfaceContainerHighest, color: T.onSurface }}
          >
            <Copy size={18} />
          </button>
          <button
            onClick={() => act.askDeleteGame(fid, g)}
            aria-label="Supprimer"
            tabIndex={swipeOpen ? 0 : -1}
            className="m3-btn flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, background: "#5C1A1A", color: T.danger }}
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div
          onPointerDown={(e) => act.gameDown(e, fid, catKey, g)}
          onContextMenu={(e) => e.preventDefault()}
          className="flex items-center min-w-0"
          style={{
            position: "relative",
            minHeight: fgMin,
            gap: 8,
            borderRadius: 16,
            background: playing ? lc.c2 : lc.card,
            padding: playing ? "4px 4px 4px 14px" : "0 4px 0 4px",
            touchAction: "pan-y",
            transform: swipeOpen ? `translateX(${SWIPE_OPEN}px)` : "translateX(0px)",
            transition: `transform 260ms ${EASE}`,
            cursor: "grab",
          }}
        >
          <div className="flex flex-col min-w-0 flex-1" style={{ padding: "6px 0" }}>
            <span
              style={{
                fontSize: compact ? 14 : 15,
                lineHeight: "20px",
                color: done ? T.onSurfaceVariant : playing ? lc.text : T.onSurface,
                fontWeight: playing ? 600 : 400,
                overflowWrap: "anywhere",
              }}
            >
              {highlightMatch(g.name, query, hl)}
            </span>
            {playing && !compact && <span style={{ fontSize: 12, lineHeight: "16px", color: lc.accent }}>En cours</span>}
            {!compact && (g.note || (done && g.doneAt)) && (
              <span style={{ fontSize: 12, lineHeight: "16px", color: T.onSurfaceVariant, overflowWrap: "anywhere" }}>
                {[done && g.doneAt ? `Terminé en ${fmtMonth(g.doneAt)}` : null, g.note || null].filter(Boolean).join(" · ")}
              </span>
            )}
          </div>
          {g.platform && (
            <span
              className="shrink-0 rounded-md px-1.5"
              style={{ fontSize: 11, lineHeight: "20px", fontWeight: 500, background: playing ? lc.c3 : T.surfaceContainerHighest, color: T.onSurfaceVariant }}
            >
              {g.platform}
            </span>
          )}
          {g.link && (
            <button
              data-no-drag
              onClick={() => openLink(g.link)}
              className="m3-btn shrink-0 flex items-center justify-center rounded-full"
              style={{ width: 32, height: 32, color: T.onSurfaceVariant }}
              aria-label="Ouvrir le lien"
            >
              <ExternalLink size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

const BURST = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const d = 34 + (i % 3) * 12;
  return { dx: Math.round(Math.cos(a) * d), dy: Math.round(Math.sin(a) * d), s: i % 3 === 0 ? 12 : 7, delay: (i % 4) * 30 };
});

// --- Une carte de licence ---
const FranchiseCard = memo(function FranchiseCard(p) {
  const {
    f,
    draggable,
    T,
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
    showAllKey,
    draggingId,
    justAddedGameId,
    justAdded,
    isDraggingFranchise,
    swipeOpenId,
    celebrate,
    compact,
    act,
    refs,
  } = p;

  const lc = useMemo(() => licColor(f, T), [f.color, f.id, T]);
  const total = f.games.length;
  const done = f.games.filter((g) => g.status === "done").length;
  const ratio = total ? done / total : 0;
  const full = total > 0 && done === total;
  const q = query.trim().toLowerCase();
  const matchesInside = !!q && !f.name.toLowerCase().includes(q) && f.games.some((g) => g.name.toLowerCase().includes(q));
  const isOpen = isExpanded || matchesInside;
  const activeCategory = newGameCat;
  const upNext = nextStep(f.games);
  const typed = newGameInput.trim().toLowerCase();
  const isDup = !!typed && f.games.some((g) => g.name.trim().toLowerCase() === typed);
  const catLabel = CATEGORIES.find((c) => c.key === activeCategory).label;
  const hl = { bg: lc.c3, fg: lc.text };

  return (
    <div
      ref={(el) => (refs.franchise.current[f.id] = el)}
      className="overflow-hidden"
      style={{
        position: "relative",
        borderRadius: 28,
        background: lc.card,
        opacity: isDraggingFranchise ? 0.3 : 1,
        transition: "opacity 150ms ease, background-color 300ms ease",
        animation: justAdded ? `itemIn 300ms ${EASE}` : undefined,
      }}
    >
      {full && (
        <>
          <Sparkles size={14} color={lc.accent} style={{ position: "absolute", left: compact ? 44 : 52, top: compact ? 4 : 8, pointerEvents: "none" }} aria-hidden="true" />
          <Sparkles size={10} color={T.success} style={{ position: "absolute", left: 10, bottom: 10, pointerEvents: "none" }} aria-hidden="true" />
        </>
      )}
      {celebrate && (
        <div aria-hidden="true" style={{ position: "absolute", left: compact ? 34 : 40, top: compact ? 30 : 40, width: 0, height: 0, pointerEvents: "none", zIndex: 2 }}>
          {BURST.map((b, i) => (
            <span
              key={i}
              className="burst"
              style={{
                position: "absolute",
                left: -b.s / 2,
                top: -b.s / 2,
                width: b.s,
                height: b.s,
                borderRadius: b.s,
                background: i % 3 === 0 ? T.success : i % 3 === 1 ? lc.accent : T.primary,
                "--dx": `${b.dx}px`,
                "--dy": `${b.dy}px`,
                animationDelay: `${b.delay}ms`,
              }}
            />
          ))}
        </div>
      )}

      <div
        role="button"
        onClick={() => act.toggleExpand(f.id)}
        onPointerDown={draggable ? (e) => act.franchiseDown(e, f) : undefined}
        onContextMenu={(e) => e.preventDefault()}
        className="m3-btn flex items-center min-w-0"
        style={{ gap: 14, padding: compact ? "10px 6px 10px 14px" : "16px 6px 14px 16px", touchAction: "manipulation", cursor: "pointer" }}
      >
        <Cookie value={ratio} lc={lc} T={T} size={compact ? 40 : 48} />
        <div className="flex flex-col min-w-0 flex-1">
          <span style={{ fontSize: compact ? 16 : 18, fontWeight: 650, lineHeight: compact ? "22px" : "24px", color: T.onSurface, overflowWrap: "anywhere" }}>
            {highlightMatch(f.name, query, hl)}
          </span>
          {upNext ? (
            <span style={{ fontSize: 13, lineHeight: "18px", color: upNext.status === "playing" ? lc.accent : T.onSurfaceVariant }}>
              {upNext.status === "playing" ? "En cours : " : "Prochaine étape : "}
              {upNext.name}
            </span>
          ) : total > 0 ? (
            <span style={{ fontSize: 13, lineHeight: "18px", color: T.success, fontWeight: 600 }}>Licence terminée à 100 %</span>
          ) : (
            <span style={{ fontSize: 13, lineHeight: "18px", color: T.onSurfaceVariant }}>Rien d'ajouté pour l'instant</span>
          )}
        </div>
        <span className="shrink-0 px-2" style={{ fontSize: 13, fontWeight: 500, color: T.onSurfaceVariant, fontVariantNumeric: "tabular-nums" }}>
          {done}/{total}
        </span>
        <span
          className="shrink-0 flex items-center justify-center"
          style={{ width: 32, height: 32, color: T.onSurfaceVariant, transform: isOpen ? "rotate(180deg)" : "none", transition: `transform 280ms ${EASE}` }}
        >
          <ChevronDown size={20} />
        </span>
      </div>

      <Collapse open={isOpen}>
        <div className="flex flex-col px-3 pb-3" style={{ gap: 10 }}>
          <div style={{ padding: "0 8px 2px" }}>
            <WaveProgress value={ratio} lc={lc} moving={f.games.some((g) => g.status === "playing")} />
          </div>


          {CATEGORIES.map((cat, ci) => {
            const { all, items, start, hidden } = visibleCatItems(f, cat.key, hideCompleted, showAllKey[ci] === "1");
            if (all.length === 0) return null;
            const collapsed = collapsedKey[ci] === "1";
            const showingAll = showAllKey[ci] === "1";
            const Icon = cat.Icon;
            return (
              <div key={cat.key} className="flex flex-col">
                <button onClick={() => act.toggleCategory(f.id, cat.key)} className="m3-btn flex items-center gap-2 w-full rounded-xl px-1" style={{ height: 40 }}>
                  <Icon size={18} color={lc.accent} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: T.onSurface }}>{cat.label}</span>
                  <span className="rounded-full px-2" style={{ fontSize: 11, lineHeight: "18px", fontWeight: 600, background: lc.c2, color: T.onSurfaceVariant }}>
                    {all.length}
                  </span>
                  <span className="flex-1" />
                  <span className="flex items-center" style={{ color: T.onSurfaceVariant, transform: collapsed ? "rotate(-90deg)" : "none", transition: `transform 240ms ${EASE}` }}>
                    <ChevronDown size={18} />
                  </span>
                </button>
                <Collapse open={!collapsed} ms={240}>
                  <div className="flex flex-col pt-1">
                    {items.map((g, i) => {
                      const absIdx = start + i;
                      const prevExists = absIdx > 0;
                      const next = all[absIdx + 1];
                      const topLine = !prevExists ? "transparent" : g.status !== "todo" ? lc.accent : T.outlineVariant;
                      const bottomLine = !next ? "transparent" : next.status !== "todo" ? lc.accent : T.outlineVariant;
                      return (
                        <GameRow
                          key={g.id}
                          g={g}
                          fid={f.id}
                          catKey={cat.key}
                          lc={lc}
                          T={T}
                          query={query}
                          dragging={draggingId === g.id}
                          justAdded={justAddedGameId === g.id}
                          topLine={topLine}
                          bottomLine={bottomLine}
                          compact={compact}
                          swipeOpen={swipeOpenId === g.id}
                          act={act}
                          refs={refs}
                        />
                      );
                    })}
                    {(hidden > 0 || showingAll) && all.length > WINDOW + 1 && (
                      <button
                        onClick={() => act.toggleShowAll(f.id, cat.key)}
                        className="m3-btn self-start rounded-full px-3"
                        style={{ height: 36, marginLeft: 28, fontSize: 13, fontWeight: 600, color: lc.accent }}
                      >
                        {showingAll ? "Réduire" : `Voir les ${hidden} autres`}
                      </button>
                    )}
                  </div>
                </Collapse>
              </div>
            );
          })}

          {total === 0 && (
            <span className="px-1" style={{ fontSize: 13, color: T.onSurfaceVariant }}>
              Ajoute un jeu, une lecture ou un visionnage juste en dessous.
            </span>
          )}

          {/* Ajout d'un élément */}
          <div className="flex flex-col gap-2" style={{ marginTop: 4 }}>
            <div className="flex rounded-full overflow-hidden" style={{ height: 36, border: `1px solid ${T.outlineVariant}` }}>
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
                      background: on ? lc.c3 : "transparent",
                      color: on ? lc.text : T.onSurfaceVariant,
                      borderLeft: idx === 0 ? "none" : `1px solid ${T.outlineVariant}`,
                      transition: "background-color 200ms ease, color 200ms ease",
                    }}
                  >
                    {on && <Check size={14} />}
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 rounded-full pl-4 min-w-0" style={{ height: 48, paddingRight: 4, background: lc.c1 }}>
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
                style={{ width: 36, height: 36, background: showLink ? lc.c3 : "transparent", color: showLink ? lc.text : T.onSurfaceVariant }}
                aria-label="Ajouter un lien"
              >
                <Link2 size={17} />
              </button>
              {activeCategory === "jeux" && (
                <button
                  onClick={() => act.togglePlatformField(f.id)}
                  className="m3-btn shrink-0 rounded-full flex items-center justify-center"
                  style={{ width: 36, height: 36, background: showPlatform ? lc.c3 : "transparent", color: showPlatform ? lc.text : T.onSurfaceVariant }}
                  aria-label="Ajouter une plateforme"
                >
                  <Gamepad2 size={17} />
                </button>
              )}
              <button
                onClick={() => act.addGame(f.id)}
                className="m3-btn press shrink-0 rounded-full flex items-center justify-center"
                style={{ width: 40, height: 40, background: lc.accent, color: lc.on }}
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
              <div className="flex items-center gap-3 rounded-full px-4" style={{ height: 44, background: lc.c1 }}>
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
                <div className="flex items-center gap-3 rounded-full px-4" style={{ height: 44, background: lc.c1 }}>
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
                <PlatformChips value={newGamePlatform} onPick={(v) => act.setNewGamePlatform(f.id, v)} T={T} selBg={lc.c3} selText={lc.text} />
              </div>
            </Collapse>
          </div>

          <div className="grid pt-2" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", borderTop: `1px solid ${lc.c2}` }}>
            {[
              { icon: <Pencil size={18} />, label: "Modifier", onClick: () => act.rename(f) },
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

function Switch({ on, T }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        flexShrink: 0,
        width: 52,
        height: 32,
        borderRadius: 16,
        boxSizing: "border-box",
        background: on ? T.primary : T.surfaceContainerHighest,
        border: `2px solid ${on ? T.primary : T.outline}`,
        transition: `background-color 200ms ${EASE}, border-color 200ms ${EASE}`,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: on ? 22 : 4,
          width: on ? 24 : 16,
          height: on ? 24 : 16,
          marginTop: on ? -12 : -8,
          borderRadius: 12,
          background: on ? T.onPrimary : T.outline,
          transition: `all 220ms ${EASE}`,
        }}
      />
    </span>
  );
}

function IconBtn({ onClick, label, T, children, size = 48 }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="m3-btn shrink-0 flex items-center justify-center rounded-full"
      style={{ width: size, height: size, color: T.onSurfaceVariant }}
    >
      {children}
    </button>
  );
}

function Chip({ on, onClick, icon, children, T }) {
  return (
    <button
      onClick={onClick}
      className="m3-btn shrink-0 flex items-center gap-1.5 rounded-lg"
      style={{
        height: 32,
        padding: "0 10px",
        fontSize: 13,
        fontWeight: 500,
        background: on ? T.primaryContainer : "transparent",
        color: on ? T.onPrimaryContainer : T.onSurfaceVariant,
        border: `1px solid ${on ? "transparent" : T.outlineVariant}`,
        transition: "background-color 200ms ease, color 200ms ease",
      }}
    >
      {icon}
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
  const [compact, setCompact] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dq = useDeferredValue(searchQuery);
  const [draggingId, setDraggingId] = useState(null);
  const [draggingFid, setDraggingFid] = useState(null);
  const [ghost, setGhost] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [editName, setEditName] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editPlatform, setEditPlatform] = useState("");
  const [editColor, setEditColor] = useState(null);
  const [accentKey, setAccentKey] = useState("violet");
  const [view, setView] = useState("home");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [justAddedGameId, setJustAddedGameId] = useState(null);
  const [justAddedFranchiseId, setJustAddedFranchiseId] = useState(null);
  const [showPaused, setShowPaused] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [showAllCats, setShowAllCats] = useState({});
  const [sortMode, setSortMode] = useState("manual");
  const [randomPick, setRandomPick] = useState(null);
  const [diceFace, setDiceFace] = useState(1);
  const [rollId, setRollId] = useState(0);
  const [showRemaining, setShowRemaining] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editNote, setEditNote] = useState("");
  const [undo, setUndo] = useState(null);
  const [lastBackup, setLastBackup] = useState(null);
  const [backupSnooze, setBackupSnooze] = useState(0);
  const undoTimer = useRef(null);
  const [swipeOpenId, setSwipeOpenId] = useState(null);
  const [celebrateId, setCelebrateId] = useState(null);

  const T = useMemo(() => ({ ...NEUTRAL, ...(ACCENTS.find((a) => a.key === accentKey) || ACCENTS[0]) }), [accentKey]);

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
  const showAllRef = useRef(showAllCats);
  const visibleActiveRef = useRef(new Set());
  const homeScrollRef = useRef(0);
  const swipeOpenRef = useRef(null);
  const swipingRef = useRef(false);
  hideCompletedRef.current = hideCompleted;
  showAllRef.current = showAllCats;
  swipeOpenRef.current = swipeOpenId;

  const refs = useMemo(() => ({ item: itemRefs, franchise: franchiseRefs, menuBtn: menuButtonRefs }), []);

  useEffect(() => {
    franchisesRef.current = franchises;
  }, [franchises]);

  // --- Sauvegarde regroupée, forcée quand l'app passe en arrière-plan ---
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
    (async () => {
      const v = await store.get("rota-compact");
      if (v === "1") setCompact(true);
    })();
    (async () => {
      const v = Number(await store.get("rota-last-backup"));
      if (v > 0) setLastBackup(v);
      const z = Number(await store.get("rota-backup-snooze"));
      if (z > 0) setBackupSnooze(z);
    })();
  }, []);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
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

  // Empêche la page de défiler pendant un glisser-déposer
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const block = (e) => {
      if ((dragRef.current || swipingRef.current) && e.cancelable) e.preventDefault();
    };
    el.addEventListener("touchmove", block, { passive: false });
    return () => el.removeEventListener("touchmove", block);
  }, [view]);

  // Ferme les actions d'une ligne glissée quand on touche ailleurs
  useEffect(() => {
    if (!swipeOpenId) return;
    const onDown = (e) => {
      if (e.target.closest && e.target.closest(`[data-swipe-actions="${swipeOpenId}"]`)) return;
      setSwipeOpenId(null);
    };
    window.addEventListener("pointerdown", onDown, true);
    return () => window.removeEventListener("pointerdown", onDown, true);
  }, [swipeOpenId]);

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

  function toggleCompact() {
    setCompact((c) => {
      store.set("rota-compact", c ? "0" : "1");
      return !c;
    });
  }

  // --- Export / import ---
  async function handleExport() {
    flushSave();
    const ok = await exportFile("rota-sauvegarde.json", JSON.stringify(franchisesRef.current, null, 2));
    if (ok) {
      const now = Date.now();
      setLastBackup(now);
      store.set("rota-last-backup", String(now));
    }
  }

  function snoozeBackup() {
    const until = Date.now() + 7 * 86400000;
    setBackupSnooze(until);
    store.set("rota-backup-snooze", String(until));
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
            color: f.color && (f.color === "neutre" || LIC_COLORS.some((c) => c.key === f.color)) ? f.color : undefined,
            games: Array.isArray(f.games)
              ? f.games.map((g) => ({
                  id: uid(),
                  name: g && g.name ? String(g.name) : "Sans titre",
                  status: g && ORDER.includes(g.status) ? g.status : "todo",
                  category: normalizeCategory(g && g.category),
                  link: normalizeLink(g && g.link),
                  platform: (g && g.platform) || null,
                  note: g && g.note ? String(g.note) : undefined,
                  doneAt: g && g.status === "done" && Number(g.doneAt) > 0 ? Number(g.doneAt) : undefined,
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

  // --- Barre « Annuler » (comme Gmail) ---
  function offerUndo(prev, label) {
    clearTimeout(undoTimer.current);
    setUndo({ key: uid(), prev, label });
    undoTimer.current = setTimeout(() => setUndo(null), 4500);
  }

  function doUndo() {
    if (!undo) return;
    clearTimeout(undoTimer.current);
    persist(undo.prev);
    setUndo(null);
    haptic("light");
  }

  // --- Fête quand une licence passe à 100 % ---
  function celebrateIfDone(before, next, fid) {
    const b = before.find((f) => f.id === fid);
    const a = next.find((f) => f.id === fid);
    if (a && b && !isFullyDone(b) && isFullyDone(a)) {
      haptic("success");
      setCelebrateId(fid);
      setTimeout(() => setCelebrateId((cur) => (cur === fid ? null : cur)), 1300);
      return true;
    }
    return false;
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
    const copy = { id: uid(), name: `${f.name} (copie)`, paused: false, color: f.color, games: f.games.map((g) => ({ ...g, id: uid(), status: "todo" })) };
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
    setEditColor(f.color || licColor(f, T).key);
    setSheet({ type: "rename", fid: f.id });
  }

  function openEditGame(fid, g) {
    setSwipeOpenId(null);
    setEditName(g.name);
    setEditLink(g.link || "");
    setEditPlatform(g.platform || "");
    setEditNote(g.note || "");
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
      persist(franchisesRef.current.map((f) => (f.id === sheet.fid ? { ...f, name, color: editColor || f.color } : f)));
    } else {
      const link = normalizeLink(editLink.trim());
      const platform = editPlatform.trim();
      persist(
        franchisesRef.current.map((f) =>
          f.id !== sheet.fid ? f : { ...f, games: f.games.map((g) => (g.id === sheet.gid ? { ...g, name, link: link || null, platform: platform || null, note: editNote.trim() || undefined } : g)) }
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
        f.id === fid ? { ...f, games: [...f.games, { id: newId, name, status: "todo", category, link: link || null, platform: platform || null }] } : f
      )
    );
    setNewGameInputs((s) => ({ ...s, [fid]: "" }));
    setNewGameLink((s) => ({ ...s, [fid]: "" }));
    setNewGamePlatform((s) => ({ ...s, [fid]: "" }));
    setShowLinkField((s) => ({ ...s, [fid]: false }));
    setShowPlatformField((s) => ({ ...s, [fid]: false }));
    setCollapsedCategories((s) => ({ ...s, [`${fid}:${category}`]: false }));
    setShowAllCats((s) => ({ ...s, [`${fid}:${category}`]: true }));
    setJustAddedGameId(newId);
    setTimeout(() => setJustAddedGameId((cur) => (cur === newId ? null : cur)), 400);
  }

  function duplicateGame(fid, gid) {
    setSwipeOpenId(null);
    let newId = null;
    persist(
      franchisesRef.current.map((f) => {
        if (f.id !== fid) return f;
        const idx = f.games.findIndex((g) => g.id === gid);
        if (idx === -1) return f;
        newId = uid();
        const games = [...f.games];
        games.splice(idx + 1, 0, withStatus({ ...f.games[idx], id: newId }, "todo"));
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
    let label = "";
    const next = list.map((f) =>
      f.id !== fid
        ? f
        : {
            ...f,
            games: f.games.map((g) => {
              if (g.id !== gid) return g;
              const st = ORDER[(ORDER.indexOf(g.status) + 1) % ORDER.length];
              label = `${g.name} : ${STATUS_LABEL[st]}`;
              return withStatus(g, st);
            }),
          }
    );
    persist(next);
    offerUndo(list, label);
    if (!celebrateIfDone(list, next, fid)) haptic("light");
  }

  // Termine l'élément en cours (ou celui donné) et lance le suivant
  function advanceFranchise(fid, gid) {
    const list = franchisesRef.current;
    const f = list.find((fr) => fr.id === fid);
    if (!f) return;
    const current = gid ? f.games.find((g) => g.id === gid) : nextStep(f.games);
    if (!current) return;
    const followUp = followUpOf(f.games, current.id);
    const othersPlaying = f.games.some((g) => g.status === "playing" && g.id !== current.id);
    const games = f.games.map((g) => {
      if (g.id === current.id) return withStatus(g, "done");
      if (followUp && !othersPlaying && g.id === followUp.id) return withStatus(g, "playing");
      return g;
    });
    const next = list.map((fr) => (fr.id === fid ? { ...fr, games } : fr));
    persist(next);
    offerUndo(list, `${current.name} : Terminé`);
    if (!celebrateIfDone(list, next, fid)) haptic("light");
  }

  // --- Glisser-déposer (appui long) et glisser latéral ---
  function cancelPending() {
    if (pendingRef.current) {
      clearTimeout(pendingRef.current.timer);
      pendingRef.current.cleanup();
    }
  }

  function startPending(e, onActivate, onSwipe) {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest("[data-no-drag]")) return;
    if (dragRef.current || swipingRef.current) return;
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
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      if (onSwipe && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        clearTimeout(timer);
        cleanup();
        onSwipe(el, sx, pid);
        return;
      }
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
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

  // Glisser une ligne : à droite = statut suivant, à gauche = Modifier / Dupliquer / Supprimer
  function beginSwipe(el, sx, pid, fid, g) {
    const wrap = el.parentNode;
    const base = swipeOpenRef.current === g.id ? SWIPE_OPEN : 0;
    if (swipeOpenRef.current && swipeOpenRef.current !== g.id) setSwipeOpenId(null);
    try {
      el.setPointerCapture(pid);
    } catch (err) {}
    swipingRef.current = true;
    el.style.transition = "none";
    let last = base;
    let armed = false;
    const mv = (ev) => {
      if (ev.pointerId !== pid) return;
      let x = base + (ev.clientX - sx);
      x = Math.max(SWIPE_OPEN - 24, Math.min(150, x));
      last = x;
      el.style.transform = `translateX(${x}px)`;
      wrap.dataset.dir = x > 0 ? "right" : "left";
      const nowArmed = x > 80 || x < -70;
      if (nowArmed && !armed) haptic("light");
      armed = nowArmed;
    };
    const up = (ev) => {
      if (ev.pointerId !== pid) return;
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      swipingRef.current = false;
      justDraggedRef.current = Date.now();
      el.style.transition = `transform 260ms ${EASE}`;
      if (last > 80) {
        el.style.transform = "translateX(0px)";
        setSwipeOpenId(null);
        cycleStatus(fid, g.id);
        setTimeout(() => {
          if (swipeOpenRef.current !== g.id) delete wrap.dataset.dir;
        }, 270);
      } else if (last < -70) {
        el.style.transform = `translateX(${SWIPE_OPEN}px)`;
        wrap.dataset.dir = "left";
        setSwipeOpenId(g.id);
      } else {
        el.style.transform = "translateX(0px)";
        setSwipeOpenId(null);
        setTimeout(() => {
          if (swipeOpenRef.current !== g.id) delete wrap.dataset.dir;
        }, 270);
      }
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  }

  function gameDown(e, fid, catKey, g) {
    startPending(
      e,
      (sy) => {
        const row = itemRefs.current[g.id];
        const box = row ? row.children[1] : null;
        const r = box ? box.getBoundingClientRect() : null;
        const f = franchisesRef.current.find((x) => x.id === fid);
        dragRef.current = { type: "game", fid, catKey, id: g.id, startY: sy };
        setDraggingId(g.id);
        setSwipeOpenId(null);
        if (r && f) setGhost({ type: "game", name: g.name, status: g.status, lc: licColor(f, T), left: r.left, top: r.top, width: r.width, height: r.height });
      },
      (el, sx, pid) => beginSwipe(el, sx, pid, fid, g)
    );
  }

  function franchiseDown(e, f) {
    startPending(e, (sy) => {
      const card = franchiseRefs.current[f.id];
      const header = card ? card.querySelector('[role="button"]') : null;
      const r = header ? header.getBoundingClientRect() : null;
      dragRef.current = { type: "franchise", id: f.id, startY: sy };
      setDraggingFid(f.id);
      if (r) setGhost({ type: "franchise", name: f.name, ratio: completionPct(f), lc: licColor(f, T), left: r.left, top: r.top, width: r.width, height: r.height });
    });
  }

  function visibleGameIds(f, catKey) {
    return visibleCatItems(f, catKey, hideCompletedRef.current, !!showAllRef.current[`${f.id}:${catKey}`]).items.map((g) => g.id);
  }

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
      const games = CATEGORIES.flatMap((c) => (c.key === d.catKey ? reordered : f.games.filter((g) => normalizeCategory(g.category) === c.key)));
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
    if (game) {
      const ck = `${fid}:${normalizeCategory(game.category)}`;
      setCollapsedCategories((s) => ({ ...s, [ck]: false }));
      setShowAllCats((s) => ({ ...s, [ck]: true }));
    }
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

  // --- Données dérivées ---
  const stats = useMemo(() => {
    let totalGames = 0;
    let totalDone = 0;
    for (const f of franchises) {
      totalGames += f.games.length;
      totalDone += f.games.filter((g) => g.status === "done").length;
    }
    return { totalGames, totalDone, pct: totalGames ? Math.round((totalDone / totalGames) * 100) : 0 };
  }, [franchises]);

  const { activeFranchises, pausedFranchises, searchedCount } = useMemo(() => {
    const q = dq.trim().toLowerCase();
    const searched = q ? franchises.filter((f) => f.name.toLowerCase().includes(q) || f.games.some((g) => g.name.toLowerCase().includes(q))) : franchises;
    const active = searched.filter((f) => !f.paused);
    const sorted =
      sortMode === "alpha"
        ? [...active].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
        : sortMode === "completion"
        ? [...active].sort((a, b) => completionPct(b) - completionPct(a))
        : active;
    return { activeFranchises: sorted, pausedFranchises: searched.filter((f) => f.paused), searchedCount: searched.length };
  }, [franchises, dq, sortMode]);

  const playingItems = useMemo(() => {
    const out = [];
    for (const f of franchises) {
      if (f.paused) continue;
      for (const g of flatten(f.games)) {
        if (g.status === "playing") out.push({ f, g, follow: followUpOf(f.games, g.id) });
      }
    }
    return out;
  }, [franchises]);

  visibleActiveRef.current = new Set(activeFranchises.map((f) => f.id));

  function toggleAll() {
    const anyOpen = activeFranchises.some((f) => expanded[f.id]);
    const next = {};
    activeFranchises.forEach((f) => (next[f.id] = !anyOpen));
    setExpanded((e) => ({ ...e, ...next }));
  }

  // --- Actions stables passées aux cartes ---
  const actRef = useRef(null);
  actRef.current = {
    toggleExpand: (fid) => {
      if (Date.now() - justDraggedRef.current < 400) return;
      setExpanded((e) => ({ ...e, [fid]: !e[fid] }));
    },
    toggleRemaining: () => setShowRemaining((v) => !v),
    toggleCategory: (fid, catKey) => setCollapsedCategories((s) => ({ ...s, [`${fid}:${catKey}`]: !s[`${fid}:${catKey}`] })),
    toggleShowAll: (fid, catKey) => setShowAllCats((s) => ({ ...s, [`${fid}:${catKey}`]: !s[`${fid}:${catKey}`] })),
    franchiseDown,
    gameDown,
    cycle: cycleStatus,
    advance: (fid) => advanceFranchise(fid),
    editGame: openEditGame,
    duplicateGame,
    askDeleteGame: (fid, g) => {
      setSwipeOpenId(null);
      setConfirmDelete({ type: "game", franchiseId: fid, gameId: g.id, label: g.name });
    },
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
    const flag = (map) => CATEGORIES.map((c) => (map[`${f.id}:${c.key}`] ? "1" : "0")).join("");
    return {
      f,
      draggable,
      T,
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
      collapsedKey: flag(collapsedCategories),
      showAllKey: flag(showAllCats),
      draggingId: has(draggingId) ? draggingId : null,
      justAddedGameId: has(justAddedGameId) ? justAddedGameId : null,
      justAdded: justAddedFranchiseId === f.id,
      isDraggingFranchise: draggingFid === f.id,
      swipeOpenId: has(swipeOpenId) ? swipeOpenId : null,
      celebrate: celebrateId === f.id,
      compact,
      act,
      refs,
    };
  }

  const DiceIcon = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][diceFace - 1];
  const sheetFranchise = sheet ? franchises.find((f) => f.id === sheet.fid) : null;
  const showCarousel = playingItems.length > 0 && !dq.trim();

  return (
    <div className="rota-root min-h-screen w-full" style={{ background: T.surface, color: T.onSurface, fontFamily: FONT, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400..800&display=swap');
        html, body { background: #000; margin: 0; -webkit-tap-highlight-color: transparent; overscroll-behavior-y: none; }
        .rota-root { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; -webkit-font-smoothing: antialiased; }
        .rota-root input { -webkit-user-select: text; user-select: text; font-family: inherit; }
        .rota-root button { -webkit-tap-highlight-color: transparent; font-family: inherit; }
        input::placeholder { color: ${T.onSurfaceVariant}; opacity: 0.7; }
        .m3-btn { position: relative; overflow: hidden; isolation: isolate; }
        .m3-btn::after { content: ""; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity 200ms ease; pointer-events: none; border-radius: inherit; }
        .m3-btn:active::after { opacity: 0.12; transition-duration: 40ms; }
        @media (hover: hover) { .m3-btn:hover::after { opacity: 0.08; } }
        .press { transition: transform 120ms ease; }
        .press:active { transform: scale(0.96); }
        .swipe-layer { opacity: 0; pointer-events: none; }
        [data-dir="right"] > .swipe-status { opacity: 1; }
        [data-dir="left"] > .swipe-actions { opacity: 1; pointer-events: auto; }
        .wave-move { animation: waveMove 1.4s linear infinite; }
        @keyframes waveMove { from { background-position-x: 0; } to { background-position-x: 16px; } }
        .node-pulse { animation: nodePulse 2.2s ease-in-out infinite; }
        @keyframes nodePulse { 0%, 100% { box-shadow: 0 0 0 4px var(--halo); } 50% { box-shadow: 0 0 0 7px var(--halo); } }
        .burst { animation: burst 900ms ${EASE} forwards; opacity: 0; }
        @keyframes burst { 0% { opacity: 1; transform: translate(0,0) scale(0.4); } 70% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1); } }
        @keyframes snackIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
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
          <header
            className="sticky top-0 z-30"
            style={{ background: scrolled ? T.surfaceContainer : T.surface, transition: "background-color 220ms ease", paddingTop: "env(safe-area-inset-top)" }}
          >
            <div className="mx-auto w-full max-w-md flex items-center gap-3 pl-5 pr-1" style={{ height: 64 }}>
              <span className="flex-1 min-w-0" style={{ fontSize: 24, fontWeight: 650, letterSpacing: "-0.3px" }}>
                Rota
              </span>
              <IconBtn onClick={openSettings} label="Paramètres" T={T}>
                <Settings size={22} />
              </IconBtn>
            </div>
          </header>

          <main className="mx-auto w-full max-w-md px-4" style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom))" }}>
            <div className="flex items-center gap-3 rounded-full pl-4 min-w-0 mt-1" style={{ height: 56, paddingRight: 8, background: T.surfaceContainerHigh }}>
              <Search size={22} color={T.onSurfaceVariant} className="shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFranchise()}
                placeholder="Rechercher ou ajouter"
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
                onClick={() => setShowOptions(true)}
                className="m3-btn shrink-0 rounded-full flex items-center justify-center"
                style={{ width: 40, height: 40, color: T.onSurfaceVariant, position: "relative" }}
                aria-label="Affichage et tri"
              >
                <SlidersHorizontal size={20} />
                {(sortMode !== "manual" || hideCompleted || compact) && (
                  <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 4, background: T.primary }} />
                )}
              </button>
              <button
                onClick={addFranchise}
                className="m3-btn press shrink-0 rounded-full flex items-center justify-center"
                style={{ width: 40, height: 40, background: T.primary, color: T.onPrimary }}
                aria-label="Ajouter la licence"
              >
                <Plus size={22} />
              </button>
            </div>


            {loaded && franchises.length > 0 && (!lastBackup || daysSince(lastBackup) >= 30) && Date.now() > backupSnooze && (
              <div className="flex items-center gap-3 rounded-2xl mt-3" style={{ background: T.surfaceContainerHigh, padding: "8px 4px 8px 16px" }}>
                <AlertCircle size={20} color={T.primary} className="shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Pense à sauvegarder</span>
                  <span style={{ fontSize: 12, color: T.onSurfaceVariant }}>
                    {lastBackup ? `Dernière sauvegarde ${sinceLabel(lastBackup)}` : "Aucune sauvegarde pour l'instant"}
                  </span>
                </div>
                <button onClick={handleExport} className="m3-btn shrink-0 rounded-full px-3" style={{ height: 40, fontSize: 14, fontWeight: 600, color: T.primary }}>
                  Sauvegarder
                </button>
                <button onClick={snoozeBackup} aria-label="Plus tard" className="m3-btn shrink-0 rounded-full flex items-center justify-center" style={{ width: 40, height: 40, color: T.onSurfaceVariant }}>
                  <X size={18} />
                </button>
              </div>
            )}

            {/* En cours : carrousel */}
            {showCarousel && (
              <>
                <div className="flex items-baseline gap-2 px-1" style={{ marginTop: 24, marginBottom: 12 }}>
                  <span style={{ fontSize: 22, fontWeight: 650, letterSpacing: "-0.2px" }}>En cours</span>
                  <span style={{ fontSize: 15, color: T.onSurfaceVariant }}>{playingItems.length}</span>
                </div>
                <div className="no-scrollbar flex overflow-x-auto" style={{ gap: 12, margin: "0 -16px", padding: "0 16px", scrollSnapType: "x mandatory", scrollPaddingLeft: 16 }}>
                  {playingItems.map(({ f, g, follow }) => {
                    const lc = licColor(f, T);
                    const CatIcon = (CATEGORIES.find((c) => c.key === normalizeCategory(g.category)) || CATEGORIES[0]).Icon;
                    const doneCount = f.games.filter((x) => x.status === "done").length;
                    return (
                      <div
                        key={g.id}
                        role="button"
                        onClick={() => goToItem(f.id, g.id)}
                        className="m3-btn shrink-0 flex flex-col"
                        style={{
                          width: playingItems.length === 1 ? "100%" : "min(286px, 80vw)",
                          minHeight: compact ? 128 : 148,
                          boxSizing: "border-box",
                          borderRadius: 28,
                          background: lc.c2,
                          padding: 20,
                          gap: 6,
                          scrollSnapAlign: "start",
                          cursor: "pointer",
                          color: lc.text,
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0" style={{ color: lc.accent, fontSize: 13, fontWeight: 600 }}>
                          <CatIcon size={16} className="shrink-0" />
                          <span className="truncate">{f.name}</span>
                        </div>
                        <span style={{ fontSize: 20, fontWeight: 700, lineHeight: "26px", flex: "1 1 auto", overflowWrap: "anywhere" }}>{g.name}</span>
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="flex-1 min-w-0" style={{ fontSize: 12, lineHeight: "16px", opacity: 0.85 }}>
                            {doneCount}/{f.games.length} · {follow ? `ensuite : ${follow.name}` : "dernier de la liste"}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              advanceFranchise(f.id, g.id);
                            }}
                            className="m3-btn press shrink-0 flex items-center rounded-full"
                            style={{ height: 40, padding: "0 16px", gap: 6, background: lc.accent, color: lc.on, fontSize: 14, fontWeight: 600 }}
                          >
                            <Check size={16} strokeWidth={2.6} />
                            Terminé
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {loaded && franchises.length === 0 && (
              <div className="flex flex-col items-center text-center gap-3 px-6" style={{ paddingTop: 72 }}>
                <img src={LOGO_DATA_URI} alt="" width={64} height={64} draggable={false} style={{ borderRadius: 18, opacity: 0.9 }} />
                <span style={{ fontSize: 18, fontWeight: 600 }}>Aucune licence pour l'instant</span>
                <span style={{ fontSize: 14, color: T.onSurfaceVariant, lineHeight: "20px" }}>Tape le nom d'une licence dans la barre en haut, puis appuie sur +.</span>
              </div>
            )}
            {loaded && franchises.length > 0 && searchedCount === 0 && (
              <p className="text-center" style={{ fontSize: 14, color: T.onSurfaceVariant, padding: "40px 16px" }}>
                Aucune licence ne correspond à « {searchQuery} ». Appuie sur + pour la créer.
              </p>
            )}

            {activeFranchises.length > 0 && (
              <div className="flex items-baseline gap-2 px-1" style={{ marginTop: 28, marginBottom: 12 }}>
                <span style={{ fontSize: 22, fontWeight: 650, letterSpacing: "-0.2px" }}>Tes licences</span>
                <span style={{ fontSize: 15, color: T.onSurfaceVariant }}>{activeFranchises.length}</span>
                <span className="flex-1" />
                <span style={{ fontSize: 13, color: T.onSurfaceVariant, fontVariantNumeric: "tabular-nums" }}>
                  {stats.totalDone}/{stats.totalGames} · <span style={{ color: T.primary, fontWeight: 600 }}>{stats.pct} %</span>
                </span>
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
                    <span style={{ fontSize: 14, fontWeight: 600 }}>En pause</span>
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
              <span style={{ fontSize: 22, fontWeight: 500 }}>Paramètres</span>
            </div>
          </header>

          <main className="mx-auto w-full max-w-md px-4" style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom))" }}>
            <div className="px-4" style={{ fontSize: 14, fontWeight: 600, color: T.primary, margin: "8px 0 8px" }}>
              Apparence
            </div>
            <div className="rounded-3xl p-4" style={{ background: T.surfaceContainer }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>Couleur de l'app</div>
              <div style={{ fontSize: 13, color: T.onSurfaceVariant, marginBottom: 16 }}>Chaque licence a aussi sa propre couleur : appuie sur « Modifier » dans la licence.</div>
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

            <div className="px-4" style={{ fontSize: 14, fontWeight: 600, color: T.primary, margin: "24px 0 8px" }}>
              Données
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ background: T.surfaceContainer }}>
              {[
                { icon: <Download size={22} />, title: "Exporter mes données", sub: `Dernière sauvegarde : ${sinceLabel(lastBackup)}`, onClick: handleExport },
                {
                  icon: <Upload size={22} />,
                  title: "Importer une sauvegarde",
                  sub: "Ajoute les licences absentes, n'écrase rien",
                  onClick: () => fileInputRef.current && fileInputRef.current.click(),
                },
              ].map((it) => (
                <button key={it.title} onClick={it.onClick} className="m3-btn w-full flex items-center gap-4 px-4 text-left" style={{ minHeight: 72, color: T.onSurface }}>
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

            <div className="px-4" style={{ fontSize: 14, fontWeight: 600, color: T.primary, margin: "24px 0 8px" }}>
              Gestes
            </div>
            <div className="rounded-3xl p-4 flex flex-col gap-3" style={{ background: T.surfaceContainer, fontSize: 14, color: T.onSurfaceVariant, lineHeight: "20px" }}>
              <span>
                <b style={{ color: T.onSurface, fontWeight: 600 }}>Glisser à droite</b> sur un élément : statut suivant
              </span>
              <span>
                <b style={{ color: T.onSurface, fontWeight: 600 }}>Glisser à gauche</b> : modifier, dupliquer, supprimer
              </span>
              <span>
                <b style={{ color: T.onSurface, fontWeight: 600 }}>Appui long</b> : déplacer un élément ou une licence
              </span>
              <span>
                <b style={{ color: T.onSurface, fontWeight: 600 }}>Toucher le point</b> de la chronologie : changer le statut
              </span>
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
                padding: ghost.type === "game" ? "0 14px" : "0 16px",
                borderRadius: ghost.type === "game" ? 16 : 28,
                background: ghost.lc.c2,
                animation: `liftIn 180ms ${EASE} forwards`,
              }}
            >
              {ghost.type === "franchise" && <Cookie value={ghost.ratio} lc={ghost.lc} T={T} size={compact ? 40 : 48} />}
              {ghost.type === "game" && <StatusNode status={ghost.status} lc={ghost.lc} T={T} />}
              <span
                className="flex-1 min-w-0 truncate"
                style={{ fontSize: ghost.type === "game" ? 15 : 18, fontWeight: ghost.type === "game" ? 500 : 650, color: ghost.lc.text }}
              >
                {ghost.name}
              </span>
            </div>
          </div>,
          document.body
        )}

      {/* Feuille de modification (élément ou licence) */}
      <Overlay open={!!sheet} onClose={() => setSheet(null)} T={T} kind="sheet">
        {sheet && (
          <div className="flex flex-col gap-3 px-6 pt-2">
            <span style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{sheet.type === "rename" ? "Modifier la licence" : "Modifier"}</span>
            {sheet.type === "editGame" && sheetFranchise && <span style={{ fontSize: 14, color: T.onSurfaceVariant, marginTop: -8 }}>{sheetFranchise.name}</span>}
            <Field value={editName} onChange={setEditName} placeholder="Nom" T={T} autoFocus={sheet.type === "editGame"} onEnter={commitSheet} />
            {sheet.type === "rename" && (
              <>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.onSurfaceVariant, marginTop: 8 }}>Couleur de la licence</span>
                <div className="grid gap-y-3" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))", justifyItems: "center" }}>
                  {[...LIC_COLORS, { key: "neutre", label: "Neutre", accent: T.primary, on: T.onPrimary, card: T.surfaceContainerHighest }].map((c) => {
                    const on = editColor === c.key;
                    return (
                      <button key={c.key} onClick={() => setEditColor(c.key)} aria-label={c.label} className="press flex flex-col items-center gap-1">
                        <span
                          className="flex items-center justify-center rounded-full"
                          style={{
                            width: 40,
                            height: 40,
                            background: c.key === "neutre" ? T.surfaceContainerHighest : c.accent,
                            border: c.key === "neutre" ? `2px solid ${T.primary}` : "none",
                            boxSizing: "border-box",
                            color: c.key === "neutre" ? T.primary : c.on,
                            boxShadow: on ? `0 0 0 3px ${T.surfaceContainer}, 0 0 0 5px ${c.accent}` : "none",
                          }}
                        >
                          {on && <Check size={18} strokeWidth={2.6} />}
                        </span>
                        <span style={{ fontSize: 11, color: on ? T.onSurface : T.onSurfaceVariant }}>{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
            {sheet.type === "editGame" && (
              <>
                <Field
                  icon={<StickyNote size={18} color={T.onSurfaceVariant} className="shrink-0" />}
                  value={editNote}
                  onChange={setEditNote}
                  placeholder="Note (ex. : faire le DLC)"
                  T={T}
                  onEnter={commitSheet}
                />
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
              <button onClick={() => setSheet(null)} className="m3-btn rounded-full px-4" style={{ height: 40, fontSize: 14, fontWeight: 600, color: T.primary }}>
                Annuler
              </button>
              <button
                onClick={commitSheet}
                className="m3-btn press rounded-full px-6"
                style={{ height: 40, fontSize: 14, fontWeight: 600, background: T.primary, color: T.onPrimary }}
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </Overlay>

      {/* Barre Annuler */}
      {undo && (
        <div
          key={undo.key}
          className="rota-root"
          style={{
            position: "fixed",
            left: 16,
            right: 16,
            bottom: "calc(16px + env(safe-area-inset-bottom))",
            zIndex: 85,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
            fontFamily: FONT,
          }}
        >
          <div
            className="flex items-center gap-2"
            style={{
              pointerEvents: "auto",
              width: "100%",
              maxWidth: 448,
              minHeight: 48,
              borderRadius: 12,
              background: "#E6E1E5",
              color: "#313033",
              padding: "4px 4px 4px 16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
              animation: `snackIn 240ms ${EASE}`,
            }}
          >
            <span className="flex-1 min-w-0 truncate" style={{ fontSize: 14, lineHeight: "20px" }}>
              {undo.label}
            </span>
            <button onClick={doUndo} className="m3-btn shrink-0 rounded-full" style={{ height: 40, padding: "0 12px", fontSize: 14, fontWeight: 700, color: T.onPrimary === "#2E2E2E" ? "#2E2E2E" : T.primaryContainer }}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Affichage et tri */}
      <Overlay open={showOptions} onClose={() => setShowOptions(false)} T={T} kind="sheet">
        <div className="flex flex-col px-6 pt-2">
          <span style={{ fontSize: 22, fontWeight: 500, marginBottom: 16 }}>Affichage</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.onSurfaceVariant, marginBottom: 8 }}>Trier les licences</span>
          <div className="flex rounded-full overflow-hidden" style={{ height: 40, border: `1px solid ${T.outlineVariant}`, marginBottom: 12 }}>
            {[
              { key: "manual", icon: <ArrowUpDown size={16} /> },
              { key: "alpha", icon: <ArrowDownAZ size={16} /> },
              { key: "completion", icon: <TrendingUp size={16} /> },
            ].map((o, idx) => {
              const on = sortMode === o.key;
              return (
                <button
                  key={o.key}
                  onClick={() => setSortMode(o.key)}
                  className="m3-btn flex-1 min-w-0 flex items-center justify-center gap-1.5"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    background: on ? T.primaryContainer : "transparent",
                    color: on ? T.onPrimaryContainer : T.onSurfaceVariant,
                    borderLeft: idx === 0 ? "none" : `1px solid ${T.outlineVariant}`,
                    transition: "background-color 200ms ease, color 200ms ease",
                  }}
                >
                  {on ? <Check size={16} /> : o.icon}
                  {SORT_LABELS[o.key]}
                </button>
              );
            })}
          </div>
          {[
            { label: "Masquer les terminés", sub: "Cache les éléments déjà finis", on: hideCompleted, onClick: () => setHideCompleted((h) => !h) },
            { label: "Mode compact", sub: "Lignes et cartes plus fines", on: compact, onClick: toggleCompact },
          ].map((r) => (
            <button key={r.label} onClick={r.onClick} className="m3-btn flex items-center gap-4 text-left rounded-2xl" style={{ minHeight: 64, padding: "0 4px", color: T.onSurface }}>
              <span className="flex flex-col flex-1 min-w-0">
                <span style={{ fontSize: 16 }}>{r.label}</span>
                <span style={{ fontSize: 13, color: T.onSurfaceVariant }}>{r.sub}</span>
              </span>
              <Switch on={r.on} T={T} />
            </button>
          ))}
          <button
            onClick={() => {
              setShowOptions(false);
              setTimeout(pickRandom, 180);
            }}
            className="m3-btn press flex items-center justify-center gap-2 rounded-full"
            style={{ height: 48, marginTop: 12, background: T.primaryContainer, color: T.onPrimaryContainer, fontSize: 15, fontWeight: 600 }}
          >
            <Dices size={20} />
            Tirer au sort quoi faire
          </button>
        </div>
      </Overlay>

      {/* Confirmation de suppression */}
      <Overlay open={!!confirmDelete} onClose={() => setConfirmDelete(null)} T={T}>
        {confirmDelete && (
          <div className="p-6 flex flex-col gap-4">
            <span style={{ fontSize: 22, lineHeight: "28px", fontWeight: 500 }}>Supprimer {confirmDelete.type === "franchise" ? "la licence" : "l'élément"} ?</span>
            <span style={{ fontSize: 14, color: T.onSurfaceVariant, lineHeight: "20px" }}>
              « {confirmDelete.label} » sera supprimé{confirmDelete.type === "franchise" ? "e avec tout son contenu" : ""}. Cette action est irréversible.
            </span>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={() => setConfirmDelete(null)} className="m3-btn rounded-full px-4" style={{ height: 40, fontSize: 14, fontWeight: 600, color: T.primary }}>
                Annuler
              </button>
              <button onClick={confirmDeleteNow} className="m3-btn rounded-full px-4" style={{ height: 40, fontSize: 14, fontWeight: 600, color: T.danger }}>
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
                <span style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>Rien à piocher</span>
                <span style={{ fontSize: 14, color: T.onSurfaceVariant, marginBottom: 12 }}>Aucun élément « à faire » dans tes licences actives.</span>
                <button onClick={() => setRandomPick(null)} className="m3-btn rounded-full px-4" style={{ height: 40, fontSize: 14, fontWeight: 600, color: T.primary }}>
                  Fermer
                </button>
              </>
            ) : (
              <>
                <span style={{ fontSize: 13, color: T.onSurfaceVariant, marginTop: 12 }}>{randomPick.franchiseName}</span>
                <span style={{ fontSize: 18, fontWeight: 650, marginBottom: 16, lineHeight: "24px" }}>{randomPick.gameName}</span>
                <div className="flex items-center justify-center gap-2">
                  <button onClick={pickRandom} className="m3-btn rounded-full px-4" style={{ height: 40, fontSize: 14, fontWeight: 600, color: T.primary }}>
                    Relancer
                  </button>
                  <button
                    onClick={() => goToItem(randomPick.franchiseId, randomPick.gameId)}
                    className="m3-btn press rounded-full px-6"
                    style={{ height: 40, fontSize: 14, fontWeight: 600, background: T.primaryContainer, color: T.onPrimaryContainer }}
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
