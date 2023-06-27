import 'module-alias/register'
import { app } from './app'
import { makeConsumePaymentsProcesseds } from './factories/queue/consume-payments-processed.factory'

const start = async (): Promise<void> => {
  try {
    const consumeQueuePaymentsProcesseds = makeConsumePaymentsProcesseds()
    await consumeQueuePaymentsProcesseds.execute()

    const port = process.env.PORT ?? 3000

    app.listen(port, () => console.log(`Server running at port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

void start()
