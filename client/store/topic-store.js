import {
  observable,
  // toJS,
  computed,
  action,
  extendObservable
} from 'mobx'
import { topicSchema } from '../util/variable-define'
import { get } from '../util/http'

const createTopic = topic => (
  Object.assign({}, topicSchema, topic)
)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  @observable syncing = false
}

export default class TopicStore {
  @observable topics
  @observable details
  @observable syncing

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
}
