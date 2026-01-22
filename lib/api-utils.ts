// ShrinkMe API Integration for Monetization
const SHRINKME_API_KEY = '99a3b5b93b3c9ff5970f7fd070f313de58e610d1'
const SHRINKME_API_URL = 'https://shrinkme.io/api'

export async function shortenWithShrinkMe(originalUrl: string): Promise<string> {
  try {
    const apiUrl = `${SHRINKME_API_URL}?api=${SHRINKME_API_KEY}&url=${encodeURIComponent(originalUrl)}&format=text`
    const response = await fetch(apiUrl)
    const shortLink = await response.text()
    return shortLink.trim() || originalUrl
  } catch (error) {
    console.error('[v0] ShrinkMe error:', error)
    return originalUrl
  }
}

// TikTok Downloader API
export async function fetchTikTok(url: string) {
  try {
    const response = await fetch('https://api.vardxg.me/v1/tiktok/delta/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        m: 'video',
      }),
    })
    const data = await response.json()
    console.log('[v0] TikTok response:', data)
    if (data.video) {
      const shortLink = await shortenWithShrinkMe(data.video)
      return { ...data, video: shortLink }
    }
    return data
  } catch (error) {
    console.error('[v0] TikTok error:', error)
    throw error
  }
}

// Logo Maker API
export async function createLogo(themeUrl: string, text: string) {
  try {
    const response = await fetch('https://logo-maker-api--codersensui.repl.co/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        theme: themeUrl,
        text: text,
      }),
    })
    const data = await response.json()
    console.log('[v0] Logo response:', data)
    if (data.image) {
      const shortLink = await shortenWithShrinkMe(data.image)
      return { ...data, image: shortLink }
    }
    return data
  } catch (error) {
    console.error('[v0] Logo error:', error)
    throw error
  }
}

// File Downloader API
export async function getFileDownloadLink(fileUrl: string) {
  try {
    const response = await fetch('https://ddl-api.cycno.repl.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: fileUrl,
      }),
    })
    const data = await response.json()
    console.log('[v0] File download response:', data)
    if (data.download_link) {
      const shortLink = await shortenWithShrinkMe(data.download_link)
      return { ...data, download_link: shortLink }
    }
    return data
  } catch (error) {
    console.error('[v0] File download error:', error)
    throw error
  }
}

// Shazam Music Identification API
export async function identifyMusic(mp3Url: string) {
  try {
    const response = await fetch(
      `https://ugap.uz/app/assets/py/test.php?url=${encodeURIComponent(mp3Url)}`
    )
    const data = await response.json()
    console.log('[v0] Shazam response:', data)
    return data
  } catch (error) {
    console.error('[v0] Shazam error:', error)
    throw error
  }
}

// Temp Mail API
export async function getTempMailDomains() {
  try {
    const response = await fetch('https://api.barid.site/domains')
    const domains = await response.json()
    console.log('[v0] TempMail domains:', domains)
    return domains
  } catch (error) {
    console.error('[v0] TempMail domains error:', error)
    throw error
  }
}

export async function getTempMailEmails(email: string) {
  try {
    const response = await fetch(`https://api.barid.site/emails/${email}`)
    const emails = await response.json()
    console.log('[v0] TempMail emails:', emails)
    return emails
  } catch (error) {
    console.error('[v0] TempMail emails error:', error)
    throw error
  }
}

// AI Chat API (GPT4Free)
const AI_API_KEY = '53683466467265654B65794032303234'

export async function chatWithAI(message: string) {
  try {
    const response = await fetch('https://api.sh4f.lol/v1/gpt4free/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        k: AI_API_KEY,
      }),
    })
    const data = await response.json()
    console.log('[v0] AI response:', data)
    return data
  } catch (error) {
    console.error('[v0] AI error:', error)
    throw error
  }
}

// Copy to clipboard utility
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('[v0] Copy error:', error)
    return false
  }
}
