import PopupConfirm from '@/components/PopupConfirm.vue';
import { createApp, h, onMounted, ref } from 'vue';

/**
 * Shows confirmation dialog.
 * @param message - Message text
 * @param options - Options
 */

export async function confirm(
  message: string,
  options: {
    /** Cancel button text. */
    cancel?: string;
    /** Confirm button text. */
    confirm?: string;
    /** Title text. */
    title?: string;
  } = {}
) {
  return new Promise<boolean>((resolve) => {
    const el = document.createElement('div');
    const app = createApp({
      setup() {
        const visible = ref(false);
        onMounted(() => {
          visible.value = true;
        });
        return () =>
          h(PopupConfirm, {
            message,
            cancel: options.cancel,
            confirm: options.confirm,
            title: options.title,
            visible: visible.value,
            onConfirm: () => {
              resolve(true);
              visible.value = false;
            },
            onCancel: () => {
              resolve(false);
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
