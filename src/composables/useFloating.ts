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
  const referenceRef = ref<Element>();
  const floatingRef = ref<HTMLElement>();
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
    if (!floatingRef.value) return;
    if (virtualElement) {
      handleComputePositionData(
        await computePosition(
          virtualElement,
          floatingRef.value,
          computePositionConfig
        )
      );
    } else if (referenceRef.value) {
      handleComputePositionData(
        await computePosition(
          referenceRef.value,
          floatingRef.value,
          computePositionConfig
        )
      );
    }
  }

  watch(referenceRef, ary(update, 0), { deep: true });
  watch(floatingRef, ary(update, 0), { deep: true });
  watch(() => computePositionConfig, ary(update, 0), { deep: true });

  return {
    floatingRef,
    middleware,
    placement,
    referenceRef,
    strategy,
    update,
    x,
    y,
  };
}
