import cron from 'node-cron'

/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/

// Test the following script
// $ npx ts-node ./src/cron.ts

cron.schedule('0-59 * * * * *', () => {
  console.log('running a task every seconds')
})

cron.schedule('* * * * * *', () => {
  console.log('running a task every seconds too')
})

cron.schedule('*/2 * * * * *', () => {
  console.log('running a task 1/2 seconds ')
})

// Controlled cron

const task = cron.schedule('* * * * * *', () => {
  console.log('stopped task')
}, {
  scheduled: false
})

task.start()

setTimeout(() => {
  console.log('Do: Stop')
  task.stop()
}, 3000)
