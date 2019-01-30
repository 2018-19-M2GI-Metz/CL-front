import { Place } from "model/place";
import { Path } from "model/path";



/**
 * Villes disponibles dans l'application.
 */
export const PARIS = { name: "paris", id: 1, lon: 48.856783, lat: 2.348773 };
export const METZ = { name: "metz", id: 2, lon: 49.119457, lat: 6.175982 };
export const CHARLEVILLE = { name: "charleville", id: 3, lon: 49.762460, lat: 4.722300 };

export const cities: Place[] = [PARIS, METZ, CHARLEVILLE];

/**
 * Tous les chemins disponibles dans l'application.
 */
export const path1: Path = { start: PARIS, end: METZ };
export const path2: Path = { start: METZ, end: CHARLEVILLE };
export const path3: Path = { start: CHARLEVILLE, end: PARIS };
export const path4: Path = { start: CHARLEVILLE, end: METZ };
export const path5: Path = { start: METZ, end: PARIS };
export const path6: Path = { start: PARIS, end: CHARLEVILLE };

/**
 * Listes des chemins.
 */
export const paths: Path[] = [path1, path2, path3, path4, path5, path6];
