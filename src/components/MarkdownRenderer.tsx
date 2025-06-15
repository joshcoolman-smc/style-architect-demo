
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-structural prose-p:font-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: {
            inline?: boolean;
            className?: string;
            children: React.ReactNode;
            [key: string]: any;
          }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && language) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.75rem',
                    backgroundColor: '#0f0f0f',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            return (
              <code 
                className="bg-muted px-1.5 py-0.5 rounded text-sm font-technical" 
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-heading-1 font-structural text-foreground border-b border-border pb-3unit mb-6unit">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-heading-2 font-structural text-foreground mt-8unit mb-4unit">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-heading-3 font-structural text-foreground mt-6unit mb-3unit">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-body font-content text-foreground mb-4unit leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-unit text-body font-content text-foreground mb-4unit">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-unit text-body font-content text-foreground mb-4unit">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-border pl-4unit py-unit bg-muted/30 rounded-r-lg italic text-muted-foreground font-content mb-4unit">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-primary hover:text-primary/80 underline font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
