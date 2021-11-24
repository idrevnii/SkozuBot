import { DateTime } from "luxon";

export function getRemainingDaysUntillSabbath() {
  const today = DateTime.now().setZone("Europe/Moscow").weekday;
  return today === 7 ? 6 : 6 - today;
}
