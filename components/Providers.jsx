'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useSyncExternalStore } from 'react';
import { MotionConfig } from 'framer-motion';
import { motionStorageKey, site } from '@/config/site';
import Cursor from './Cursor';
import BuildSwarm from './BuildSwarm';

/*
 * Motion preference
 * ─────────────────
 * The real value lives on <html data-motion="on|off">. A tiny inline script in
 * the layout sets it before first paint from localStorage (or the OS
 * "reduce motion" setting), so CSS animations never flash. React reads it
 * through useSyncExternalStore.
 */
const EVENT = 'motionpref';

function subscribe(cb) {
  window.addEventListener(EVENT, cb);
  // Follow OS changes until the visitor picks a setting themselves (when configured to).
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const onOs = () => {
    if (!site.motion.respectReducedMotion) return;
    let stored = null;
    try {
      stored = localStorage.getItem(motionStorageKey);
    } catch {}
    if (!stored) {
      document.documentElement.dataset.motion = mq.matches ? 'off' : 'on';
      cb();
    }
  };
  mq.addEventListener('change', onOs);
  return () => {
    window.removeEventListener(EVENT, cb);
    mq.removeEventListener('change', onOs);
  };
}
const getSnapshot = () => document.documentElement.dataset.motion !== 'off';
const getServerSnapshot = () => true;

const MotionContext = createContext({
  enabled: true,
  setEnabled: () => {},
  playSwarm: () => {},
  swarmActive: false,
});

export const useMotionPref = () => useContext(MotionContext);

function swarmReducer(state, action) {
  if (action.type === 'play') return { ...state, run: state.run + 1, origin: action.origin };
  if (action.type === 'done') return { ...state, done: Math.max(state.done, action.run) };
  if (action.type === 'stop') return { ...state, done: state.run };
  return state;
}

export default function Providers({ children }) {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Live build runs: `run` counts starts, `done` the last finished (or stopped) one.
  const [swarm, dispatch] = useReducer(swarmReducer, { run: 0, done: 0, origin: null });

  const setEnabled = useCallback((on) => {
    document.documentElement.dataset.motion = on ? 'on' : 'off';
    try {
      localStorage.setItem(motionStorageKey, on ? 'on' : 'off');
    } catch {}
    window.dispatchEvent(new Event(EVENT));
    if (!on) dispatch({ type: 'stop' }); // switching animations off ends a running build
  }, []);

  // The "Motion" button: switches animations on and (re)starts the live build.
  // A mouse click passes its position so the cursors burst out of the button.
  const playSwarm = useCallback(
    (e) => {
      setEnabled(true);
      dispatch({ type: 'play', origin: e?.detail > 0 ? { x: e.clientX, y: e.clientY } : null });
    },
    [setEnabled],
  );

  // Auto-play on load when the boot script marked the page "pending" (site.motion.autoBuild).
  useEffect(() => {
    if (document.documentElement.dataset.build !== 'pending') return undefined;
    const id = requestAnimationFrame(() => {
      if (!document.querySelector('.hero')) {
        delete document.documentElement.dataset.build;
        return;
      }
      const r = document.querySelector('.motion-ctl__play')?.getBoundingClientRect();
      dispatch({ type: 'play', origin: r?.width ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleDone = useCallback((run) => dispatch({ type: 'done', run }), []);

  const swarmRun = swarm.run;
  const swarmOrigin = swarm.origin;
  const swarmActive = swarm.run > swarm.done;

  const value = useMemo(
    () => ({ enabled, setEnabled, playSwarm, swarmActive }),
    [enabled, setEnabled, playSwarm, swarmActive],
  );

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig reducedMotion={enabled ? 'never' : 'always'}>{children}</MotionConfig>
      {swarmActive && (
        <BuildSwarm key={swarmRun} run={swarmRun} origin={swarmOrigin} onDone={handleDone} />
      )}
      <Cursor enabled={enabled} />
    </MotionContext.Provider>
  );
}
