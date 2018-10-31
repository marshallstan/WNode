import {
  observable,
  computed,
  action,
  extendObservable
} from 'mobx'
import { topicSchema, replySchema } from '../util/variable-define'
import { get, post } from '../util/http'

const createTopic = topic => (
  Object.assign({}, topicSchema, topic)
)

const createReply = reply => (
  Object.assign({}, replySchema, reply)
)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  @observable syncing = false
  @observable createdReplies = []

  @action doReply(content) {
    return new Promise((resolve, reject) => {
      post(`/topic/${this.id}/replies`, { needAccessToken: true }, { content })
        .then((resp) => {
          if (resp.success) {
            this.createdReplies.push(createReply({
              create_at: Date.now(),
              id: resp.reply_id,
              content
            }))
            resolve()
          } else {
            reject(resp)
          }
        })
        .catch(reject)
    })
  }
}

export default class TopicStore {
  @observable topics
  @observable details
  @observable syncing
  @observable createdTopics = []

  constructor({ topics = [], syncing = false, details = [] } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(detail => new Topic(createTopic(detail)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      const temp = result
      temp[detail.id] = detail
      return temp
    }, {})
  }

  @action fetchTopics(tab) {
    return new Promise((resolve, reject) => {
      this.syncing = true
      this.topics = []
      get('/topics', {
        mdrender: false,
        tab
      }).then((resp) => {
        if (resp.success) {
          resp.data.forEach((topic) => {
            this.addTopic(topic)
          })
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      })
        .catch((err) => {
          reject(err)
          this.syncing = false
        })
    })
  }

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data))
            this.details.push(topic)
            resolve(topic)
          } else {
            reject()
          }
        })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }

  @action createTopic(title, tab, content) {
    return new Promise((resolve, reject) => {
      post('/topics', { needAccessToken: true }, { title, tab, content })
        .then((resp) => {
          if (resp.success) {
            const topic = {
              title,
              tab,
              content,
              id: resp.topic_id,
              create_at: Date.now()
            }
            this.createdTopics.push(new Topic(createTopic(topic)))
            resolve()
          } else {
            reject()
          }
        })
        .catch(reject)
    })
  }
}
