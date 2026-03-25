import React from 'react'
import { replaceInternalLinks } from '@/lib/linkReplacer'

const CustomHtml = ({html, as: Component = 'div', className = ''}) => {
  return (
    <Component className={className} dangerouslySetInnerHTML={{ __html: replaceInternalLinks(html) }}/>
  )
}

export default CustomHtml