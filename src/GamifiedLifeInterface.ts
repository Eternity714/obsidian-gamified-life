import { GamifiedLifeSettingsInterface } from "@/settings/GamifiedLifeSettings";

export interface GamifiedLifeInterface {
    settings: GamifiedLifeSettingsInterface;
    get version(): string;

}