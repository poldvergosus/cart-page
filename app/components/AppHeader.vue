<template>
  <header class="header">
    <div class="header__inner">

      <div class="header__logo">MyShop</div>

      <div class="header__cart">

        <div class="header__cart-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z"
              stroke="#0069B4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z"
              stroke="#0069B4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 5H7L9.68 19.39C9.77144 19.8504 10.0219 20.264 10.3875 20.5583C10.7532 20.8526 11.2107 21.009 11.68 21H24.4C24.8693 21.009 25.3268 20.8526 25.6925 20.5583C26.0581 20.264 26.3086 19.8504 26.4 19.39L28 9H8"
              stroke="#0069B4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div class="header__cart-info">
          <span class="header__cart-label">Ваша корзина</span>
          <span class="header__cart-count">
            {{ cart.totalItems }} {{ itemWord }}
          </span>
          <span class="header__cart-price">
            {{ formatPrice(cart.totalPrice) }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()
const { formatPrice } = useFormatPrice()

const itemWord = computed(() => {
  const n = cart.totalItems
  const mod10 = n % 10
  const mod100 = n % 100

  if (mod100 >= 11 && mod100 <= 19) return 'товаров'
  if (mod10 === 1) return 'товар'
  if (mod10 >= 2 && mod10 <= 4) return 'товара'
  return 'товаров'
})
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
}

.header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #0069B4;
}

.header__cart {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.header__cart-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}

.header__cart-info {
  display: flex;
  flex-direction: column;
}

.header__cart-label {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #1F2432;
}

.header__cart-count {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: #797B86;
}

.header__cart-price {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: #1F2432;
}

@media (max-width: 600px) {
  .header__cart-label {
    display: none;
  }

  .header__cart-count {
    font-size: 11px;
  }

  .header__cart-price {
    font-size: 11px;
  }
}
</style>