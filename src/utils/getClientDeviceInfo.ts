// src/utils/getClientDeviceInfo.js

export function getClientDeviceInfo() {
  const deviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    connectionType: navigator.connection?.type || 'unknown',
    prefersDarkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
  };
  return deviceInfo;
}
