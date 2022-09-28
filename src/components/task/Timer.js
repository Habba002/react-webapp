import { useEffect, useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Timer({time}){
  const [realTime, setRealTime] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(dayjs(time).add(1, "second").fromNow())
    }, 1000)

    return () => clearInterval(interval)
  })

  return <>{realTime}</>
}