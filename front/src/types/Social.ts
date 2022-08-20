export type SocialType = "vk" | "odnoklassniki" | "facebook" | "twitter" | "instagram";
export type SocialRecord = Record<SocialType, string | undefined>;

export const socials: SocialType[] = ["vk", "odnoklassniki", "facebook", "twitter", "instagram"];
