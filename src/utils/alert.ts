import BasePopupAlert from '@/components/@base/popup/BasePopupAlert.vue';
import { createApp, h, onMounted, ref } from 'vue';

/**
 * Shows alert message.
 * @param message - Message text
 * @param options - Options
 */

export function alert(
  message: string,
  options: {
    /** Close button text. */
    close?: string;
    /** Danger style. */
    danger?: boolean;
    /** Title text. */
    title?: string;
  } = {},
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
            close: options.close,
            danger: options.danger,
            title: options.title,
            visible: visible.value,
            onClose: () => {
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
