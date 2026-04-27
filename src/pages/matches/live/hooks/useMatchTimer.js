import { useState, useEffect, useRef } from 'react';

const ACTIVE_HALVES = new Set(['FIRST_HALF', 'SECOND_HALF']);

function getStoredTs(key) {
  const v = localStorage.getItem(key);
  return v ? parseInt(v, 10) : null;
}

function calcMinute(liveStatus, halfDuration, key1, key2) {
  if (!liveStatus || liveStatus === 'NOT_STARTED') return null;
  if (liveStatus === 'HALF_TIME') return halfDuration;
  if (liveStatus === 'FINISHED') return halfDuration * 2;

  const now = Date.now();

  if (liveStatus === 'FIRST_HALF') {
    const ts = getStoredTs(key1);
    if (!ts) return 0;
    return Math.max(0, Math.min(Math.floor((now - ts) / 60_000), halfDuration));
  }

  if (liveStatus === 'SECOND_HALF') {
    const ts = getStoredTs(key2);
    if (!ts) return halfDuration;
    return halfDuration + Math.max(0, Math.min(Math.floor((now - ts) / 60_000), halfDuration));
  }

  return null;
}

const HALF_DURATIONS = { infantil: 35, cadete: 40, default: 45 };

export function getHalfDuration(categoryName) {
  const name = (categoryName || '').toLowerCase();
  const entry = Object.entries(HALF_DURATIONS).find(([key]) => key !== 'default' && name.includes(key));
  return entry ? entry[1] : HALF_DURATIONS.default;
}

function resolveTs(serverIso) {
  if (serverIso) return new Date(serverIso).getTime();
  return Date.now();
}

export function useMatchTimer(matchId, liveStatus, halfDuration, serverTs1 = null, serverTs2 = null) {
  const key1 = `match:${matchId}:firstHalfStart`;
  const key2 = `match:${matchId}:secondHalfStart`;

  const prevStatusRef = useRef(null);

  const [minute, setMinute] = useState(() =>
    calcMinute(liveStatus, halfDuration, key1, key2)
  );

  useEffect(() => {
    const prev = prevStatusRef.current;
    prevStatusRef.current = liveStatus;

    // Solo actuar cuando liveStatus es un estado real del partido
    if (!liveStatus) return;

    // "Transición real" = el estado anterior era también un estado válido (no el vacío inicial)
    const prevIsValidStatus = !!prev;

    if (!prevIsValidStatus) {
      // Primera vez que recibimos un estado real
      if (liveStatus === 'FIRST_HALF') {
        const storedTs = getStoredTs(key1);
        const isStale = storedTs && Math.floor((Date.now() - storedTs) / 60_000) >= halfDuration;
        if (!storedTs || (isStale && serverTs1)) {
          localStorage.setItem(key1, resolveTs(serverTs1).toString());
        }
      }
      if (liveStatus === 'SECOND_HALF') {
        const storedTs = getStoredTs(key2);
        const isStale = storedTs && Math.floor((Date.now() - storedTs) / 60_000) >= halfDuration;
        if (!storedTs || (isStale && serverTs2)) {
          localStorage.setItem(key2, resolveTs(serverTs2).toString());
        }
      }
      return;
    }

    // Transición real durante la sesión: siempre resetea
    if (liveStatus === 'FIRST_HALF' && prev !== 'FIRST_HALF') {
      localStorage.setItem(key1, resolveTs(serverTs1).toString());
    }
    if (liveStatus === 'SECOND_HALF' && prev !== 'SECOND_HALF') {
      localStorage.setItem(key2, resolveTs(serverTs2).toString());
    }
    // Al terminar el partido, limpiar claves para evitar timestamps rancios en sesiones futuras
    if (liveStatus === 'FINISHED' || liveStatus === 'NOT_STARTED') {
      localStorage.removeItem(key1);
      localStorage.removeItem(key2);
    }

    if (liveStatus === 'FIRST_HALF' && prev === 'FIRST_HALF' && serverTs1) {
      const storedMs = getStoredTs(key1);
      const serverMs = new Date(serverTs1).getTime();
      if (!storedMs || Math.abs(serverMs - storedMs) > 5_000) {
        localStorage.setItem(key1, serverMs.toString());
      }
    }
    if (liveStatus === 'SECOND_HALF' && prev === 'SECOND_HALF' && serverTs2) {
      const storedMs = getStoredTs(key2);
      const serverMs = new Date(serverTs2).getTime();
      if (!storedMs || Math.abs(serverMs - storedMs) > 5_000) {
        localStorage.setItem(key2, serverMs.toString());
      }
    }
  }, [liveStatus, halfDuration, key1, key2, serverTs1, serverTs2]);

  // Recalcula cada 10s durante partes activas; en los demás estados solo una vez
  useEffect(() => {
    setMinute(calcMinute(liveStatus, halfDuration, key1, key2));
    if (!ACTIVE_HALVES.has(liveStatus)) return;
    const interval = setInterval(() => {
      setMinute(calcMinute(liveStatus, halfDuration, key1, key2));
    }, 10_000);
    return () => clearInterval(interval);
  }, [liveStatus, halfDuration, key1, key2]);

  return minute;
}
