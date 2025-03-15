import timeline from 'vitepress-markdown-timeline'
import taskCheckbox from 'markdown-it-task-checkbox'
import { type MarkdownOptions } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'

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
    md.use(tabsMarkdownPlugin)
    md.use(groupIconMdPlugin)
    md.use(taskCheckbox, {
      disabled: false,
      divWrap: false,
      divClass: 'checkbox',
      idPrefix: 'cbx_',
      ulClass: 'task-list',
      liClass: 'task-list-item'
    })
  }
} 