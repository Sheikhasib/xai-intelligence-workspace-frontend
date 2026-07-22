export type PanelType = 'stat' | 'chart' | 'table' | 'stats-group'

export interface StatData {
  label: string
  value: number
  suffix?: string
}

export interface TabData {
  id: string
  label: string
  type: PanelType
  data?: StatData[]
}
