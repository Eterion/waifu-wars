import { uniqueId } from 'lodash-es';
import {
  computed,
  inject,
  provide,
  reactive,
  toRefs,
  type InjectionKey,
} from 'vue';

interface Props {
  /** Field id. */
  id: string;
  /** Field label. */
  label?: string;
}

/**
 * Injection key.
 * @internal
 */

const INJECTION_KEY = Symbol() as InjectionKey<Props>;

/**
 * Defines new field.
 * @param props - Field props
 */

export function defineField(props: Partial<Props>) {
  const { label } = toRefs(props);
  const id = computed(() => props.id || `field_${uniqueId()}`);
  const injection: Props = reactive({ id, label });
  provide(INJECTION_KEY, injection);
  return injection;
}

/**
 * Use existing field if avalable, otherwise use default values.
 */

export function useField() {
  return inject(INJECTION_KEY, {
    id: `field_${uniqueId()}`,
  });
}
