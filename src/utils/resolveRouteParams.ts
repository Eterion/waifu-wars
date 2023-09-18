import { castArray } from 'lodash-es';
import type { RouteParams } from 'vue-router';

/**
 * Parses specific params from provided `routeParams` object.
 * @param routeParams - Route parameters
 * @param paramsToParse - Params to parse
 * @example
 * ```ts
 * const { season, year } = resolveRouteParams({
 *   season: "winter",
 *   year: "2023"
 * }, {
 *   season: String,
 *   year: Number
 * });
 * console.log(season); // "winter" (typeof uuid === "string")
 * console.log(year); // 2023 (typeof companyId === "number")
 * ```
 */

export function resolveRouteParams<
  TParams extends {
    [key: string]: typeof Number | typeof String;
  },
>(
  routeParams: RouteParams,
  paramsToParse: TParams,
): {
  [K in keyof TParams]?: TParams[K] extends typeof Number
    ? number
    : TParams[K] extends typeof String
    ? string
    : never;
} {
  return Object.entries(paramsToParse).reduce((object, [param, kind]) => {
    const value = castArray(routeParams[param]).at(0);
    Object.assign(object, {
      [param]: (() => {
        if (!value) return undefined;
        if (kind === Number) return parseInt(value);
        else if (kind === String) return value;
        return undefined;
      })(),
    });
    return object;
  }, {});
}
