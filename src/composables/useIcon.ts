import type { IconProps } from '@/types/IconProps';
import { computed } from 'vue';

/**
 * Composable for icon component.
 * @param props - Icon props
 */

export function useIcon(props: IconProps) {
  const height = computed(() => props.size ?? props.height ?? 24);
  const width = computed(() => props.size ?? props.width ?? 24);
  const strokeWidth = computed(() => props.strokeWidth ?? 2);
  return {
    height,
    strokeWidth,
    width,
  };
}
