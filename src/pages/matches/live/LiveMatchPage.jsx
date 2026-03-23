import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useHeader } from '../../../hooks/useHeader';
import { useLiveMatch } from './hooks/useLiveMatch';
import { useMatchEvents } from './hooks/useMatchEvents';
import { LiveMatchHeader } from './components/LiveMatchHeader';
import { LiveMatchTicker } from './components/LiveMatchTicker';
import { LiveMatchFilters } from './components/LiveMatchFilters';
import { LiveMatchTimeline } from './components/LiveMatchTimeline';
import { LiveMatchTestPanel } from './components/LiveMatchTestPanel';
import { Icon } from '../../../components/ui/Icon';

const TICKER_ROLES = ['administrador', 'delegado'];

const FILTER_TYPES = {
  ALL: null,
  GOAL: 'GOAL',
  YELLOW: 'YELLOW',
  RED: 'RED',
  SUB: 'SUB',
};

export function LiveMatchPage() {
  const { id: matchId } = useParams();
  const { user } = useAuth();
  const { match, liveStatus, isLoading, error } = useLiveMatch(matchId);
  const { events, isLoading: eventsLoading } = useMatchEvents(matchId);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentStatus, setCurrentStatus] = useState('');

  useHeader({
    title: 'Partido en Directo',
    breadcrumbs: [
      { label: 'Partidos', href: '/partidos' },
      { label: 'En directo' },
    ],
    actions: null,
  });

  useEffect(() => {
    if (liveStatus) setCurrentStatus(liveStatus);
  }, [liveStatus]);

  useEffect(() => {
    if (match?.liveStatus && !currentStatus) {
      setCurrentStatus(match.liveStatus);
    }
  }, [match]); // eslint-disable-line react-hooks/exhaustive-deps

  const canControlTicker = TICKER_ROLES.includes(user?.role);

  const filteredEvents = activeFilter === 'ALL'
    ? events
    : events.filter((e) => e.type === FILTER_TYPES[activeFilter]);

  if (isLoading) {
    return (
      <div test-id="el-lp3x7q9m" className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div test-id="el-lp3x7q9m" className="flex flex-col items-center gap-3 py-20 text-error">
        <Icon name="error" size="lg" />
        <p className="text-sm">No se pudo cargar el partido en directo</p>
      </div>
    );
  }

  return (
    <div test-id="el-lp3x7q9m" className="max-w-2xl mx-auto px-4 py-4">
      {import.meta.env.DEV && <LiveMatchTestPanel matchId={matchId} />}

      <LiveMatchHeader match={match} liveStatus={currentStatus || match?.liveStatus} />

      {canControlTicker && currentStatus && currentStatus !== 'FINISHED' && (
        <LiveMatchTicker
          currentLiveStatus={currentStatus}
          matchId={matchId}
          onStatusChange={setCurrentStatus}
        />
      )}

      <LiveMatchFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <LiveMatchTimeline events={filteredEvents} isLoading={eventsLoading} />
    </div>
  );
}
