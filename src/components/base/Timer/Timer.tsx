import { useEffect, useState } from 'react'

interface PropTypes {
  durationInSeconds: number
  handleTimerEnd: () => void
}
function formatNumber(number: number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
}

const Timer = ({ durationInSeconds, handleTimerEnd }: PropTypes) => {
  const [secondsLeft, setSecondsLeft] = useState(formatNumber(durationInSeconds))

  useEffect(() => {
    const duration = durationInSeconds
    const endTime = new Date()
    endTime.setSeconds(endTime.getSeconds() + duration)
    let seconds = duration

    const interval = setInterval(() => {
      seconds--
      const newSecondsValue = formatNumber(seconds)
      if (seconds === 0) {
        clearInterval(interval)
        onTimerEnd()
      }
      setSecondsLeft(newSecondsValue)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const onTimerEnd = () => {
    handleTimerEnd()
  }


  return (
  <span className="countdown">
    <span style={{"--value":secondsLeft} as any}></span>
  </span>
  )
}

export default Timer
