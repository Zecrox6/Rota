import { useState, useEffect, useRef } from "react";
import {
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Trash2,
  ExternalLink,
  Link2,
  Gamepad2,
  Eye,
  EyeOff,
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
} from "lucide-react";

const LOGO_DATA_URI = "data:image/png;base64,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";

// Tokens neutres (base noire AMOLED, ne change pas selon l'accent choisi)
const NEUTRAL = {
  surface: "#000000",
  surfaceContainerLow: "#0B0B0D",
  surfaceContainer: "#151316",
  surfaceContainerHigh: "#1F1B20",
  surfaceContainerHighest: "#2A252C",
  onSurface: "#E6E1E5",
  onSurfaceVariant: "#CAC4D0",
  outlineVariant: "#49454F",
  tertiaryContainer: "#633B48",
  onTertiaryContainer: "#FFD8E4",
  success: "#8FD99F",
  danger: "#FF6E6E",
};

// Presets d'accent (palettes tonales Material 3 sombres) — seule la teinte "primary" change
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

async function openLink(rawLink) {
  const link = normalizeLink(rawLink);
  if (!link) return;
  if (typeof window !== "undefined" && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
    try {
      const { Browser } = await import("@capacitor/browser");
      await Browser.open({ url: link });
      return;
    } catch (e) {
      // plugin indisponible, on retombe sur le comportement web
    }
  }
  window.open(link, "_blank", "noopener,noreferrer");
}

async function triggerHaptic() {
  try {
    if (typeof window !== "undefined" && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
      const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
      await Haptics.impact({ style: ImpactStyle.Light });
      return;
    }
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(40);
  } catch (e) {
    // pas grave si ça échoue, c'est juste un petit plus
  }
}

function highlightMatch(text, query, T) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ background: T.primaryContainer, color: T.onPrimaryContainer, borderRadius: 3 }}>
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
  const [draggingId, setDraggingId] = useState(null);
  const [dragGhost, setDragGhost] = useState(null);
  const [draggingFranchiseId, setDraggingFranchiseId] = useState(null);
  const [franchiseGhost, setFranchiseGhost] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [editingGameId, setEditingGameId] = useState(null);
  const [openMenuGameId, setOpenMenuGameId] = useState(null);
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
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showRemaining, setShowRemaining] = useState(false);

  const accent = ACCENTS.find((a) => a.key === accentKey) || ACCENTS[0];
  const T = { ...NEUTRAL, ...accent };
  const STATUS = {
    todo: { label: "À faire", bg: T.surfaceContainerHighest, text: T.onSurfaceVariant },
    playing: { label: "En cours", bg: T.tertiaryContainer, text: T.onTertiaryContainer },
    done: { label: "Terminé", bg: T.primary, text: T.onPrimary },
  };

  const franchisesRef = useRef(franchises);
  const fileInputRef = useRef(null);
  const dragInfo = useRef(null);
  const dragPendingRef = useRef(null);
  const franchiseDragPendingRef = useRef(null);
  const itemRefs = useRef({});
  const franchiseDragInfo = useRef(null);
  const franchiseRefs = useRef({});

  useEffect(() => {
    franchisesRef.current = franchises;
  }, [franchises]);

  useEffect(() => {
    function onPopState() {
      setView("home");
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function openSettings() {
    window.history.pushState({ view: "settings" }, "");
    setView("settings");
  }

  function closeSettings() {
    window.history.back();
  }

  function goToItem(franchiseId, gameId) {
    setRandomPick(null);
    setExpanded((e) => ({ ...e, [franchiseId]: true }));
    setTimeout(() => {
      const el = itemRefs.current[gameId];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }

  function pickRandom() {
    setDiceFace(Math.floor(Math.random() * 6) + 1);
    setRollId((id) => id + 1);
    const candidates = [];
    franchises.forEach((f) => {
      if (f.paused) return;
      f.games.forEach((g) => {
        if (g.status === "todo") candidates.push({ franchiseId: f.id, franchiseName: f.name, gameId: g.id, gameName: g.name });
      });
    });
    if (candidates.length === 0) {
      setRandomPick({ empty: true });
      return;
    }
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    setRandomPick(pick);
  }

  function jumpToPlaying() {
    for (const f of activeFranchises) {
      const playing = f.games.find((g) => g.status === "playing");
      if (playing) {
        goToItem(f.id, playing.id);
        return;
      }
    }
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("licences-data");
      const data = raw ? JSON.parse(raw) : [];
      setFranchises(Array.isArray(data) ? data : []);
    } catch (e) {
      setFranchises([]);
    } finally {
      setLoaded(true);
    }
    try {
      const savedAccent = localStorage.getItem("rota-accent");
      if (savedAccent && ACCENTS.some((a) => a.key === savedAccent)) setAccentKey(savedAccent);
    } catch (e) {
      // pas de préférence enregistrée, on garde le violet par défaut
    }
  }, []);

  function selectAccent(key) {
    setAccentKey(key);
    try {
      localStorage.setItem("rota-accent", key);
    } catch (e) {
      console.error("Erreur de sauvegarde", e);
    }
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(franchises, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rota-sauvegarde.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) return;
        const existingNames = new Set(franchises.map((f) => f.name.toLowerCase()));
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
        persist([...franchises, ...cleaned]);
      } catch (err) {
        console.error("Import invalide", err);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function persist(next) {
    setFranchises(next);
    try {
      localStorage.setItem("licences-data", JSON.stringify(next));
    } catch (e) {
      console.error("Erreur de sauvegarde", e);
    }
  }

  function commitOrder() {
    try {
      localStorage.setItem("licences-data", JSON.stringify(franchisesRef.current));
    } catch (e) {
      console.error("Erreur de sauvegarde", e);
    }
  }

  function addFranchise() {
    const name = searchQuery.trim();
    if (!name) return;
    const f = { id: uid(), name, paused: false, games: [] };
    persist([...franchises, f]);
    setSearchQuery("");
    setExpanded((e) => ({ ...e, [f.id]: true }));
    setJustAddedFranchiseId(f.id);
    setTimeout(() => setJustAddedFranchiseId((cur) => (cur === f.id ? null : cur)), 400);
  }

  function deleteFranchise(id) {
    persist(franchisesRef.current.filter((f) => f.id !== id));
  }

  function deleteGame(franchiseId, gameId) {
    persist(
      franchisesRef.current.map((f) =>
        f.id === franchiseId ? { ...f, games: f.games.filter((g) => g.id !== gameId) } : f
      )
    );
  }

  function duplicateGame(franchiseId, gameId) {
    persist(
      franchises.map((f) => {
        if (f.id !== franchiseId) return f;
        const idx = f.games.findIndex((g) => g.id === gameId);
        if (idx === -1) return f;
        const copy = { ...f.games[idx], id: uid(), status: "todo" };
        const games = [...f.games];
        games.splice(idx + 1, 0, copy);
        return { ...f, games };
      })
    );
  }

  function confirmDeleteNow() {
    if (!confirmDelete) return;
    if (confirmDelete.type === "franchise") deleteFranchise(confirmDelete.franchiseId);
    else deleteGame(confirmDelete.franchiseId, confirmDelete.gameId);
    setConfirmDelete(null);
  }

  function duplicateFranchise(f) {
    const copy = {
      id: uid(),
      name: `${f.name} (copie)`,
      paused: false,
      games: f.games.map((g) => ({ ...g, id: uid(), status: "todo" })),
    };
    const idx = franchises.findIndex((fr) => fr.id === f.id);
    const next = [...franchises];
    next.splice(idx + 1, 0, copy);
    persist(next);
  }

  function togglePause(id) {
    persist(franchises.map((f) => (f.id === id ? { ...f, paused: !f.paused } : f)));
  }

  function startRename(f) {
    setRenamingId(f.id);
    setRenameValue(f.name);
  }

  function commitRename(franchiseId) {
    const name = renameValue.trim();
    setRenamingId(null);
    if (!name) return;
    persist(franchises.map((f) => (f.id === franchiseId ? { ...f, name } : f)));
  }

  function startEditGame(g) {
    setEditingGameId(g.id);
    setEditName(g.name);
    setEditLink(g.link || "");
    setEditPlatform(g.platform || "");
  }

  function cancelEditGame() {
    setEditingGameId(null);
  }

  function commitEditGame() {
    const name = editName.trim();
    const id = editingGameId;
    if (!name || !id) {
      setEditingGameId(null);
      return;
    }
    const link = normalizeLink(editLink.trim());
    const platform = editPlatform.trim();
    persist(
      franchises.map((f) => ({
        ...f,
        games: f.games.map((g) => (g.id === id ? { ...g, name, link: link || null, platform: platform || null } : g)),
      }))
    );
    setEditingGameId(null);
  }

  function addGame(franchiseId) {
    const name = (newGameInputs[franchiseId] || "").trim();
    if (!name) return;
    const category = newGameCategory[franchiseId] || "jeux";
    const link = normalizeLink((newGameLink[franchiseId] || "").trim());
    const platform = (newGamePlatform[franchiseId] || "").trim();
    const newId = uid();
    const next = franchises.map((f) =>
      f.id === franchiseId
        ? {
            ...f,
            games: [
              ...f.games,
              { id: newId, name, status: "todo", category, link: link || null, platform: platform || null },
            ],
          }
        : f
    );
    persist(next);
    setNewGameInputs((s) => ({ ...s, [franchiseId]: "" }));
    setNewGameLink((s) => ({ ...s, [franchiseId]: "" }));
    setNewGamePlatform((s) => ({ ...s, [franchiseId]: "" }));
    setShowLinkField((s) => ({ ...s, [franchiseId]: false }));
    setShowPlatformField((s) => ({ ...s, [franchiseId]: false }));
    setJustAddedGameId(newId);
    setTimeout(() => setJustAddedGameId((cur) => (cur === newId ? null : cur)), 400);
  }

  function isFullyDone(f) {
    return f.games.length > 0 && f.games.every((g) => g.status === "done");
  }

  function cycleStatus(franchiseId, gameId) {
    const before = franchises.find((f) => f.id === franchiseId);
    const wasFullyDone = before ? isFullyDone(before) : false;
    const next = franchises.map((f) => {
      if (f.id !== franchiseId) return f;
      return {
        ...f,
        games: f.games.map((g) => {
          if (g.id !== gameId) return g;
          const idx = ORDER.indexOf(g.status);
          return { ...g, status: ORDER[(idx + 1) % ORDER.length] };
        }),
      };
    });
    persist(next);
    const after = next.find((f) => f.id === franchiseId);
    if (after && !wasFullyDone && isFullyDone(after)) triggerHaptic();
  }

  function advanceFranchise(franchiseId) {
    const f = franchises.find((fr) => fr.id === franchiseId);
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
    const next = franchises.map((fr) => (fr.id === franchiseId ? { ...fr, games } : fr));
    persist(next);
    const after = next.find((fr) => fr.id === franchiseId);
    if (after && !wasFullyDone && isFullyDone(after)) triggerHaptic();
  }

  // --- drag & drop des jeux à l'intérieur d'une catégorie ---
  function reorderLive(franchiseId, categoryKey, itemId, newIndex) {
    setFranchises((prev) => {
      const next = prev.map((f) => {
        if (f.id !== franchiseId) return f;
        const items = f.games.filter((g) => normalizeCategory(g.category) === categoryKey);
        const fromIndex = items.findIndex((g) => g.id === itemId);
        if (fromIndex === -1 || fromIndex === newIndex) return f;
        const reordered = [...items];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(newIndex, 0, moved);
        const newGames = CATEGORIES.flatMap((cat) =>
          cat.key === categoryKey ? reordered : f.games.filter((g) => normalizeCategory(g.category) === cat.key)
        );
        return { ...f, games: newGames };
      });
      franchisesRef.current = next;
      return next;
    });
  }

  function handleGripDown(e, franchiseId, categoryKey, itemId, game) {
    if (e.target.closest("[data-no-drag]")) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const pointerId = e.pointerId;
    const targetEl = e.currentTarget;

    const cleanup = () => {
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowEnd);
      window.removeEventListener("pointercancel", onWindowEnd);
    };

    const timerId = setTimeout(() => {
      cleanup();
      dragPendingRef.current = null;
      try {
        targetEl.setPointerCapture(pointerId);
      } catch (err) {}
      const rowEl = itemRefs.current[itemId];
      const rect = rowEl ? rowEl.getBoundingClientRect() : null;
      dragInfo.current = { franchiseId, categoryKey, itemId, startY };
      setDraggingId(itemId);
      if (rect) {
        setDragGhost({ name: game.name, status: game.status, left: rect.left, top: rect.top, width: rect.width, height: rect.height, offsetY: 0 });
      }
    }, 350);

    function onWindowMove(ev) {
      if (Math.abs(ev.clientX - startX) > 8 || Math.abs(ev.clientY - startY) > 8) {
        clearTimeout(timerId);
        cleanup();
        dragPendingRef.current = null;
      }
    }
    function onWindowEnd() {
      clearTimeout(timerId);
      cleanup();
      dragPendingRef.current = null;
    }
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowEnd);
    window.addEventListener("pointercancel", onWindowEnd);

    dragPendingRef.current = { timerId, startX, startY, itemId };
  }

  function handleGripMove(e, itemId) {
    const info = dragInfo.current;
    if (!info || info.itemId !== itemId) return;
    setDragGhost((g) => (g ? { ...g, offsetY: e.clientY - info.startY } : g));
    const f = franchisesRef.current.find((fr) => fr.id === info.franchiseId);
    if (!f) return;
    const items = f.games.filter((g) => normalizeCategory(g.category) === info.categoryKey);
    let newIndex = items.length - 1;
    for (let i = 0; i < items.length; i++) {
      const el = itemRefs.current[items[i].id];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (e.clientY < rect.top + rect.height / 2) {
        newIndex = i;
        break;
      }
    }
    reorderLive(info.franchiseId, info.categoryKey, itemId, newIndex);
  }

  function handleGripUp(e, itemId) {
    const info = dragInfo.current;
    if (!info || info.itemId !== itemId) return;
    dragInfo.current = null;
    setDraggingId(null);
    setDragGhost(null);
    commitOrder();
  }

  // --- drag & drop des licences elles-mêmes (liste active uniquement) ---
  function visibleActiveIds() {
    return franchisesRef.current
      .filter((f) => !f.paused && f.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
      .map((f) => f.id);
  }

  function reorderFranchiseLive(itemId, newIndex) {
    setFranchises((prev) => {
      const activeIds = prev
        .filter((f) => !f.paused && f.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
        .map((f) => f.id);
      const fromIndex = activeIds.indexOf(itemId);
      if (fromIndex === -1 || fromIndex === newIndex) return prev;
      const reorderedIds = [...activeIds];
      const [moved] = reorderedIds.splice(fromIndex, 1);
      reorderedIds.splice(newIndex, 0, moved);
      const byId = Object.fromEntries(prev.map((f) => [f.id, f]));
      let ai = 0;
      const next = prev.map((f) => {
        if (activeIds.includes(f.id)) {
          return byId[reorderedIds[ai++]];
        }
        return f;
      });
      franchisesRef.current = next;
      return next;
    });
  }

  function handleFranchiseGripDown(e, f) {
    if (e.target.closest("[data-no-drag]")) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const pointerId = e.pointerId;
    const targetEl = e.currentTarget;

    const cleanup = () => {
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowEnd);
      window.removeEventListener("pointercancel", onWindowEnd);
    };

    const timerId = setTimeout(() => {
      cleanup();
      franchiseDragPendingRef.current = null;
      try {
        targetEl.setPointerCapture(pointerId);
      } catch (err) {}
      const rowEl = franchiseRefs.current[f.id];
      const rect = rowEl ? rowEl.getBoundingClientRect() : null;
      franchiseDragInfo.current = { itemId: f.id, startY };
      setDraggingFranchiseId(f.id);
      if (rect) {
        setFranchiseGhost({ name: f.name, left: rect.left, top: rect.top, width: rect.width, height: rect.height, offsetY: 0 });
      }
    }, 350);

    function onWindowMove(ev) {
      if (Math.abs(ev.clientX - startX) > 8 || Math.abs(ev.clientY - startY) > 8) {
        clearTimeout(timerId);
        cleanup();
        franchiseDragPendingRef.current = null;
      }
    }
    function onWindowEnd() {
      clearTimeout(timerId);
      cleanup();
      franchiseDragPendingRef.current = null;
    }
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowEnd);
    window.addEventListener("pointercancel", onWindowEnd);

    franchiseDragPendingRef.current = { timerId, startX, startY, itemId: f.id };
  }

  function handleFranchiseGripMove(e, itemId) {
    const info = franchiseDragInfo.current;
    if (!info || info.itemId !== itemId) return;
    setFranchiseGhost((g) => (g ? { ...g, offsetY: e.clientY - info.startY } : g));
    const ids = visibleActiveIds();
    let newIndex = ids.length - 1;
    for (let i = 0; i < ids.length; i++) {
      const el = franchiseRefs.current[ids[i]];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (e.clientY < rect.top + rect.height / 2) {
        newIndex = i;
        break;
      }
    }
    reorderFranchiseLive(itemId, newIndex);
  }

  function handleFranchiseGripUp(e, itemId) {
    const info = franchiseDragInfo.current;
    if (!info || info.itemId !== itemId) return;
    franchiseDragInfo.current = null;
    setDraggingFranchiseId(null);
    setFranchiseGhost(null);
    commitOrder();
  }

  const totalGames = franchises.reduce((a, f) => a + f.games.length, 0);
  const totalDone = franchises.reduce((a, f) => a + f.games.filter((g) => g.status === "done").length, 0);
  const pct = totalGames ? Math.round((totalDone / totalGames) * 100) : 0;
  const fullyDone = franchises.filter((f) => f.games.length > 0 && f.games.every((g) => g.status === "done")).length;

  const searched = franchises.filter((f) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    if (f.name.toLowerCase().includes(q)) return true;
    return f.games.some((g) => g.name.toLowerCase().includes(q));
  });
  const activeFranchisesRaw = searched.filter((f) => !f.paused);
  const pausedFranchises = searched.filter((f) => f.paused);

  function completionPct(f) {
    return f.games.length ? f.games.filter((g) => g.status === "done").length / f.games.length : 0;
  }

  const activeFranchises =
    sortMode === "alpha"
      ? [...activeFranchisesRaw].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
      : sortMode === "completion"
      ? [...activeFranchisesRaw].sort((a, b) => completionPct(b) - completionPct(a))
      : activeFranchisesRaw;

  function renderFranchiseCard(f, draggable) {
    const done = f.games.filter((g) => g.status === "done").length;
    const total = f.games.length;
    const q = searchQuery.trim().toLowerCase();
    const matchesInside = q && !f.name.toLowerCase().includes(q) && f.games.some((g) => g.name.toLowerCase().includes(q));
    const isOpen = !!expanded[f.id] || matchesInside;
    const activeCategory = newGameCategory[f.id] || "jeux";
    const upNext = nextStep(f.games);
    const typedName = (newGameInputs[f.id] || "").trim().toLowerCase();
    const isDuplicateName = typedName && f.games.some((g) => g.name.trim().toLowerCase() === typedName);

    return (
      <div
        key={f.id}
        ref={(el) => (franchiseRefs.current[f.id] = el)}
        className="rounded-3xl overflow-hidden"
        style={{
          background: T.surfaceContainer,
          opacity: draggingFranchiseId === f.id ? 0.3 : 1,
          animation: justAddedFranchiseId === f.id ? "itemIn 280ms cubic-bezier(0.2,0,0,1)" : "none",
        }}
      >
        <div className="w-full flex flex-col gap-1 px-2 py-4">
          <div
            className="w-full flex items-center gap-1"
            onPointerDown={draggable ? (e) => handleFranchiseGripDown(e, f) : undefined}
            onPointerMove={draggable ? (e) => handleFranchiseGripMove(e, f.id) : undefined}
            onPointerUp={draggable ? (e) => handleFranchiseGripUp(e, f.id) : undefined}
            style={draggable ? { touchAction: "pan-x", userSelect: "none", WebkitUserSelect: "none" } : undefined}
          >
            <button
              onClick={() => setExpanded((e) => ({ ...e, [f.id]: !e[f.id] }))}
              className="m3-press flex items-center gap-2 min-w-0 flex-1 text-left"
            >
              <div
                className="shrink-0 flex items-center"
                style={{ transition: "transform 220ms ease", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                <ChevronRight size={18} color={T.onSurfaceVariant} />
              </div>
              <div
                className="no-scrollbar min-w-0 flex-1 overflow-x-auto"
                style={{ whiteSpace: "nowrap" }}
              >
                <span style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, fontSize: "1.05rem", color: T.onSurface }}>
                  {highlightMatch(f.name, searchQuery, T)}
                </span>
              </div>
            </button>

            <div className="flex items-center gap-2 shrink-0 ml-2">
              {renamingId === f.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitRename(f.id);
                    if (e.key === "Escape") setRenamingId(null);
                  }}
                  onBlur={() => commitRename(f.id)}
                  className="text-sm rounded-lg px-2 py-1 outline-none"
                  style={{ background: T.surfaceContainerHigh, color: T.onSurface, width: 120 }}
                />
              ) : (
                <>
                  <button onClick={() => startRename(f)} aria-label="Renommer" style={{ color: T.onSurfaceVariant }}>
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setShowRemaining((v) => !v)}
                    className="text-xs whitespace-nowrap"
                    style={{ fontFamily: "'Roboto Mono', monospace", color: T.onSurfaceVariant, fontWeight: 600 }}
                  >
                    {showRemaining
                      ? `-${total - done} restant${total - done > 1 ? "s" : ""}`
                      : `${done}/${total} · ${total ? Math.round((done / total) * 100) : 0}%`}
                  </button>
                </>
              )}
            </div>
          </div>

          {upNext ? (
            <span className="text-xs pl-8" style={{ color: T.primary, fontWeight: 500 }}>
              {upNext.status === "playing" ? "En cours : " : "Prochaine étape : "}
              {upNext.name}
            </span>
          ) : total > 0 ? (
            <span className="text-xs pl-8" style={{ color: T.success, fontWeight: 500 }}>
              Terminé ✓
            </span>
          ) : null}
        </div>

        <div className="h-1 w-full" style={{ background: T.surfaceContainerHigh }}>
          <div
            className="h-full transition-all duration-500"
            style={{ width: total ? `${(done / total) * 100}%` : "0%", background: T.primary }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            transition: "grid-template-rows 280ms cubic-bezier(0.2,0,0,1)",
          }}
        >
          <div style={{ overflow: "hidden", minHeight: 0 }}>
            <div className="px-5 py-4 flex flex-col gap-4">
              {upNext && (
                <button
                  onClick={() => advanceFranchise(f.id)}
                  className="m3-press flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-2xl"
                  style={{ background: T.primaryContainer, color: T.onPrimaryContainer, fontWeight: 500 }}
                >
                  <CheckCheck size={16} /> Valider & passer au suivant
              </button>
            )}

            {total === 0 && (
              <p className="text-xs py-1" style={{ color: T.onSurfaceVariant }}>
                Aucun jeu ajouté.
              </p>
            )}

            {CATEGORIES.map((cat) => {
              const items = f.games.filter(
                (g) => normalizeCategory(g.category) === cat.key && (!hideCompleted || g.status !== "done")
              );
              if (items.length === 0) return null;
              const catKey = `${f.id}:${cat.key}`;
              const catCollapsed = !!collapsedCategories[catKey];
              return (
                <div key={cat.key} className="flex flex-col gap-2">
                  <button
                    onClick={() => setCollapsedCategories((s) => ({ ...s, [catKey]: !s[catKey] }))}
                    className="flex items-center gap-1.5 self-start"
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        transition: "transform 220ms ease",
                        transform: catCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={14} color={T.onSurfaceVariant} />
                    </span>
                    <span className="text-sm" style={{ color: T.onSurface, fontWeight: 700 }}>
                      {cat.label}
                    </span>
                    <span className="text-xs" style={{ color: T.onSurfaceVariant, fontFamily: "'Roboto Mono', monospace" }}>
                      {items.length}
                    </span>
                  </button>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: catCollapsed ? "0fr" : "1fr",
                      transition: "grid-template-rows 240ms cubic-bezier(0.2,0,0,1)",
                    }}
                  >
                    <div style={{ overflow: "hidden", minHeight: 0 }}>
                      <div className="flex flex-col gap-2">
                        {items.map((g, i) => {
                    const s = STATUS[g.status];
                    const isEditing = editingGameId === g.id;
                    const menuOpen = openMenuId === g.id;
                    return (
                      <div
                        key={g.id}
                        ref={(el) => (itemRefs.current[g.id] = el)}
                        className="flex flex-col gap-1.5"
                        style={{
                          animation: justAddedGameId === g.id ? "itemIn 280ms cubic-bezier(0.2,0,0,1)" : "none",
                        }}
                      >
                        <div className="flex items-center gap-1.5 min-w-0" style={{ opacity: draggingId === g.id ? 0.3 : 1 }}>
                          <span
                            className="text-xs shrink-0"
                            style={{ fontFamily: "'Roboto Mono', monospace", color: T.onSurfaceVariant, width: "1.05rem" }}
                          >
                            {i + 1}
                          </span>
                          <div
                            onPointerDown={(e) => handleGripDown(e, f.id, cat.key, g.id, g)}
                            onPointerMove={(e) => handleGripMove(e, g.id)}
                            onPointerUp={(e) => handleGripUp(e, g.id)}
                            className="flex-1 min-w-0 flex items-center justify-between rounded-2xl px-4 py-2.5 gap-3"
                            style={{ background: T.surfaceContainerHigh, touchAction: "pan-x", cursor: "grab" }}
                          >
                            <div className="no-scrollbar min-w-0 flex-1 overflow-x-auto" style={{ whiteSpace: "nowrap" }}>
                              <span className="text-base" style={{ color: T.onSurface }}>
                                {highlightMatch(g.name, searchQuery, T)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {g.platform && (
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{ background: T.surfaceContainerHighest, color: T.onSurfaceVariant }}
                                >
                                  {g.platform}
                                </span>
                              )}
                              {g.link && (
                                <button
                                  onClick={() => openLink(g.link)}
                                  className="m3-press flex items-center justify-center rounded-full"
                                  style={{ width: 24, height: 24, background: T.surfaceContainerHighest }}
                                  aria-label="Voir le lien"
                                >
                                  <ExternalLink size={12} color={T.onSurfaceVariant} />
                                </button>
                              )}
                              <button
                                onClick={() => cycleStatus(f.id, g.id)}
                                className="m3-press text-xs px-2.5 py-1 rounded-full"
                                style={{ background: s.bg, color: s.text, fontWeight: 500 }}
                              >
                                {s.label}
                              </button>
                            </div>
                          </div>
                          <div className="relative shrink-0">
                            <button
                              onClick={() => setOpenMenuId((id) => (id === g.id ? null : g.id))}
                              aria-label="Options"
                              style={{ color: T.onSurfaceVariant }}
                            >
                              <MoreVertical size={18} />
                            </button>
                            {menuOpen && (
                              <>
                                <div
                                  style={{ position: "fixed", inset: 0, zIndex: 35 }}
                                  onClick={() => setOpenMenuId(null)}
                                />
                                <div
                                  className="flex flex-col rounded-2xl overflow-hidden"
                                  style={{
                                    position: "absolute",
                                    top: 24,
                                    right: 0,
                                    zIndex: 40,
                                    minWidth: 160,
                                    background: T.surfaceContainerHighest,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                                    animation: "popIn 150ms cubic-bezier(0.2,0,0,1)",
                                    transformOrigin: "top right",
                                  }}
                                >
                                  <button
                                    onClick={() => {
                                      startEditGame(g);
                                      setOpenMenuId(null);
                                    }}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-left"
                                    style={{ color: T.onSurface }}
                                  >
                                    <Pencil size={14} /> Modifier
                                  </button>
                                  <button
                                    onClick={() => {
                                      duplicateGame(f.id, g.id);
                                      setOpenMenuId(null);
                                    }}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-left"
                                    style={{ color: T.onSurface }}
                                  >
                                    <Copy size={14} /> Dupliquer
                                  </button>
                                  <button
                                    onClick={() => {
                                      setConfirmDelete({ type: "game", franchiseId: f.id, gameId: g.id, label: g.name });
                                      setOpenMenuId(null);
                                    }}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-left"
                                    style={{ color: T.danger }}
                                  >
                                    <Trash2 size={14} /> Supprimer
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {isEditing && (
                          <div className="flex flex-col gap-2 pl-8">
                            <div
                              className="flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5"
                              style={{ background: T.surfaceContainerHigh, border: `1px solid ${T.outlineVariant}` }}
                            >
                              <input
                                autoFocus
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Nom"
                                className="flex-1 bg-transparent text-sm outline-none"
                                style={{ color: T.onSurface }}
                              />
                            </div>
                            <div
                              className="flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5"
                              style={{ background: T.surfaceContainerHigh, border: `1px solid ${T.outlineVariant}` }}
                            >
                              <Link2 size={13} color={T.onSurfaceVariant} className="shrink-0" />
                              <input
                                value={editLink}
                                onChange={(e) => setEditLink(e.target.value)}
                                placeholder="Lien (optionnel)"
                                className="flex-1 bg-transparent text-xs outline-none"
                                style={{ color: T.onSurface }}
                              />
                            </div>
                            <div
                              className="flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5"
                              style={{ background: T.surfaceContainerHigh, border: `1px solid ${T.outlineVariant}` }}
                            >
                              <Gamepad2 size={13} color={T.onSurfaceVariant} className="shrink-0" />
                              <input
                                value={editPlatform}
                                onChange={(e) => setEditPlatform(e.target.value)}
                                placeholder="Plateforme (optionnel)"
                                className="flex-1 bg-transparent text-xs outline-none"
                                style={{ color: T.onSurface }}
                              />
                            </div>
                            <div className="flex flex-wrap gap-1.5 px-1">
                              {PLATFORM_PRESETS.map((p) => (
                                <button
                                  key={p}
                                  onClick={() => setEditPlatform(p)}
                                  className="m3-press text-xs px-2.5 py-1 rounded-full"
                                  style={{
                                    background: editPlatform === p ? T.primaryContainer : T.surfaceContainerHigh,
                                    color: editPlatform === p ? T.onPrimaryContainer : T.onSurfaceVariant,
                                  }}
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                            <div className="flex items-center justify-end gap-4 px-2">
                              <button onClick={cancelEditGame} className="text-xs" style={{ color: T.onSurfaceVariant, fontWeight: 500 }}>
                                Annuler
                              </button>
                              <button onClick={commitEditGame} className="text-xs" style={{ color: T.primary, fontWeight: 600 }}>
                                Enregistrer
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-col gap-2">
              <div className="flex rounded-full overflow-hidden self-start" style={{ border: `1px solid ${T.outlineVariant}` }}>
                {CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.key}
                    onClick={() => setNewGameCategory((s) => ({ ...s, [f.id]: cat.key }))}
                    className="text-xs px-3 py-1.5"
                    style={{
                      background: activeCategory === cat.key ? T.primaryContainer : "transparent",
                      color: activeCategory === cat.key ? T.onPrimaryContainer : T.onSurfaceVariant,
                      fontWeight: 500,
                      borderLeft: idx === 0 ? "none" : `1px solid ${T.outlineVariant}`,
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div
                className="flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5"
                style={{ background: T.surfaceContainerHigh, border: `1px solid ${T.outlineVariant}` }}
              >
                <input
                  value={newGameInputs[f.id] || ""}
                  onChange={(e) => setNewGameInputs((s) => ({ ...s, [f.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addGame(f.id)}
                  placeholder={`Ajouter à "${CATEGORIES.find((c) => c.key === activeCategory).label}"`}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: T.onSurface }}
                />
                <button
                  onClick={() => setShowLinkField((s) => ({ ...s, [f.id]: !s[f.id] }))}
                  className="m3-press rounded-full flex items-center justify-center shrink-0"
                  style={{
                    width: 30,
                    height: 30,
                    background: showLinkField[f.id] ? T.primaryContainer : "transparent",
                    color: showLinkField[f.id] ? T.onPrimaryContainer : T.onSurfaceVariant,
                  }}
                  aria-label="Ajouter un lien"
                >
                  <Link2 size={14} />
                </button>
                {activeCategory === "jeux" && (
                  <button
                    onClick={() => setShowPlatformField((s) => ({ ...s, [f.id]: !s[f.id] }))}
                    className="m3-press rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 30,
                      height: 30,
                      background: showPlatformField[f.id] ? T.primaryContainer : "transparent",
                      color: showPlatformField[f.id] ? T.onPrimaryContainer : T.onSurfaceVariant,
                    }}
                    aria-label="Ajouter une plateforme"
                  >
                    <Gamepad2 size={14} />
                  </button>
                )}
                <button
                  onClick={() => addGame(f.id)}
                  className="m3-press rounded-full flex items-center justify-center shrink-0"
                  style={{ width: 32, height: 32, background: T.primary, color: T.onPrimary }}
                  aria-label="Ajouter l'élément"
                >
                  <Plus size={16} />
                </button>
              </div>
              {isDuplicateName && (
                <span className="text-xs px-1" style={{ color: "#FFCC80" }}>
                  Déjà présent dans cette licence
                </span>
              )}

              {showLinkField[f.id] && (
                <div
                  className="flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5"
                  style={{ background: T.surfaceContainerHigh, border: `1px solid ${T.outlineVariant}` }}
                >
                  <input
                    value={newGameLink[f.id] || ""}
                    onChange={(e) => setNewGameLink((s) => ({ ...s, [f.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && addGame(f.id)}
                    placeholder="Lien (vidéo, résumé...)"
                    className="flex-1 bg-transparent text-xs outline-none"
                    style={{ color: T.onSurface }}
                  />
                </div>
              )}

              {showPlatformField[f.id] && (
                <div className="flex flex-col gap-2">
                  <div
                    className="flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5"
                    style={{ background: T.surfaceContainerHigh, border: `1px solid ${T.outlineVariant}` }}
                  >
                    <input
                      value={newGamePlatform[f.id] || ""}
                      onChange={(e) => setNewGamePlatform((s) => ({ ...s, [f.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && addGame(f.id)}
                      placeholder="Plateforme (PS5, Switch, PC...)"
                      className="flex-1 bg-transparent text-xs outline-none"
                      style={{ color: T.onSurface }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-1">
                    {PLATFORM_PRESETS.map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewGamePlatform((s) => ({ ...s, [f.id]: p }))}
                        className="m3-press text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: newGamePlatform[f.id] === p ? T.primaryContainer : T.surfaceContainerHigh,
                          color: newGamePlatform[f.id] === p ? T.onPrimaryContainer : T.onSurfaceVariant,
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => duplicateFranchise(f)}
                className="flex items-center gap-1 text-xs"
                style={{ color: T.onSurfaceVariant }}
              >
                <Copy size={12} /> Dupliquer
              </button>
              <button
                onClick={() => togglePause(f.id)}
                className="flex items-center gap-1 text-xs"
                style={{ color: T.onSurfaceVariant }}
              >
                {f.paused ? <Play size={12} /> : <Pause size={12} />}
                {f.paused ? "Reprendre" : "Mettre en pause"}
              </button>
              <button
                onClick={() => setConfirmDelete({ type: "franchise", franchiseId: f.id, label: f.name })}
                className="flex items-center gap-1 text-xs"
                style={{ color: T.onSurfaceVariant }}
              >
                <Trash2 size={12} /> Supprimer
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex justify-center rota-root"
      style={{ background: T.surface, fontFamily: "'Roboto', sans-serif", overflowX: "hidden" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@500;600&display=swap');
        input::placeholder { color: ${T.onSurfaceVariant}; opacity: 0.6; }
        .m3-press { transition: transform 120ms ease; }
        .m3-press:active { transform: scale(0.97); }
        .rota-root, .rota-root * { transition: background-color 220ms ease, color 220ms ease, border-color 220ms ease; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes diceRoll { 0% { transform: rotate(0deg) scale(0.5); opacity: 0.4; } 60% { transform: rotate(300deg) scale(1.15); opacity: 1; } 100% { transform: rotate(360deg) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes itemIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="w-full max-w-md px-5 pt-10 pb-16">
        {view === "home" ? (
        <>
        <div className="mb-2">
          <div className="flex items-center justify-between relative">
            <h1
              onDoubleClick={() => {
                const anyOpen = activeFranchises.some((f) => expanded[f.id]);
                const next = {};
                activeFranchises.forEach((f) => (next[f.id] = !anyOpen));
                setExpanded((e) => ({ ...e, ...next }));
              }}
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 400,
                fontSize: "2.125rem",
                letterSpacing: "-0.25px",
                color: T.onSurface,
                userSelect: "none",
              }}
            >
              Rota
            </h1>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  setSortMode((m) => (m === "manual" ? "alpha" : m === "alpha" ? "completion" : "manual"))
                }
                aria-label={
                  sortMode === "manual"
                    ? "Tri manuel (ordre glissé)"
                    : sortMode === "alpha"
                    ? "Tri alphabétique"
                    : "Tri par complétion"
                }
                className="m3-press flex items-center justify-center rounded-full"
                style={{
                  width: 32,
                  height: 32,
                  background: sortMode !== "manual" ? T.primaryContainer : T.surfaceContainerHigh,
                  color: sortMode !== "manual" ? T.onPrimaryContainer : T.onSurfaceVariant,
                }}
              >
                {sortMode === "alpha" ? (
                  <ArrowDownAZ size={15} />
                ) : sortMode === "completion" ? (
                  <TrendingUp size={15} />
                ) : (
                  <ArrowUpDown size={15} />
                )}
              </button>
              <button
                onClick={() => setHideCompleted((h) => !h)}
                aria-label={hideCompleted ? "Terminés masqués" : "Masquer les terminés"}
                className="m3-press flex items-center justify-center rounded-full"
                style={{
                  width: 32,
                  height: 32,
                  background: hideCompleted ? T.primaryContainer : T.surfaceContainerHigh,
                  color: hideCompleted ? T.onPrimaryContainer : T.onSurfaceVariant,
                }}
              >
                {hideCompleted ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                onClick={pickRandom}
                aria-label="Que faire ensuite ?"
                className="m3-press flex items-center justify-center rounded-full"
                style={{ width: 32, height: 32, background: T.surfaceContainerHigh, color: T.onSurfaceVariant }}
              >
                <Dices size={16} />
              </button>
              <button
                onClick={openSettings}
                aria-label="Paramètres"
                className="m3-press flex items-center justify-center rounded-full"
                style={{ width: 32, height: 32, background: T.surfaceContainerHigh, color: T.onSurfaceVariant }}
              >
                <Settings size={16} />
              </button>
            </div>
          </div>

          <button onClick={jumpToPlaying} className="block w-full text-sm mb-3 text-left" style={{ color: T.onSurfaceVariant }}>
            {franchises.length} licence{franchises.length !== 1 ? "s" : ""} · {totalDone}/{totalGames} jeux terminés
          </button>
          <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: T.surfaceContainerHigh }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: T.primary }} />
          </div>
          <p className="text-right text-xs mt-1" style={{ fontFamily: "'Roboto Mono', monospace", color: T.primary, fontWeight: 600 }}>
            {pct}%
          </p>
          {fullyDone > 0 && (
            <p className="text-xs mt-1" style={{ color: T.success, fontWeight: 500 }}>
              {fullyDone} licence{fullyDone > 1 ? "s" : ""} terminée{fullyDone > 1 ? "s" : ""} à 100% ✓
            </p>
          )}
        </div>

        <span className="text-xs block mb-2" style={{ color: T.onSurfaceVariant, fontWeight: 500 }}>
          Tes licences
        </span>
        <div
          className="flex items-center gap-2 mb-6 rounded-full pl-5 pr-2 py-2"
          style={{ background: T.surfaceContainerHigh }}
        >
          <Search size={16} color={T.onSurfaceVariant} className="shrink-0" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addFranchise()}
            placeholder="Rechercher ou ajouter une licence"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: T.onSurface }}
          />
          <button
            onClick={addFranchise}
            className="m3-press rounded-full flex items-center justify-center shrink-0"
            style={{ width: 36, height: 36, background: T.primary, color: T.onPrimary }}
            aria-label="Ajouter la licence"
          >
            <Plus size={18} />
          </button>
        </div>

        {loaded && franchises.length === 0 && (
          <p className="text-sm text-center py-10" style={{ color: T.onSurfaceVariant }}>
            Aucune licence pour l'instant. Ajoute-en une pour commencer à suivre ta progression.
          </p>
        )}
        {loaded && franchises.length > 0 && searched.length === 0 && (
          <p className="text-sm text-center py-10" style={{ color: T.onSurfaceVariant }}>
            Aucune licence ne correspond à "{searchQuery}".
          </p>
        )}

        <div className="flex flex-col gap-3">{activeFranchises.map((f) => renderFranchiseCard(f, sortMode === "manual"))}</div>

        {pausedFranchises.length > 0 && (
          <div className="mt-5">
            <button
              onClick={() => setShowPaused((v) => !v)}
              className="flex items-center gap-1.5 text-xs mb-3"
              style={{ color: T.onSurfaceVariant, fontWeight: 500 }}
            >
              <span style={{ display: "inline-flex", transition: "transform 220ms ease", transform: showPaused ? "rotate(90deg)" : "rotate(0deg)" }}>
                <ChevronRight size={14} />
              </span>
              En pause ({pausedFranchises.length})
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: showPaused ? "1fr" : "0fr",
                transition: "grid-template-rows 280ms cubic-bezier(0.2,0,0,1)",
              }}
            >
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <div className="flex flex-col gap-3">{pausedFranchises.map((f) => renderFranchiseCard(f, false))}</div>
              </div>
            </div>
          </div>
        )}
        </>
        ) : (
        <div style={{ animation: "slideInRight 220ms cubic-bezier(0.2,0,0,1)" }}>
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={closeSettings}
              aria-label="Retour"
              className="m3-press flex items-center justify-center rounded-full"
              style={{ width: 36, height: 36, background: T.surfaceContainerHigh, color: T.onSurface }}
            >
              <ArrowLeft size={18} />
            </button>
            <h1
              style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: "1.6rem", color: T.onSurface }}
            >
              Paramètres
            </h1>
          </div>

          <span className="text-xs block mb-3" style={{ color: T.onSurfaceVariant, fontWeight: 500 }}>
            Couleur d'accent
          </span>
          <div
            className="grid gap-y-4 gap-x-2 p-4 rounded-3xl mb-8"
            style={{ background: T.surfaceContainer, gridTemplateColumns: "repeat(4, 1fr)", justifyItems: "center" }}
          >
            {ACCENTS.map((a) => (
              <button
                key={a.key}
                onClick={() => selectAccent(a.key)}
                aria-label={a.label}
                className="m3-press flex flex-col items-center gap-1.5"
              >
                <span
                  style={{
                    display: "block",
                    width: 32,
                    height: 32,
                    borderRadius: 9999,
                    background: a.primary,
                    border: accentKey === a.key ? `2px solid ${T.onSurface}` : "2px solid transparent",
                    boxShadow: accentKey === a.key ? `0 0 0 2px ${T.surfaceContainer}` : "none",
                  }}
                />
                <span className="text-xs" style={{ color: T.onSurfaceVariant }}>
                  {a.label}
                </span>
              </button>
            ))}
          </div>

          <span className="text-xs block mb-3" style={{ color: T.onSurfaceVariant, fontWeight: 500 }}>
            Données
          </span>
          <div className="flex flex-col gap-2 p-2 rounded-3xl mb-8" style={{ background: T.surfaceContainer }}>
            <button
              onClick={handleExport}
              className="m3-press w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left"
              style={{ color: T.onSurface }}
            >
              <Download size={18} color={T.onSurfaceVariant} />
              <div className="flex flex-col">
                <span className="text-sm">Exporter mes données</span>
                <span className="text-xs" style={{ color: T.onSurfaceVariant }}>
                  Sauvegarde tout dans un fichier
                </span>
              </div>
            </button>
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="m3-press w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left"
              style={{ color: T.onSurface }}
            >
              <Upload size={18} color={T.onSurfaceVariant} />
              <div className="flex flex-col">
                <span className="text-sm">Importer une sauvegarde</span>
                <span className="text-xs" style={{ color: T.onSurfaceVariant }}>
                  Ajoute les licences absentes, n'écrase rien
                </span>
              </div>
            </button>
            <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImportFile} />
          </div>

          <div className="flex items-center justify-center gap-2">
            <img src={LOGO_DATA_URI} alt="" width={20} height={20} style={{ borderRadius: 6 }} />
            <span className="text-xs" style={{ color: T.onSurfaceVariant }}>
              Rota
            </span>
          </div>
        </div>
        )}
      </div>

      {dragGhost && (
        <div
          style={{
            position: "fixed",
            left: dragGhost.left,
            top: dragGhost.top + dragGhost.offsetY,
            width: dragGhost.width,
            height: dragGhost.height,
            zIndex: 50,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "0 16px",
            borderRadius: 16,
            background: T.surfaceContainerHighest,
            boxShadow: "0 10px 28px rgba(0,0,0,0.55)",
            transform: "scale(1.03)",
          }}
        >
          <span className="text-sm truncate" style={{ color: T.onSurface }}>
            {dragGhost.name}
          </span>
          <span
            className="text-xs shrink-0 px-2.5 py-1 rounded-full"
            style={{ background: STATUS[dragGhost.status].bg, color: STATUS[dragGhost.status].text, fontWeight: 500 }}
          >
            {STATUS[dragGhost.status].label}
          </span>
        </div>
      )}

      {franchiseGhost && (
        <div
          style={{
            position: "fixed",
            left: franchiseGhost.left,
            top: franchiseGhost.top + franchiseGhost.offsetY,
            width: franchiseGhost.width,
            height: franchiseGhost.height,
            zIndex: 50,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            borderRadius: 24,
            background: T.surfaceContainerHighest,
            boxShadow: "0 10px 28px rgba(0,0,0,0.55)",
            transform: "scale(1.02)",
          }}
        >
          <span className="text-base truncate" style={{ color: T.onSurface, fontWeight: 500 }}>
            {franchiseGhost.name}
          </span>
        </div>
      )}

      {confirmDelete && (
        <div
          className="flex items-center justify-center"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 70, padding: 24, animation: "fadeIn 160ms ease" }}
          onClick={() => setConfirmDelete(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-3xl p-6 w-full"
            style={{ background: T.surfaceContainerHigh, maxWidth: 320, animation: "popIn 180ms cubic-bezier(0.2,0,0,1)" }}
          >
            <p className="mb-1" style={{ color: T.onSurface, fontWeight: 500 }}>
              Supprimer {confirmDelete.type === "franchise" ? "la licence" : "l'élément"} "{confirmDelete.label}" ?
            </p>
            <p className="text-xs mb-5" style={{ color: T.onSurfaceVariant }}>
              Cette action est irréversible.
            </p>
            <div className="flex items-center justify-end gap-4">
              <button onClick={() => setConfirmDelete(null)} className="text-sm" style={{ color: T.onSurfaceVariant, fontWeight: 500 }}>
                Annuler
              </button>
              <button onClick={confirmDeleteNow} className="text-sm" style={{ color: T.danger, fontWeight: 600 }}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {randomPick && (
        <div
          className="flex items-center justify-center"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 70, padding: 24, animation: "fadeIn 160ms ease" }}
          onClick={() => setRandomPick(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-3xl p-6 w-full flex flex-col items-center text-center gap-1"
            style={{ background: T.surfaceContainerHigh, maxWidth: 320, position: "relative", animation: "popIn 180ms cubic-bezier(0.2,0,0,1)" }}
          >
            <button
              onClick={() => setRandomPick(null)}
              aria-label="Fermer"
              style={{ position: "absolute", top: 12, right: 12, color: T.onSurfaceVariant }}
            >
              <X size={18} />
            </button>
            {(() => {
              const DiceIcon = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][diceFace - 1];
              return (
                <DiceIcon
                  key={rollId}
                  size={36}
                  color={T.primary}
                  style={{ animation: "diceRoll 450ms cubic-bezier(0.34,1.56,0.64,1)" }}
                />
              );
            })()}
            {randomPick.empty ? (
              <>
                <p className="text-sm mt-2" style={{ color: T.onSurface, fontWeight: 500 }}>
                  Rien à piocher
                </p>
                <p className="text-xs mb-2" style={{ color: T.onSurfaceVariant }}>
                  Aucun jeu "à faire" dans tes licences actives.
                </p>
                <button onClick={() => setRandomPick(null)} className="text-sm" style={{ color: T.primary, fontWeight: 600 }}>
                  Fermer
                </button>
              </>
            ) : (
              <>
                <p className="text-xs mt-2" style={{ color: T.onSurfaceVariant }}>
                  {randomPick.franchiseName}
                </p>
                <p className="text-base mb-4" style={{ color: T.onSurface, fontWeight: 600 }}>
                  {randomPick.gameName}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button onClick={pickRandom} className="text-sm" style={{ color: T.onSurfaceVariant, fontWeight: 500 }}>
                    Relancer
                  </button>
                  <button
                    onClick={() => goToItem(randomPick.franchiseId, randomPick.gameId)}
                    className="text-sm"
                    style={{ color: T.primary, fontWeight: 600 }}
                  >
                    Y aller
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
