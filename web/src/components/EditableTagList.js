/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react"
import { Tag, Input, Button } from "antd"
import { CloseOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons"

export default function EditableTagList({ data, onUpdateData }) {
  const [visibility, setVisibility] = useState(false)
  const [text, setText] = useState("")

  return (
    <div className="editable-tag-list">
      {data.map((element) => (
        <Tag key={element}>
          <span
            onClick={() => {
              setText(element)
              onUpdateData([...data].filter((x) => x !== element))
              setVisibility(true)
            }}
          >
            {element}
          </span>
          <CloseOutlined onClick={() => onUpdateData(data.filter((x) => x !== element))} />
        </Tag>
      ))}
      <Tag
        key="NewTag"
        style={{ backgroundColor: "var(--dia-blue)", borderColor: "var(--dia-blue)", color: "white" }}
        onClick={() => {
          setText("")
          setVisibility(true)
        }}
      >
        <span>Nouveau</span>
        <PlusOutlined />
      </Tag>
      {visibility === true && (
        <Input
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={() => {
            if (text !== "") {
              onUpdateData([...data, text])
            }
            setVisibility(false)
          }}
          onBlur={() => {
            if (text !== "") {
              onUpdateData([...data, text])
            }
            setVisibility(false)
          }}
          ref={(input) => input && input.focus()}
          addonAfter={
            <Button type="primary" style={{ width: "100%", padding: "0" }}>
              {"   "}
              <CheckOutlined />
              {"   "}
            </Button>
          }
        />
      )}
    </div>
  )
}
