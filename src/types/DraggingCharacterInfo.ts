import type { Character } from './Character';
import type { DragEventOrigin } from './DragEventOrigin';

export interface DraggingCharacterInfo {
  /** Character information. */
  character: Character;
  /** Drag event origin. */
  origin: DragEventOrigin;
}
