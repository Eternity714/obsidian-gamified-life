import { App, Plugin, PluginSettingTab, Setting, TAbstractFile, TFolder } from "obsidian";

import { GamifiedLifeInterface } from "../GamifiedLifeInterface";

export interface GamifiedLifeSettingsInterface {
	version: string;
}

export type PartialSettings = Partial<GamifiedLifeSettingsInterface>;

export const DEFAULT_SETTINGS: GamifiedLifeSettingsInterface = {
	version: "0.0.0",
};

export class GamifiedLifeSettingTab extends PluginSettingTab {
	private _folderMap: Map<string, string>;

	constructor(
		private _app: App,
		private _plugin: GamifiedLifeInterface,
	) {
		super(_app, _plugin as unknown as Plugin);
	}

	async saveSettings(changed: PartialSettings) {
		this._plugin.settings = { ...this._plugin.settings, ...changed };
		await (this._plugin as unknown as Plugin).saveData(
			this._plugin.settings,
		);

		this._app.workspace.trigger("gamifiedlife:refresh-views");
	}

	display(): void {
		this._createFolderMap();

		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h3", { text: "Gamified Life Settings" });

		// todo 插件设置显示, 待补充
	}

	/**
	 * 递归构建文件夹映射表
	 * 
	 * 遍历 Vault 中的所有文件夹（排除 "Campaigns" 文件夹），并将它们的路径存入 _folderMap 中。
	 * 此方法主要用于生成文件夹选择列表。
	 *
	 * @param parent - 当前遍历的父文件夹。如果为 undefined，则从 Vault 根目录开始。
	 * @param indent - 当前缩进层级（目前主要用于递归传递，暂未直接影响逻辑）。
	 */
	private _createFolderMap(
		parent: TFolder | undefined = undefined,
		indent = 0,
	): void {
		let folderList: TAbstractFile[] = [];
		// 如果指定了父文件夹，获取其子文件夹
		if (parent != undefined) {
			folderList = parent.children.filter(
				(file: TAbstractFile) => file instanceof TFolder,
			);
		} else {
			// 初始化：重置映射表并从根目录开始
			this._folderMap = new Map();
			folderList = this.app.vault
				.getRoot()
				.children.filter(
					(file: TAbstractFile) => file instanceof TFolder,
				);
		}

		// 遍历文件夹列表
		folderList.forEach((folder: TFolder) => {
			// 排除名为 "Campaigns" 的特殊文件夹
			if (folder.name !== "Campaigns") {
				this._folderMap.set(folder.path, folder.path);
				// 递归处理子文件夹
				this._createFolderMap(folder, indent + 1);
			}
		});
	}
}
