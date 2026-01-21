/*
    Copyright (C) 2026 Eternity714

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import {
	App, 
	Editor, 
	MarkdownView, 
	Modal, 
	Notice, 
	Plugin,
} from 'obsidian';
import {
	DEFAULT_SETTINGS, 
	GamifiedLifeSettingsInterface,
} from "@/settings/GamifiedLifeSettings";

export default class GamifiedLife extends Plugin {
	settings: GamifiedLifeSettingsInterface;

	get version(): string {
		return this.settings.version;
	}

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('gamepad-2', 'Gamified Life', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('Gamified Life is active! 111');
		});

		this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));

		// // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Gamified Life: On');

		// // This adds a simple command that can be triggered anywhere
		// this.addCommand({
		// 	id: 'open-gamified-life-modal',
		// 	name: 'Open Gamified Life Modal',
		// 	callback: () => {
		// 		new GamifiedLifeModal(this.app).open();
		// 	}
		// });
		// // This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand({
		// 	id: 'gamified-life-replace-selection',
		// 	name: 'Gamified Life: Replace selected content',
		// 	editorCallback: (editor: Editor, view: MarkdownView) => {
		// 		editor.replaceSelection('Gamified Life Content');
		// 	}
		// });
		// // This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'gamified-life-check-command',
		// 	name: 'Gamified Life: Check Command',
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new GamifiedLifeModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 		return false;
		// 	}
		// });

		// // This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new GamifiedLifeSettingTab(this.app, this));

		// // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// // Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	// console.log('click', evt);
		// });

		// // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

	}

	onunload() {
		// this.app.workspace.detachLeavesOfType("gamified-life-readme");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async onLayoutReady() {
		new Notice('Gamified Life: Layout Ready');
	}
}
