import React from "react"
import { Tag } from "antd"

export default function TagList({ data }) {
  if (data && data.length > 0) {
    return data.map((element) => (
      <Tag
        key={Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 10)}
      >
        {element}
      </Tag>
    ))
  }
  return (
    <span>
      <i>Vide pour le moment</i>
    </span>
  )
}
