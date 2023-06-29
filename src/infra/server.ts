import 'module-alias/register'
import { app } from './app'
import { makeConsumePaymentsProcesseds } from './factories/queue/consume-payments-processed.factory'
import { enqueuePaymentsToProcess } from './bots/enqueue-payments-to-process.bot'

const start = async (): Promise<void> => {
  try {
    const port = process.env.PORT ?? 3000
    app.listen(port, () => console.log(`Server running at port ${port}`))

    const consumeQueuePaymentsProcesseds = makeConsumePaymentsProcesseds()
    await consumeQueuePaymentsProcesseds.execute()

    enqueuePaymentsToProcess()
  } catch (error) {
    console.log(error)
  }
}

void start()
