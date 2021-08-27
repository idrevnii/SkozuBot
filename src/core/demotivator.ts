import { demotivatorImage } from "../demotivator/demotivator";

export async function createDemotivator(
  imgUrl: string,
  title: string,
  subtitle: string
): Promise<Buffer> {
  return demotivatorImage(
    imgUrl,
    title,
    subtitle,
    calculateFontSize(title),
    calculateFontSize(subtitle)
  );
}

// Calculation with magic coefficients
function calculateFontSize(str: string) {
  return Math.ceil(714 / str.split("").length) * 2;
}
