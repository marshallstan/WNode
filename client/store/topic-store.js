import {
  observable,
  // toJS,
  // computed,
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
  @observable syncing

  constructor({ topics, syncing } = { topics: [], syncing: false }) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
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
}
