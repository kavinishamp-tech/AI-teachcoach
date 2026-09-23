const POSITIVE_WORDS = [
  'great','good','excellent','amazing','wonderful','happy','excited','proud',
  'fantastic','love','enjoyed','successful','engaged','curious','motivated',
  'energised','confident','inspired','alive','breakthrough','clicked','worked',
  'improved','progress','achieved','thrilled','grateful','calm','peaceful',
  'focused','productive','creative','rewarding','fulfilling','wonderful','clarity'
]

const NEGATIVE_WORDS = [
  'struggle','difficult','hard','confused','lost','frustrated','stressed',
  'overwhelmed','exhausted','tired','failed','wrong','bad','problem','issue',
  'chaotic','disengaged','distracted','bored','worried','anxious','tense',
  'upset','disappointing','rushed','behind','missed','late','disrupted',
  'noisy','unclear','messy','complicated','trouble','chaos','annoyed'
]

const CALM_WORDS = [
  'reflect','think','wonder','consider','notice','observe','realise','learn',
  'understand','explore','discover','patient','steady','settled','routine',
  'planned','organised','prepared','balanced','thoughtful','mindful','aware'
]

export function analyseMood(text) {
  if (!text || text.trim().length === 0) {
    return {
      mood: 'Neutral', score: 0, emoji: '😐',
      color: 'neutral', intensity: 50,
      message: 'No reflection yet today.',
      tip: 'Write your first reflection to see your mood.',
      gradient: 'linear-gradient(135deg,#e0c3fc,#8ec5fc)',
      textColor: '#5b21b6'
    }
  }

  const words = text.toLowerCase().split(/\s+/)
  let posScore = 0
  let negScore = 0
  let calmScore = 0

  words.forEach(w => {
    const clean = w.replace(/[^a-z]/g, '')
    if (POSITIVE_WORDS.includes(clean)) posScore++
    if (NEGATIVE_WORDS.includes(clean)) negScore++
    if (CALM_WORDS.includes(clean)) calmScore++
  })

  const total = Math.max(words.length, 1)
  const posRatio  = posScore / total
  const negRatio  = negScore / total
  const calmRatio = calmScore / total
  const netScore  = (posRatio - negRatio) * 100

  let mood, emoji, gradient, textColor, message, tip

  if (netScore > 15) {
    mood = 'Joyful'
    emoji = '😊'
    gradient = 'linear-gradient(135deg,#fddb92,#d1fdff)'
    textColor = '#92400e'
    message = "You are having a wonderful teaching day!"
    tip = "Channel this energy into tomorrow's lesson opener."
  } else if (netScore > 5 || calmRatio > 0.04) {
    mood = 'Calm'
    emoji = '😌'
    gradient = 'linear-gradient(135deg,#a1c4fd,#c2e9fb)'
    textColor = '#1e40af'
    message = "You are in a steady, reflective space today."
    tip = "This is a great state for deep lesson planning."
  } else if (netScore > -5) {
    mood = 'Neutral'
    emoji = '😐'
    gradient = 'linear-gradient(135deg,#e0c3fc,#8ec5fc)'
    textColor = '#5b21b6'
    message = "A balanced day — neither high nor low."
    tip = "Try noting one moment of curiosity from today."
  } else if (netScore > -15) {
    mood = 'Stressed'
    emoji = '😤'
    gradient = 'linear-gradient(135deg,#ffecd2,#fcb69f)'
    textColor = '#9a3412'
    message = "It sounds like today had some friction."
    tip = "Take 5 minutes before tomorrow to reset your intention."
  } else {
    mood = 'Overwhelmed'
    emoji = '😔' 
    gradient = 'linear-gradient(135deg,#ff9a9e,#fecfef)'
    textColor = '#9d174d'
    message = "Today feels heavy — and that is okay."
    tip = "Talk to a trusted colleague. You do not have to carry this alone."
  }

  const intensity = Math.min(100, Math.max(10, 50 + netScore * 2))

  return {
    mood, emoji, gradient, textColor, message, tip,
    score: Math.round(netScore),
    intensity: Math.round(intensity),
    posWords: posScore,
    negWords: negScore,
  }
}

export function getWeekMoods(reflections) {
  return reflections.slice(0, 7).map(r => ({
    date: r.date,
    tag: r.tag,
    ...analyseMood(r.response)
  }))
}