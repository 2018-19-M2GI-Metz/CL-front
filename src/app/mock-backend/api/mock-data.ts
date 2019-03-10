import { Place } from "model/place";
import { Path } from "model/path";



/**
 * Villes disponibles dans l'application.
 */
export const PARIS = { name: "paris", id: 1, posX: 48.856783, posY: 2.348773 };
export const METZ = { name: "metz", id: 2, posX: 49.119457, posY: 6.175982 };
export const CHARLEVILLE = { name: "charleville", id: 3, posX: 49.762460, posY: 4.722300 };

export const cities: Place[] = [PARIS, METZ, CHARLEVILLE];

/**
 * Tous les chemins disponibles dans l'application.
 */
export const path1: Path = { startPlace: PARIS, endPlace: METZ };
export const path2: Path = { startPlace: METZ, endPlace: CHARLEVILLE };
export const path3: Path = { startPlace: CHARLEVILLE, endPlace: PARIS };
export const path4: Path = { startPlace: CHARLEVILLE, endPlace: METZ };
export const path5: Path = { startPlace: METZ, endPlace: PARIS };
export const path6: Path = { startPlace: PARIS, endPlace: CHARLEVILLE };

/**
 * Listes des chemins.
 */
export const paths: Path[] = [path1, path2, path3, path4, path5, path6];
