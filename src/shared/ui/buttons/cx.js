/**
 * Yhdistää annetut merkkijonot yhdeksi luokkanimimerkkijonoksi.
 *
 * Funktio:
 * - ottaa vastaan yhden tai useamman argumentin
 * - sallii myös taulukot (ne litistetään)
 * - suodattaa pois muut kuin merkkijonot (esim. false, null, undefined)
 * - yhdistää luokkanimet välilyönnillä eroteltuna
 * - poistaa lopusta mahdolliset ylimääräiset välilyönnit
 *
 * Tätä käytetään tyypillisesti CSS‑luokkien ehdolliseen
 * yhdistämiseen React‑komponenteissa kevyenä vaihtoehtona
 * kirjastoille kuten clsx tai classnames.
 *
 * @see https://dev.to/seasonedcc/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bf
 *      Artikkeli, jossa esitellään tämä kevyt apufunktio
 *      clsx/classnames‑kirjastojen korvaajaksi.
 *
 * @param {...(string|string[])} args
 *   Yksi tai useampi merkkijono tai merkkijonotaulukko.
 *   Ei‑merkkijonoarvot jätetään huomiotta.
 *
 * @returns {string}
 *   Yhdistetty luokkanimimerkkijono.
 *
 * @example
 * cx('button', 'primary');
 * // → "button primary"
 *
 * @example
 * cx('button', false && 'disabled', ['large', 'rounded']);
 * // → "button large rounded"
 *
 */
function cx(...args) {
  return args
    .flat()
    .filter(x => typeof x === 'string')
    .join(' ')
    .trim()
}

export default cx
