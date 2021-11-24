import { getRemainingDaysUntillSabbath } from "../../core/sabbath";
import { IContext } from "../models";

export async function commandSabbathHandler({ reply, i18n }: IContext) {
  const remainingDays = getRemainingDaysUntillSabbath();
  if (remainingDays === 0) {
    reply(i18n.t("sabbath_today"));
  } else {
    reply(i18n.t("sabbath_coming", { remainingDays }));
  }
}
