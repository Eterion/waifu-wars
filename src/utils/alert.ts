import BasePopupAlert from '@/components/base-popup/BasePopupAlert.vue';
import { createApp, h, onMounted, ref } from 'vue';

/**
 * Shows alert message.
 * @param message - Message text
 * @param options - Options
 */

export async function alert(
  message: string,
  options: {
    /** Ok button text. */
    ok?: string;
    /** Title text. */
    title?: string;
  } = {}
) {
  return new Promise<void>((resolve) => {
    const el = document.createElement('div');
    const app = createApp({
      setup() {
        const visible = ref(false);
        onMounted(() => {
          visible.value = true;
        });
        return () =>
          h(BasePopupAlert, {
            message,
            ok: options.ok,
            title: options.title,
            visible: visible.value,
            onOk: () => {
              resolve();
              visible.value = false;
            },
            onHidden: () => {
              app.unmount();
              el.parentNode?.removeChild(el);
            },
          });
      },
    });
    document.body.insertAdjacentElement('beforeend', el);
    app.mount(el);
  });
}
