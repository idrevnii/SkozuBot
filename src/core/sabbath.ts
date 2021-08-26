import { DateTime } from "luxon/src/datetime";

export function getRemainingDaysUntillSabbath() {
  return 6 - DateTime.now().setZone("Europe/Moscow").weekday;
}
