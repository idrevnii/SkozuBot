import { DateTime } from "luxon"

export function getRemainingSabbathDays() {
    const today = DateTime.now().setZone("Europe/Moscow").weekday
    return today === 7 ? 6 : 6 - today
}
