interface Props {
  className: string
}

export default function Link({ className }: Props) {
  return (
    <svg
      className={className}
      width='512'
      height='512'
      viewBox='0 0 512 512'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        id='b'
        width='512'
        height='512'
        x='0'
        y='0'
        rx='128'
        fill='url(#a)'
        stroke='#FFF'
        strokeWidth='0'
        strokeOpacity='100%'
        paintOrder='stroke'
      />
      <defs>
        <linearGradient
          id='a'
          gradientUnits='userSpaceOnUse'
          gradientTransform='rotate(45)'
          style={{
            transformOrigin: 'center center'
          }}
        >
          <stop stopColor='#4ADE80' />
          <stop offset='1' stopColor='#3B82F6' />
        </linearGradient>
      </defs>
      <svg
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
        width='352'
        height='352'
        x='80'
        y='80'
        alignmentBaseline='middle'
        style={{
          color: '#fff'
        }}
      >
        <path
          d='M4.25 7.75 2.539 9.654a2.692 2.692 0 1 0 3.807 3.807L8.25 11.75m3.5-3.5 1.711-1.904A2.692 2.692 0 1 0 9.654 2.54L7.75 4.25m-1 5 2.5-2.5'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </svg>
  )
}
