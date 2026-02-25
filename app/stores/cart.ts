import { defineStore } from 'pinia'
import { $fetch } from 'ofetch' 
export interface CartItem {
  id: number
  name: string
  article: string
  description: string
  price: number
  quantity: number
  image: string
  installationAvailable: boolean
  installationSelected: boolean
  installationPrice: number
}

export interface SliderProduct {
  id: number
  name: string
  fullName: string
  price: number
  priceRange: string
  priceEur: string
  image: string
  installationAvailable: boolean
  installationPrice: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
      {
        id: 1,
        name: 'Вытяжное устройство G2H',
        article: 'G2H1065',
        description: '12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия',
        price: 12644,
        quantity: 1,
        image: '/images/g2h.png',
        installationAvailable: true,
        installationSelected: false,
        installationPrice: 2500,
      },
      {
        id: 2,
        name: 'Вытяжное устройство BXC',
        article: 'G2H1065',
        description: '12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия',
        price: 12644,
        quantity: 2,
        image: '/images/bxc.png',
        installationAvailable: true,
        installationSelected: false,
        installationPrice: 3000,
      },
      {
        id: 3,
        name: 'Вытяжное устройство GHN',
        article: 'G2H1065',
        description: '12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия',
        price: 12644,
        quantity: 1,
        image: '/images/ghn.png',
        installationAvailable: true,
        installationSelected: false,
        installationPrice: 1500,
      },
    ] as CartItem[],

sliderProducts: [
  {
    id: 4,
    name: 'BXC',
    fullName: 'Вытяжное устройство для механической системы вентиляции',
    price: 12644,
    priceRange: '6 848 ₽ – 56 584 ₽',
    priceEur: '77.60 € – 643.86 €',
    image: '/images/bxc.png',
    installationAvailable: true,
    installationPrice: 1500,
  },
  {
    id: 5,
    name: 'G2H',
    fullName: 'Вытяжное устройство для механической системы вентиляции',
    price: 15990,
    priceRange: '6 848 ₽ – 56 584 ₽',
    priceEur: '77.60 € – 643.86 €',
    image: '/images/g2h.png',
    installationAvailable: true,
    installationPrice: 2000,
  },
  {
    id: 6,
    name: 'GHN',
    fullName: 'Вытяжное устройство для механической системы вентиляции',
    price: 24990,
    priceRange: '6 848 ₽ – 56 584 ₽',
    priceEur: '77.60 € – 643.86 €',
    image: '/images/ghn.png',
    installationAvailable: false,
    installationPrice: 0,
  },
  {
    id: 7,
    name: 'TDA',
    fullName: 'Вытяжное устройство для механической системы вентиляции',
    price: 42990,
    priceRange: '6 848 ₽ – 56 584 ₽',
    priceEur: '77.60 € – 643.86 €',
    image: '/images/tda.png',
    installationAvailable: true,
    installationPrice: 3500,
  },
  {
    id: 8,
    name: 'BXL',
    fullName: 'Вытяжное устройство для механической системы вентиляции',
    price: 35990,
    priceRange: '6 848 ₽ – 56 584 ₽',
    priceEur: '77.60 € – 643.86 €',
    image: '/images/bxl.png',
    installationAvailable: true,
    installationPrice: 3000,
  },
  {
    id: 9,
    name: 'EMM',
    fullName: 'Вытяжное устройство для механической системы вентиляции',
    price: 54990,
    priceRange: '6 848 ₽ – 56 584 ₽',
    priceEur: '77.60 € – 643.86 €',
    image: '/images/bxc.png',
    installationAvailable: false,
    installationPrice: 0,
  },
] as SliderProduct[],

    orderLoading: false,
    orderSuccess: false,
  }),

  getters: {
    totalItems: (state): number =>
      state.items.reduce((s, i) => s + i.quantity, 0),

    productsTotal: (state): number =>
      state.items.reduce((s, i) => s + i.price * i.quantity, 0),

    installationTotal: (state): number =>
      state.items.reduce((s, i) => {
        if (i.installationSelected && i.installationAvailable)
          return s + i.installationPrice * i.quantity
        return s
      }, 0),

    totalPrice(): number {
      return this.productsTotal + this.installationTotal
    },

    isInCart:
      (state) =>
      (id: number): boolean =>
        state.items.some((i) => i.id === id),
  },

  actions: {
    removeItem(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },

    increment(id: number) {
      const item = this.items.find((i) => i.id === id)
      if (item) item.quantity++
    },

    decrement(id: number) {
      const item = this.items.find((i) => i.id === id)
      if (item && item.quantity > 1) item.quantity--
    },

    toggleInstallation(id: number) {
      const item = this.items.find((i) => i.id === id)
      if (item && item.installationAvailable)
        item.installationSelected = !item.installationSelected
    },

    clearCart() {
    this.items = []
  },

addToCart(product: SliderProduct) {
  const existing = this.items.find((i) => i.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    this.items.push({
      id: product.id,
      name: product.name,
      article: '',
      description: product.fullName,
      price: product.price,
      quantity: 1,
      image: product.image,
      installationAvailable: product.installationAvailable,
      installationSelected: false,
      installationPrice: product.installationPrice,
    })
  }
},

    async submitOrder() {
      this.orderLoading = true
      this.orderSuccess = false

      const payload = {
        items: this.items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          installation: i.installationSelected,
          installationPrice: i.installationSelected ? i.installationPrice : 0,
        })),
        totalItems: this.totalItems,
        productsTotal: this.productsTotal,
        installationTotal: this.installationTotal,
        totalPrice: this.totalPrice,
      }

      try {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await response.json()
        this.orderSuccess = true
        this.items = []
        console.log('Order response:', data)
      } catch (e) {
        console.error('Order error:', e)
        alert('Ошибка при оформлении заказа')
      } finally {
        this.orderLoading = false
      }
    },
  },
})