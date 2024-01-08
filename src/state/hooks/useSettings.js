import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { settingsState } from '../atoms/settings';

export default function useSettings(newSettings) {
  const [initialSettings, setInitialSettings] = useState();
  const [settings, setSettings] = useRecoilState(settingsState);

  useEffect(() => {
    if (!newSettings) {
      return;
    }

    console.log('[useSettings] Loading settings.');
    setSettings(newSettings);
    setInitialSettings(newSettings);
  }, [newSettings, setSettings]);

  // Provide a way to update individual settings if needed
  const updateSetting = (key, value) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  };

  return {
    settings,
    initialSettings,
    updateSetting
  };
}