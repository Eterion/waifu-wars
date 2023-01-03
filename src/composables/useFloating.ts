import {
  computePosition,
  type ComputePositionConfig,
  type ComputePositionReturn,
  type Middleware,
  type MiddlewareData,
  type Placement,
  type Strategy,
  type VirtualElement,
} from '@floating-ui/dom';
import { syncRef } from '@vueuse/shared';
import { ary } from 'lodash-es';
import { reactive, ref, toRef, watch } from 'vue';

/**
 * Computes floating element placement.
 * @param options - Options
 */

export function useFloating(
  options: Omit<Partial<ComputePositionConfig>, 'platform'> = {}
) {
  const reference = ref<Element>();
  const floating = ref<HTMLElement>();
  const middlewareData = ref<MiddlewareData>({});
  const x = ref<number>();
  const y = ref<number>();
  const strategy = ref<Strategy>('absolute');
  syncRef(toRef(options, 'strategy', 'absolute'), strategy, {
    direction: 'ltr',
  });
  const placement = ref<Placement>('bottom');
  syncRef(toRef(options, 'placement', 'bottom'), placement, {
    direction: 'ltr',
  });
  const middleware = ref<Middleware[]>([]);
  syncRef(toRef(options, 'middleware', []), middleware, {
    direction: 'ltr',
  });

  const computePositionConfig = reactive({ middleware, placement, strategy });
  const handleComputePositionData: (data: ComputePositionReturn) => void = (
    data
  ) => {
    x.value = data.x;
    y.value = data.y;
    placement.value = data.placement;
    strategy.value = data.strategy;
    middlewareData.value = data.middlewareData;
  };

  async function update(virtualElement?: VirtualElement) {
    if (!floating.value) return;
    if (virtualElement) {
      handleComputePositionData(
        await computePosition(
          virtualElement,
          floating.value,
          computePositionConfig
        )
      );
    } else if (reference.value) {
      handleComputePositionData(
        await computePosition(
          reference.value,
          floating.value,
          computePositionConfig
        )
      );
    }
  }

  watch(reference, ary(update, 0), { deep: true });
  watch(floating, ary(update, 0), { deep: true });
  watch(() => computePositionConfig, ary(update, 0), { deep: true });

  return {
    floating,
    middleware,
    placement,
    reference,
    strategy,
    update,
    x,
    y,
  };
}
