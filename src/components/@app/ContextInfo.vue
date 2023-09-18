<script setup lang="ts">
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

const props = defineProps<{
  /** Character or anime info. */
  info: CharacterInfo | AnimeInfo;
  /** Reference element outside of the component. */
  outsideReferenceElement?: HTMLElement;
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
const { floatingStyles } = useFloating(referenceRef, floatingRef, {
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

function close(event: Event) {
  if (event.target instanceof Element)
    if (!floatingRef.value?.contains(event.target)) {
      isOpen.value = false;
    }
}

watch(isOpen, (isOpen) => {
  if (isOpen) {
    addEventListener('click', close, { once: true });
    addEventListener('contextmenu', close, { capture: true, once: true });
  } else {
    removeEventListener('click', close);
    removeEventListener('contextmenu', close, { capture: true });
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
        <div :class="$style.el">
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
                    :class="$style.link_icon"
                    src="https://anilist.co/img/icons/favicon-32x32.png"
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
                    :class="$style.link_icon"
                    src="https://anilist.co/img/icons/favicon-32x32.png"
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
                    :class="$style.link_icon"
                    src="https://cdn.myanimelist.net/images/favicon.ico"
                    alt="" />
                  MyAnimeList
                </a>
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
  border-top-left-radius: 6px;
  box-shadow: var(--medium-shadow);
  font-size: 0.9375rem;
  max-width: 200px;
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
    transform-origin: 0 0;
    transition-duration: $-duration;
    transition-property: opacity, transform;
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
  border-radius: 6px;
  color: inherit;
  column-gap: 6px;
  display: flex;
  padding: 3px 6px;
  text-decoration: none;
  &:hover {
    background-color: var(--hover-surface);
    color: var(--primary);
  }
  &_icon {
    border-radius: 3px;
    display: block;
    object-fit: cover;
    size: 16px;
  }
}
</style>
