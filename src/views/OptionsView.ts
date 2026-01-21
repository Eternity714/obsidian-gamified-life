import { GamifiedLifeInterface } from "@/GamifiedLifeInterface";
import { App, ItemView, WorkspaceLeaf } from "obsidian";
import { Root, createRoot } from "react-dom/client";

export class OptionsView extends ItemView {
    protected viewType = "gamified-life-options";
    protected displayText = "Gamified Life Options";
    public icon = "gear";
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
        this.contentEl.createEl("h1", { text: "Options" });
    }
}