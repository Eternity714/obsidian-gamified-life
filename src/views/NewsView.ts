import { GamifiedLifeInterface } from "@/GamifiedLifeInterface";
import { App, ItemView, View, WorkspaceLeaf } from "obsidian";
import { createRoot, Root } from "react-dom/client";

// 更新日志
export class NewsView extends ItemView implements View {
    protected viewType = "gamified-life-news";
    protected displayText = "Gamified Life News";
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
        this.contentEl.empty();
        this.contentEl.createEl("h1", { text: "News" });
    }
}
