import React from "react"

import { PlusCircleFilled, ClockCircleFilled, CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons"

export default function StatusIcon(props) {
  const { status, style } = props
  if (status === "Opportunity") {
    return <PlusCircleFilled style={style} />
  }
  if (status === "In-progress") {
    return <ClockCircleFilled style={style} />
  }
  if (status === "Closed") {
    return <CheckCircleFilled style={style} />
  }
  return <CloseCircleFilled style={style} />
}
