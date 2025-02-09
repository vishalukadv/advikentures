import { useState, useEffect } from 'react';
import { syncManager } from '../lib/syncManager';

export function useSync() {
  const [syncState, setSyncState] = useState(syncManager.getState());

  useEffect(() => {
    return syncManager.subscribe(setSyncState);
  }, []);

  return {
    ...syncState,
    forceSync: () => syncManager.forceSync()
  };
}