import { useEffect, useState } from "react";
import {marked} from 'marked';
import DOMPurify from 'dompurify';
import './mark.css';

const MarkdownPreviewer = () => {
    const defaultMarkdown = `# Heading 1
## Heading 2
[Link to Google](https://www.google.com)
\`Inline Code\`
\`\`\`
// Code Block
const greet = (name) => {
  console.log("Hello, " + name);
}
\`\`\`
- List Item 1
- List Item 2
> Blockquote

**Bold Text**`;

    const [markdown, setMarkdown] = useState(defaultMarkdown);
    const [html, setHtml] = useState('');

    useEffect(()=> {
        // Convert Markdown to HTML using marked library
        const convertedHtml = marked(markdown);
        // Sanitize HTML to prevent XSS attacks
        const sanitizedHtml = DOMPurify.sanitize(convertedHtml);
        setHtml(sanitizedHtml);
    }, [markdown]);

    const handleInputChange = (e)=> {
        setMarkdown(e.target.value)
    }

    return ( 
        <div className="markdown-previewer">
            <div className="editor">
                <textarea id="editor" onChange={handleInputChange} value={markdown}></textarea>
            </div>
            <div className="preview" id="preview" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
     );
}
 
export default MarkdownPreviewer;