import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { initialSettingsState, settingsState } from '../atoms/settings';

export default function useSettings(newSettings) {
  const [initialSettings, setInitialSettings] = useRecoilState(initialSettingsState);
  const [settings, setSettings] = useRecoilState(settingsState);

  useEffect(() => console.log("new:" + JSON.stringify(settings)), [settings])

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
    console.log(key, value);
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