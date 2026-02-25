export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log('=== НОВЫЙ ЗАКАЗ ===')
  console.log(JSON.stringify(body, null, 2))
  console.log('===================')

  await new Promise((r) => setTimeout(r, 800))

  return {
    success: true,
    orderId: Date.now(),
    message: 'Заказ успешно оформлен',
  }
})