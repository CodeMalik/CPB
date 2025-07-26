'use client'

const CustomElement = ({
  as: Tag = 'div',
  highlightWords = [],
  highlightClass = 'font-semibold',
  className = '',
  isRed = false,
  isLink = false,
  title = '',
  children,
  linkHref = '#', // optional href when isLink is true
}) => {

  const highlightText = (text) => {
    if (!highlightWords.length) return text;

    const regex = new RegExp(`(${highlightWords.join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch = highlightWords.some(
        (word) => word.toLowerCase() === part.toLowerCase()
      );

      if (!isMatch) return <span key={index}>{part}</span>;

      const spanClass = `${highlightClass} ${isRed ? 'text-red-500' : ''}`;

      if (isLink) {
        return (
          <a key={index} href={linkHref} className={spanClass}>
            {part}
          </a>
        );
      }

      return (
        <span key={index} className={spanClass}>
          {part}
        </span>
      );
    });
  };

  const content = typeof children === 'string'
    ? highlightText(children)
    : title
    ? highlightText(title)
    : children;

  return <Tag className={className}>{content}</Tag>;
};

export default CustomElement;
