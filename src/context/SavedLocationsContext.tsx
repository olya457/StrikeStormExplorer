import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

const STORAGE_KEY = 'strike-storm-explorer:saved-locations';

type SavedLocationsContextValue = {
  hydrated: boolean;
  savedIds: string[];
  isSaved: (id: string) => boolean;
  removeSaved: (id: string) => void;
  toggleSaved: (id: string) => void;
};

const SavedLocationsContext = createContext<SavedLocationsContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function SavedLocationsProvider({children}: Props) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    async function hydrate() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        if (active && Array.isArray(parsed)) {
          setSavedIds(parsed.filter(item => typeof item === 'string'));
        }
      } finally {
        if (active) {
          setHydrated(true);
        }
      }
    }

    hydrate();

    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback((next: string[]) => {
    setSavedIds(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
  }, []);

  const toggleSaved = useCallback(
    (id: string) => {
      setSavedIds(current => {
        const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
        return next;
      });
    },
    [],
  );

  const removeSaved = useCallback(
    (id: string) => {
      persist(savedIds.filter(item => item !== id));
    },
    [persist, savedIds],
  );

  const value = useMemo(
    () => ({
      hydrated,
      isSaved: (id: string) => savedIds.includes(id),
      removeSaved,
      savedIds,
      toggleSaved,
    }),
    [hydrated, removeSaved, savedIds, toggleSaved],
  );

  return <SavedLocationsContext.Provider value={value}>{children}</SavedLocationsContext.Provider>;
}

export function useSavedLocations() {
  const context = useContext(SavedLocationsContext);

  if (!context) {
    throw new Error('useSavedLocations must be used inside SavedLocationsProvider');
  }

  return context;
}
