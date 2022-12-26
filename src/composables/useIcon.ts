import { computed, type ExtractPropTypes } from 'vue';

export const iconProps = {
  /**
   * Height, in pixels.
   */
  height: {
    default: 24,
    type: Number,
  },
  /**
   * Sets height and width, in pixels. Takes priority over `height` and `width`
   * properties.
   */
  size: {
    default: undefined,
    type: Number,
  },
  /**
   * Width, in pixels.
   */
  width: {
    default: 24,
    type: Number,
  },
};

/**
 * Composable for icon component.
 * @param props - Icon props
 */

export function useIcon(props: ExtractPropTypes<typeof iconProps>) {
  const height = computed(() => {
    return props.size ?? props.height;
  });

  const width = computed(() => {
    return props.size ?? props.width;
  });

  return {
    height,
    width,
  };
}
