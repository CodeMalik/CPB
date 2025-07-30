import React from 'react'

const CustomHtml = ({html, as: Component = 'div', className = ''}) => {
  return (
    <Component className={className} dangerouslySetInnerHTML={{ __html: html }}/>
  )
}

export default CustomHtml