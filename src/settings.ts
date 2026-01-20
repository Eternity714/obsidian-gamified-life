import {App, PluginSettingTab, Setting} from "obsidian";
import GamifiedLifePlugin from "./main";

export interface GamifiedLifeSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: GamifiedLifeSettings = {
	mySetting: 'default'
}

export class GamifiedLifeSettingTab extends PluginSettingTab {
	plugin: GamifiedLifePlugin;

	constructor(app: App, plugin: GamifiedLifePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Support / 赞助')
			.setDesc('Support the development of this plugin via WeChat or Alipay.')
		
		const supportDiv = containerEl.createDiv({ cls: 'gamified-life-support' });
		supportDiv.style.display = 'flex';
		supportDiv.style.justifyContent = 'space-around';
		supportDiv.style.marginTop = '20px';

		const wechatDiv = supportDiv.createDiv({ cls: 'gamified-life-qr' });
		wechatDiv.createEl('h4', { text: 'WeChat Pay / 微信' });
		wechatDiv.createEl('img', { 
			attr: { 
				src: 'https://raw.githubusercontent.com/Eternity714/obsidian-gamified-life/master/funding/wechat.jpg',
				width: '200'
			} 
		});

		const alipayDiv = supportDiv.createDiv({ cls: 'gamified-life-qr' });
		alipayDiv.createEl('h4', { text: 'Alipay / 支付宝' });
		alipayDiv.createEl('img', { 
			attr: { 
				src: 'https://raw.githubusercontent.com/Eternity714/obsidian-gamified-life/master/funding/alipay.jpg',
				width: '200'
			} 
		});

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
