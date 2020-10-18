import React from 'react'

interface Props {
  items: string[]
}

const StringList: React.FunctionComponent<Props> = ({ items }) => {
  
  const getListItem = (item: string, index: number) => (
    <li key={index}>
      {item}
    </li>
  )

  return (
    <ol>
      {items.map(getListItem)}
    </ol>
  )
}
export default StringList