// Handles localStorage favorites for guests
export type GuestFavorite = { type: string; itemId: string };

const KEY = "guest_favorites";

export function getGuestFavorites(): GuestFavorite[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function isGuestFavorite(type: string, itemId: string) {
  return getGuestFavorites().some(f => f.type === type && f.itemId === itemId);
}

export function addGuestFavorite(type: string, itemId: string) {
  const favs = getGuestFavorites();
  if (!isGuestFavorite(type, itemId)) {
    favs.push({ type, itemId });
    localStorage.setItem(KEY, JSON.stringify(favs));
  }
}

export function removeGuestFavorite(type: string, itemId: string) {
  const favs = getGuestFavorites().filter(f => !(f.type === type && f.itemId === itemId));
  localStorage.setItem(KEY, JSON.stringify(favs));
}