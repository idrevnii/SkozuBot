import { demotivatorImage } from "../demotivator/demotivator";

export async function createDemotivator(
  imgUrl: string,
  titleText: string,
  subtitleText: string
): Promise<Buffer> {
  if (subtitleText.length > 0) {
    return demotivatorImage(
      imgUrl,
      titleText,
      subtitleText,
      calculateFontSize(titleText),
      calculateFontSize(subtitleText)
    );
  } else {
    const splittedTitle = titleText.split(" ");
    const title = splittedTitle.slice(0, splittedTitle.length / 2).join(" ");
    const subtitle = splittedTitle.slice(splittedTitle.length / 2).join(" ");
    return demotivatorImage(
      imgUrl,
      title,
      subtitle,
      calculateFontSize(title),
      calculateFontSize(subtitle)
    );
  }
}

// Calculation with magic coefficients
function calculateFontSize(str: string) {
  const size = Math.ceil(714 / str.split("").length) * 1.5;
  return size > 52 ? 52 : size;
}
