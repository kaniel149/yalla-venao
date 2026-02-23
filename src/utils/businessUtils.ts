// Returns current hour in Panama time (UTC-5, no DST)
function panamaHour(): number {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Panama' })).getHours()
}

// Returns true if business is open right now
export function isOpen(hours: { open: number; close: number }): boolean {
  const h = panamaHour()
  if (hours.close === 0) return h >= hours.open // midnight close
  if (hours.close < hours.open) return h >= hours.open || h < hours.close // overnight
  return h >= hours.open && h < hours.close
}

// Returns human label: "Open · Closes at 10pm" or "Closed · Opens at 7am"
export function openLabel(hours: { open: number; close: number }): string {
  const fmt = (h: number) => {
    if (h === 0) return '12am'
    if (h === 12) return '12pm'
    return h < 12 ? `${h}am` : `${h - 12}pm`
  }
  if (isOpen(hours)) return `Open · Closes ${hours.close === 0 ? '12am' : fmt(hours.close)}`
  return `Closed · Opens ${fmt(hours.open)}`
}

// Haversine distance in km
export function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Returns "120m" or "1.4km"
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`
  return `${km.toFixed(1)}km`
}
