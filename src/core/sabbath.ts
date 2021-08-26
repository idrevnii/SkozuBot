import { DateTime } from "luxon";

export function getRemainingDaysUntillSabbath() {
  return 6 - DateTime.now().setZone("Europe/Moscow").weekday;
}
