export const tabs = {
  all: 'All',
  share: 'Share',
  job: 'Work',
  ask: 'Question',
  good: 'Masterwork',
  dev: 'Test',
}

export const topicSchema = {
  id: '',
  author_id: '',
  tab: '',
  content: '',
  title: '',
  last_reply_at: '',
  good: false,
  top: false,
  reply_count: 0,
  visit_count: 0,
  create_at: '',
  is_collect: '',
  author: {
    loginname: '',
    avatar_url: ''
  },
  replies: []
}

export default topicSchema
