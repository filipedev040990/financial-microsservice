import { QueueInterface } from '@/application/contratcs/queue'
import { Channel, Connection, connect } from 'amqplib'
import { config } from '../config'

export class RabbitmqAdapter implements QueueInterface {
  private connection!: Connection
  private channel!: Channel

  constructor (private readonly uri: string) {}

  async start (): Promise<void> {
    this.connection = await connect(this.uri)
    this.channel = await this.connection.createChannel()

    const rabbitmq: any = config.rabbitmq

    Object.keys(rabbitmq).forEach((ex) => {
      const exchanges = rabbitmq[ex]

      exchanges.map(async (exchange: any) => {
        await this.channel.assertExchange(exchange, 'direct', { durable: true })

        exchange.bindQueues.map(async (queue: string) => {
          await this.channel.assertQueue(queue, { durable: true })
          await this.channel.bindQueue(queue, exchange, exchange.routingKey)
        })
      })
    })
  }

  async consume (queue: string, callback: (message: string) => void): Promise<any> {
    await this.channel.consume(queue, async (message: any) => {
      if (message) {
        callback(message)
        this.channel.ack(message)
      }
    })
  }

  async publish (exchange: string, routingKey: string, message: string): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message))
  }

  async close (): Promise<void> {
    await this.channel.close()
  }
}
