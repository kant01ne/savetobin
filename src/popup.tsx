import React from 'react'
import { Storage } from '@plasmohq/storage'
import '../assets/popup.css'
import icon from '../assets/icon.png'

function IndexPopup() {
  const storage = new Storage()
  const [value, setValue] = React.useState<number | undefined>(undefined)

  const openTwitterAccount = (event) => {
    event.preventDefault()
    event.stopPropagation()
    chrome.tabs.create({ url: 'https://twitter.com/saveToBin' })
  }

  React.useEffect(() => {
    storage.get('deletedTweetsCount').then((count) => {
      if (count) {
        setValue(parseInt(count))
      }
    })
  }, [])

  return (
    <div
      style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          height: '48px',
          width: '48px',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={openTwitterAccount}
        className="bg-hover-gray"
      >
        <img
          style={{
            width: '80%',
          }}
          src={icon}
          alt="logo"
        />
      </div>
      <div
        style={{
          marginLeft: '12px',
          display: 'flex',
          flexDirection: 'column',
          width: '25rem',
        }}
      >
        <a
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: 'inherit',
            textDecoration: 'none',
          }}
          onClick={openTwitterAccount}
          href="https://twitter.com/saveToBin"
        >
          <span
            style={{
              boxSizing: 'border-box',
              lineHeight: '1.25rem',
              fontWeight: '700',
              marginRight: '.25rem',
            }}
          >
            SaveToBin
          </span>{' '}
          <span style={{ color: '#536471', marginRight: '.25rem' }}>
            @saveToBin
          </span>{' '}
          <span style={{ color: '#536471' }}> · Now</span>
        </a>
        <article style={{ paddingTop: '.25rem' }}>
          {value
            ? `Hey! I've deleted ${value} (useless) tweet${
                value > 1 ? 's' : ''
              } for
          you.`
            : "You can safely browse your Twitter timeline now. I'm looking for those stupid @saveToSummarizeThread tweets."}
        </article>
      </div>
    </div>
  )
}

export default IndexPopup
