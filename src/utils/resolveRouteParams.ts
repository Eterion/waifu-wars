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
  TParams extends Record<string, NumberConstructor | StringConstructor>
>(routeParams: RouteParams, paramsToParse: TParams) {
  return Object.entries(paramsToParse).reduce(
    (object, [param, type]) => {
      const value = castArray(routeParams[param]).at(0);
      Object.assign(object, {
        [param]: value
          ? type === Number
            ? parseInt(value)
            : value
          : undefined,
      });
      return object;
    },
    {} as {
      [K in keyof TParams]:
        | (TParams[K] extends NumberConstructor ? number : string)
        | undefined;
    }
  );
}
