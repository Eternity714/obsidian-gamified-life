import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { GamifiedLifeInterface } from "@/GamifiedLifeInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";

/// <summary>
/// 将 Obsidian 风格的双链 [[Link|Alias]] 或 [[Link]] 转换为标准的 HTML <a> 标签，并附加 data-id 属性
/// </summary>
/// <param name="api">GamifiedLifeInterface 实例</param>
/// <param name="markdown">包含链接的 Markdown 字符串</param>
/// <returns>转换后的 Markdown 字符串</returns>
const transformMarkdownLinks = (api: GamifiedLifeInterface, markdown: string) => {
	return markdown.replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, (_, link, alias) => {
		return `<a href="${link}" data-id="${link}">${alias || link}</a>`;
	});
};

/// <summary>
/// 渲染 Markdown 字符串为 React 组件
/// </summary>
/// <param name="value">Markdown 字符串</param>
/// <param name="specificComponent">可选的特定组件类型，如 "sensory"</param>
/// <param name="className">可选的自定义 CSS 类名</param>
/// <returns>渲染后的 React 组件</returns>
export default function MarkdownComponent({
	value,
	specificComponent,
	className,
}: {
	value?: string;
	specificComponent?: "sensory";
	className?: string;
}): React.ReactElement {
	const api: GamifiedLifeInterface = useApi()!;
	const app: App = useApp()!;


	const transformedValue = transformMarkdownLinks(api, value ?? ""); //.replaceAll("\n\n", "<br/>&nbsp;\n");

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();

		if (e.currentTarget.href) {
			app.workspace.openLinkText(e.currentTarget.dataset.id ?? "", "", false);
		}
	};

	let components: Components = {
		p: ({ ...props }) => <p {...props} className="!mb-0 !mt-0  !bg-transparent" />,
		a: ({ node, ...props }) => (
			<a
				{...props}
				className="!no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
				onClick={handleLinkClick}
			/>
		),
		ul: ({ node, ...props }) => <ul {...props} className="list-disc list-inside" />,
		ol: ({ node, ...props }) => (
			<ol {...props} style={{ listStyleType: "decimal" }} className=" list-inside" />
		),
		li: ({ node, ...props }) => <li {...props} className={"!mb-0"} />,
		h2: ({ node, ...props }) => (
			<h2 {...props} className="!mt-3 !mb-6 !text-2xl !font-bold border-b border-b-[--background-modifier-border]" />
		),
		h3: ({ node, ...props }) => <h3 {...props} className="!mt-3 !mb-1 !text-xl !font-extralight" />,
		small: ({ node, ...props }) => <small {...props} className="!text-xs text-[--text-muted]" />,
	};

	if (specificComponent === "sensory") {
		components = {
			p: ({ ...props }) => <p {...props} className="!mb-0 !mt-0  !bg-transparent" />,
			a: ({ node, ...props }) => (
				<a
					{...props}
					className="!no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
					onClick={handleLinkClick}
				/>
			),
			ul: ({ node, ...props }) => <ul {...props} className="list-disc" />,
			ol: ({ node, ...props }) => <ol {...props} className="list-none" />,
			li: ({ node, ...props }) => <li {...props} className={"!mb-1"} />,
			h2: ({ node, ...props }) => (
				<h2 {...props} className="!mt-3 !mb-6 !text-2xl !font-bold border-b border-b-[--background-modifier-border]" />
			),
			h3: ({ node, ...props }) => <h3 {...props} className="!mt-3 !mb-1 !text-xl !font-extralight" />,
			small: ({ node, ...props }) => <small {...props} className="!text-xs text-[--text-muted]" />,
		};
	}

	return (
		<div className={`markdown-content ${className ?? ""}`}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				children={transformedValue}
				components={components}
			/>
		</div>
	);
}
