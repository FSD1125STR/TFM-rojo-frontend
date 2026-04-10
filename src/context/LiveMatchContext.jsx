import { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import { getLiveMatches } from '../services/liveMatchService';
import { LiveMatchContext } from './LiveMatchContext.js';

const LIVE_STATUSES = ['FIRST_HALF', 'HALF_TIME', 'SECOND_HALF'];

export function LiveMatchProvider({ children }) {
  const { user, token } = useAuth();
  const socketRef = useRef(null);
  const activeMatchIdRef = useRef(null);

  const [activeMatchId, setActiveMatchId] = useState(null);
  const [liveStatus, setLiveStatus] = useState('');
  const [hasLiveMatch, setHasLiveMatch] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [matchStartTimestamps, setMatchStartTimestamps] = useState({ firstHalfStartAt: null, secondHalfStartAt: null });

  // Fetch inicial para saber si hay partido en directo al cargar la app
  useEffect(() => {
    if (!user || !token) return;
    getLiveMatches()
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) {
          setHasLiveMatch(true);
          setActiveMatchId(list[0]._id);
          setLiveStatus(list[0].liveStatus);
          setMatchStartTimestamps({
            firstHalfStartAt:  list[0].firstHalfStartAt  ?? null,
            secondHalfStartAt: list[0].secondHalfStartAt ?? null,
          });
        }
      })
      .catch(() => {})
      .finally(() => setIsLoadingLive(false));
  }, [user, token]);

  useEffect(() => {
    if (!user || !token) return;

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    const socketUrl = apiUrl.replace(/\/api\/?$/, '');


    const socket = io(socketUrl, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      if (activeMatchIdRef.current) {
        socket.emit('join:match', activeMatchIdRef.current);
      }
    });

    socket.on('connect_error', (err) => {
      console.error('[LiveMatch Socket] Connection error:', err.message);
    });

    socket.on('event:created', (payload) => {
      setLastEvent(payload);
    });

    socket.on('match:liveStatusUpdated', (payload) => {
      const status = payload.liveStatus ?? payload.status ?? '';
      setLiveStatus(status);
      setMatchStartTimestamps({
        firstHalfStartAt:  payload.firstHalfStartAt  ?? null,
        secondHalfStartAt: payload.secondHalfStartAt ?? null,
      });
      if (status === 'FINISHED' || status === 'NOT_STARTED') {
        setHasLiveMatch(false);
      } else if (LIVE_STATUSES.includes(status)) {
        setHasLiveMatch(true);
      }
    });

    socket.on('live:globalStatusChanged', (payload) => {
      const status = payload.liveStatus ?? payload.status ?? '';
      if (status === 'FINISHED' || status === 'NOT_STARTED') {
        setHasLiveMatch(false);
      } else if (LIVE_STATUSES.includes(status)) {
        setHasLiveMatch(true);
        if (payload.matchId) setActiveMatchId(payload.matchId);
      }
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [user, token]);

  const joinMatch = useCallback((matchId) => {
    activeMatchIdRef.current = matchId;
    setActiveMatchId(matchId);
    if (socketRef.current?.connected) {
      socketRef.current.emit('join:match', matchId);
    } else if (socketRef.current) {
      socketRef.current.once('connect', () => {
        socketRef.current?.emit('join:match', matchId);
      });
    }
  }, []);

  const leaveMatch = useCallback(() => {
    if (socketRef.current?.connected && activeMatchId) {
      socketRef.current.emit('leave:match', activeMatchId);
    }
    activeMatchIdRef.current = null;
    setActiveMatchId(null);
    setLastEvent(null);
    // No reseteamos hasLiveMatch: el partido sigue en directo aunque el usuario salga de la vista
  }, [activeMatchId]);

  const isMatchLive = useCallback(
    (matchId) => activeMatchId === matchId && hasLiveMatch,
    [activeMatchId, hasLiveMatch]
  );

  return (
    <LiveMatchContext.Provider
      value={{
        activeMatchId,
        liveStatus,
        hasLiveMatch,
        isLoadingLive,
        lastEvent,
        matchStartTimestamps,
        isMatchLive,
        joinMatch,
        leaveMatch,
      }}
    >
      {children}
    </LiveMatchContext.Provider>
  );
}

