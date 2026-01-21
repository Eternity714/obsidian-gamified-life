import "obsidian";
import { GamifiedLifeInterface } from "@/GamifiedLifeInterface";

declare global {
    interface Window {
        GamifiedLifeAPI?: GamifiedLifeInterface;
    }
}

declare module "obsidian" {
    function getIcon(iconId: string, size?: number): SVGSVGElement | null;

    interface MetadataCache {
		trigger(...args: Parameters<MetadataCache["on"]>): void;
		trigger(name: string, ...data: any[]): void;
	}

	interface Vault {
		config: {
			attachmentFolderPath: string;
		};
		adapter: DataAdapter;
	}

	interface DataAdapter {
		basePath?: string;
	}

	interface App {
		appId?: string;
		plugins: {
			getPlugin(plugin: "gamified-life"): GamifiedLifeInterface;
			enabledPlugins: Set<string>;
		};
	}

	interface Workspace {
		on(name: "gamified-life:refresh-option-view", callback: () => void, ctx?: any): EventRef;
		on(name: "gamified-life:refresh-views", callback: () => void, ctx?: any): EventRef;
	}
}
