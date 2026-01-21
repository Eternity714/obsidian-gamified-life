import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { ApiContext } from "@/contexts/ApiContext";
import { AppContext } from "@/contexts/AppContext";
import { GamifiedLifeInterface } from "@/GamifiedLifeInterface";
import { App, ItemView, View, WorkspaceLeaf } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";

/// <summary>
/// 显示 Gamified Life 插件的文档
/// </summary>
export class ReadmeView extends ItemView implements View {
    protected viewType = "gamified-life-readme";
    protected displayText = "Gamified Life Documentation";
    public icon = "gamepad-2";
    private _root: Root | undefined = undefined;

    constructor(private _app: App, private _api: GamifiedLifeInterface, leaf: WorkspaceLeaf) {
        super(leaf);

        this._root = createRoot(this.contentEl);
    }

    getViewType(): string {
        return this.viewType;
    }

    getDisplayText(): string {
        return this.displayText;
    }

    protected async onOpen(): Promise<void> {
        this.render();
    }

    onResize(): void {
        super.onResize();
        this.render();
    }

    async render(): Promise<void> {
        const readmeUrl = "https://raw.githubusercontent.com/Eternity714/obsidian-gamified-life/refs/heads/master/README.md";

        const response = await fetch(readmeUrl);
		const readmeContent = await response.text();

        const elementComponent = createElement(MarkdownComponent, {
			value: readmeContent,
		});

        const reactComponent = createElement(
			AppContext.Provider,
			{ value: this._app },
			createElement(ApiContext.Provider, { value: this._api }, elementComponent)
		);

        this._root?.render(reactComponent);
    }
}