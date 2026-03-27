import { useState, useEffect } from 'react';

const ACTIVE_HALVES = new Set(['FIRST_HALF', 'SECOND_HALF']);

function getStoredTs(key) {
  const v = localStorage.getItem(key);
  return v ? parseInt(v, 10) : null;
}

function setStoredTs(key) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, Date.now().toString());
  }
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

  const [minute, setMinute] = useState(() =>
    calcMinute(liveStatus, halfDuration, key1, key2)
  );

  // Guarda el timestamp cuando arranca cada parte
  useEffect(() => {
    if (liveStatus === 'FIRST_HALF') setStoredTs(key1);
    if (liveStatus === 'SECOND_HALF') setStoredTs(key2);
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
