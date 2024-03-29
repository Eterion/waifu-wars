<script setup lang="ts">
import anilistFaviconUrl from '@/assets/anilist.png?url';
import myanimelistFaviconUrl from '@/assets/myanimelist.ico?url';
import { isAnimeInfo, type AnimeInfo } from '@/types/AnimeInfo';
import { isCharacterInfo, type CharacterInfo } from '@/types/CharacterInfo';
import {
  autoUpdate,
  flip,
  useFloating,
  type VirtualElement,
} from '@floating-ui/vue';
import { useEventListener } from '@vueuse/core';
import { computed, ref, toRef, watch } from 'vue';
import TrashIcon from '../@icons/TrashIcon.vue';

const props = defineProps<{
  /** Character or anime info. */
  info: CharacterInfo | AnimeInfo;
  /** Reference element outside of the component. */
  outsideReferenceElement?: HTMLElement;
  /** Shows remove button. */
  removable?: boolean;
}>();

defineEmits<{
  (e: 'remove', info: CharacterInfo | AnimeInfo): void;
}>();

const characterInfo = computed(() => {
  const info = props.info;
  if (!isCharacterInfo(info)) return undefined;
  return {
    name: info.fullName,
    anilist: info.siteUrl,
  };
});

const animeInfo = computed(() => {
  const info = props.info;
  if (!info) return undefined;
  return {
    get name() {
      if (isCharacterInfo(info)) return info.animeName;
      else if (isAnimeInfo(info)) return info.name;
      return undefined;
    },
    get anilist() {
      if (isCharacterInfo(info)) return info.animeUrl;
      else if (isAnimeInfo(info)) return info.siteUrl;
      return undefined;
    },
    get mal() {
      const baseUrl = 'https://myanimelist.net/anime';
      if (isCharacterInfo(info)) {
        if (info.animeMalId !== undefined) {
          return `${baseUrl}/${info.animeMalId}`;
        }
      } else if (isAnimeInfo(info)) {
        if (info.malId !== undefined) {
          return `${baseUrl}/${info.malId}`;
        }
      }
      return undefined;
    },
  };
});

const isOpen = ref(false);
const referenceRef = ref<VirtualElement>();
const floatingRef = ref<HTMLElement>();
const { floatingStyles, placement } = useFloating(referenceRef, floatingRef, {
  middleware: [flip()],
  open: isOpen,
  placement: 'right-start',
  strategy: 'fixed',
  whileElementsMounted: autoUpdate,
});

const outsideReferenceElement = toRef(props, 'outsideReferenceElement');
useEventListener(outsideReferenceElement, 'contextmenu', (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  isOpen.value = true;
  referenceRef.value = {
    getBoundingClientRect() {
      const { clientX, clientY } = event;
      return {
        width: 0,
        height: 0,
        x: clientX,
        y: clientY,
        top: clientY,
        left: clientX,
        right: clientX,
        bottom: clientY,
      };
    },
  };
});

function onClickout(event: Event) {
  if (event.target instanceof Element)
    if (!floatingRef.value?.contains(event.target)) {
      isOpen.value = false;
    }
}

watch(isOpen, (isOpen) => {
  if (isOpen) {
    addEventListener('click', onClickout);
    addEventListener('contextmenu', onClickout, { capture: true });
  } else {
    removeEventListener('click', onClickout);
    removeEventListener('contextmenu', onClickout, { capture: true });
  }
});
</script>

<template>
  <Teleport to="body" :disabled="!isOpen">
    <Transition
      :enter-from-class="$style.vHidden"
      :leave-to-class="$style.vHidden"
      :enter-active-class="$style.vActive"
      :leave-active-class="$style.vActive">
      <div v-if="isOpen" ref="floatingRef" :style="floatingStyles">
        <div :class="$style.el" :data-placement="placement">
          <div v-if="characterInfo?.anilist" :class="$style.group">
            <div :class="$style.name">{{ characterInfo?.name }}</div>
            <ul :class="$style.links">
              <li>
                <a
                  :href="characterInfo.anilist"
                  :class="$style.link"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    :class="$style.link_favicon"
                    :src="anilistFaviconUrl"
                    alt="" />
                  Anilist
                </a>
              </li>
            </ul>
          </div>
          <div
            v-if="animeInfo?.anilist || animeInfo?.mal"
            :class="$style.group">
            <div :class="$style.name">{{ animeInfo?.name }}</div>
            <ul :class="$style.links">
              <li v-if="animeInfo?.anilist">
                <a
                  :href="animeInfo.anilist"
                  :class="$style.link"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    :class="$style.link_favicon"
                    :src="anilistFaviconUrl"
                    alt="" />
                  Anilist
                </a>
              </li>
              <li v-if="animeInfo?.mal">
                <a
                  :href="animeInfo.mal"
                  :class="$style.link"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    :class="$style.link_favicon"
                    :src="myanimelistFaviconUrl"
                    alt="" />
                  MyAnimeList
                </a>
              </li>
            </ul>
          </div>
          <div v-if="removable" :class="$style.group">
            <ul :class="$style.links">
              <li>
                <button
                  :class="[$style.link, $style.remove]"
                  type="button"
                  @click="(isOpen = false), $emit('remove', info)">
                  <span :class="$style.link_icon">
                    <TrashIcon :size="16" />
                  </span>
                  Remove
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style module lang="scss">
.el {
  background-color: var(--foreground);
  border-radius: 12px;
  box-shadow: var(--medium-shadow);
  font-size: 0.9375rem;
  max-width: 200px;
  &[data-placement='right-start'] {
    border-top-left-radius: 6px;
  }
  &[data-placement='right-end'] {
    border-bottom-left-radius: 6px;
  }
  &[data-placement='left-start'] {
    border-top-right-radius: 6px;
  }
  &[data-placement='left-end'] {
    border-bottom-right-radius: 6px;
  }
}

.vHidden {
  .el {
    opacity: 0;
    transform: scale(0.8);
  }
}

.vActive {
  $-duration: 100ms;
  transition-duration: $-duration;
  transition-property: none;
  .el {
    transition-duration: $-duration;
    transition-property: opacity, transform;
    &[data-placement='right-start'] {
      transform-origin: left top;
    }
    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }
    &[data-placement='left-start'] {
      transform-origin: right top;
    }
    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }
  }
}

.group {
  padding: 12px;
  &:not(:first-child) {
    border-top: 1px solid var(--border-light);
  }
}

.name {
  color: var(--text-light);
  font-size: 0.875rem;
  margin-bottom: 6px;
  padding-left: 6px;
  padding-right: 12px;
}

.links {
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  & > li:not(:last-child) {
    margin-bottom: 1px;
  }
}

.link {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  color: inherit;
  column-gap: 6px;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  padding: 3px 6px;
  text-decoration: none;
  width: 100%;
  &:hover {
    background-color: var(--hover-surface);
    color: var(--primary);
  }
  &_favicon {
    border-radius: 3px;
    display: block;
    object-fit: cover;
    size: 16px;
  }
  &_icon {
    align-items: center;
    display: flex;
    justify-content: center;
    size: 16px;
  }
}

.remove {
  color: var(--danger);
  &:hover {
    background-color: var(--danger-surface);
    color: var(--text-on-danger-surface);
  }
}
</style>
