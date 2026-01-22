// Analytics utility for tracking user interactions
// Uses localStorage to store visit count and last visit date
// Can be extended to send data to analytics services

interface AnalyticsEvent {
  event: string
  tool: string
  timestamp: number
  language: string
}

const ANALYTICS_KEY = 'getwealth_analytics'
const VISIT_COUNT_KEY = 'getwealth_visits'
const LAST_VISIT_KEY = 'getwealth_last_visit'

export const trackEvent = (event: string, tool: string, language: string = 'en') => {
  try {
    const analyticsData: AnalyticsEvent = {
      event,
      tool,
      timestamp: Date.now(),
      language,
    }

    // Store in localStorage
    const events = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]')
    events.push(analyticsData)
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.shift()
    }
    
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events))

    // Log to console for debugging
    console.log('[v0] Analytics event:', analyticsData)
  } catch (error) {
    console.error('[v0] Analytics error:', error)
  }
}

export const trackVisit = () => {
  try {
    const today = new Date().toDateString()
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY)
    
    if (lastVisit !== today) {
      let visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0')
      visitCount++
      
      localStorage.setItem(VISIT_COUNT_KEY, visitCount.toString())
      localStorage.setItem(LAST_VISIT_KEY, today)
      
      console.log('[v0] Visit tracked. Total visits:', visitCount)
    }
  } catch (error) {
    console.error('[v0] Visit tracking error:', error)
  }
}

export const getAnalytics = () => {
  try {
    const events = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '[]')
    const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0')
    
    return {
      events,
      visitCount,
      toolUsage: getToolUsageStats(events),
    }
  } catch (error) {
    console.error('[v0] Get analytics error:', error)
    return { events: [], visitCount: 0, toolUsage: {} }
  }
}

const getToolUsageStats = (events: AnalyticsEvent[]) => {
  const stats: { [key: string]: number } = {}
  
  events.forEach((event) => {
    stats[event.tool] = (stats[event.tool] || 0) + 1
  })
  
  return stats
}

export const clearAnalytics = () => {
  try {
    localStorage.removeItem(ANALYTICS_KEY)
    localStorage.removeItem(VISIT_COUNT_KEY)
    localStorage.removeItem(LAST_VISIT_KEY)
    console.log('[v0] Analytics cleared')
  } catch (error) {
    console.error('[v0] Clear analytics error:', error)
  }
}
