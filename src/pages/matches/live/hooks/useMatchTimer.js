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
    return Math.min(Math.floor((now - ts) / 60_000), halfDuration);
  }

  if (liveStatus === 'SECOND_HALF') {
    const ts = getStoredTs(key2);
    if (!ts) return halfDuration;
    return halfDuration + Math.min(Math.floor((now - ts) / 60_000), halfDuration);
  }

  return null;
}

export function getHalfDuration(categoryName) {
  const name = (categoryName || '').toLowerCase();
  if (name.includes('infantil')) return 35;
  if (name.includes('cadete')) return 40;
  return 45;
}

export function useMatchTimer(matchId, liveStatus, halfDuration) {
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
      // Primera vez que recibimos un estado real: solo escribir si no existe (no machacar)
      if (liveStatus === 'FIRST_HALF' && !getStoredTs(key1)) {
        localStorage.setItem(key1, Date.now().toString());
      }
      if (liveStatus === 'SECOND_HALF' && !getStoredTs(key2)) {
        localStorage.setItem(key2, Date.now().toString());
      }
      return;
    }

    // Transición real durante la sesión: siempre resetea
    if (liveStatus === 'FIRST_HALF' && prev !== 'FIRST_HALF') {
      localStorage.setItem(key1, Date.now().toString());
    }
    if (liveStatus === 'SECOND_HALF' && prev !== 'SECOND_HALF') {
      localStorage.setItem(key2, Date.now().toString());
    }
  }, [liveStatus, key1, key2]);

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
