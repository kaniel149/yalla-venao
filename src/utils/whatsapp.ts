interface OrderItem {
  name: string
  qty: number
  price: number
}

interface WhatsAppOrderParams {
  vendorPhone: string
  orderId: string
  items: OrderItem[]
  total: number
  deliveryAddress: string
  customerName?: string
}

export function generateWhatsAppLink(params: WhatsAppOrderParams): string {
  const { vendorPhone, orderId, items, total, deliveryAddress, customerName } = params

  const itemLines = items.map(i => `• ${i.name} ×${i.qty} — $${(i.price * i.qty).toFixed(2)}`).join('\n')

  const text = [
    `🔔 New Order #${orderId.slice(0, 8)}`,
    customerName ? `Customer: ${customerName}` : '',
    '',
    itemLines,
    '',
    `💰 Total: $${total.toFixed(2)}`,
    `📍 Deliver to: ${deliveryAddress}`,
  ].filter(Boolean).join('\n')

  const phone = vendorPhone.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
