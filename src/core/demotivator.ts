import { demotivatorImage } from "../demotivator/demotivator";

export async function createDemotivator(
  imgUrl: string,
  title: string,
  subtitle: string
): Promise<any> {
  return demotivatorImage(imgUrl, title, subtitle);
}
