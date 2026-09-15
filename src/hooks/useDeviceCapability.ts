import { useEffect, useState } from 'react';

export type DeviceTier = 'high' | 'low';

/**
 * Rough heuristic to decide whether the device should get the full 3D
 * experience (particles, post-processing, high pixel ratio) or the
 * lightweight version. Re-evaluated once on mount.
 */
export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('high');

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isNarrow = window.innerWidth < 768;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    const lowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;

    if ((isTouch && isNarrow) || lowCores || lowMemory) {
      setTier('low');
    } else {
      setTier('high');
    }
  }, []);

  return tier;
}
