import React from 'react';
import { BLOCKS, INLINES, MARKS, Node, Text, Inline, Block } from '@contentful/rich-text-types'; // Import necessary types
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import ContentfulImage from './ui/ContentfulImage';

interface RichTextProps {
  productDesc: any; // Use Node type for content
}

const options: Options = {
  renderMark: {
    [MARKS.CODE]: (text) => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      );
    },
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (Array.isArray(node.content)) {
        const hasCodeMark = node.content.some((item) => {
          return (
            item.nodeType === 'text' &&
            item.marks?.some((mark) => mark.type === 'code')
          );
        });

        if (hasCodeMark) {
          return (
            <div>
              <pre>
                <code>{children}</code>
              </pre>
            </div>
          );
        }
      }

      return <p>{children}</p>;
    },

    [INLINES.ENTRY_HYPERLINK]: (node) => {
        console.log(node.data.target.fields);
        
      if (node.data.target.sys.contentType.sys.id === 'post') {
        return (
          <Link href={`/posts/${node.data.target.fields.slug}`}>
            {node.data.target.fields.title}
          </Link>
        );
      }
    },

    [INLINES.HYPERLINK]: (node) => {
      const textNode = node.content.find(
        (item) => item.nodeType === 'text'
      ) as Text;

      if (textNode) {
        const text = textNode.value;

        return (
          <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
            {text}
          </a>
        );
      }

      return null;
    },

    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        console.log(node.data.target.fields);
        
      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            height='400'
            width='100%'
            src={node.data.target.fields.embedUrl}
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }

      return null;
    },

    [BLOCKS.EMBEDDED_ASSET]: (node) => {
        console.log(node.data.target.fields);
        
      return (
        <ContentfulImage
          src={node.data.target.fields.file.url}
          height={
            node.data.target.fields.file.details.image.height
          }
          width={
            node.data.target.fields.file.details.image.width
          }
          alt={node.data.target.fields.title}
          className='h-20 w-20'
        />
      );
    },
  },
};

const RichText: React.FC<RichTextProps> = ({ productDesc }) => {
  return <>{documentToReactComponents(productDesc, options)}</>;
};

export default RichText;
