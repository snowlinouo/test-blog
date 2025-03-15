import timeline from 'vitepress-markdown-timeline'
import { type MarkdownOptions } from 'vitepress'

export const markdown: MarkdownOptions = {
  container: {
    tipLabel: '提示',
    warningLabel: '警告',
    dangerLabel: '危險',
    infoLabel: '資訊',
    detailsLabel: '詳細資訊'
  },
  config: (md) => {
    md.use(timeline)
  }
} 