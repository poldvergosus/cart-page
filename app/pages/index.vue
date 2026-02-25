<template>
  <main class="cart-page">
    <div class="cart-page__container">

      <div class="cart-page__header">
        <div class="cart-page__header-left">
          <h1 class="cart-page__title">Ваша корзина</h1>
          <span v-if="cart.totalItems > 0" class="cart-page__count">
            {{ cart.totalItems }} {{ itemWord }}
          </span>
        </div>

        <button
          v-if="cart.items.length > 0"
          class="cart-page__clear"
          @click="clearCart"
        >
          Очистить корзину
        </button>
      </div>

      <div v-if="cart.items.length" class="cart-page__layout">

        <div class="cart-page__main">
          <div class="cart-page__list">
            <TransitionGroup name="list" tag="div">
              <CartItem
                v-for="item in cart.items"
                :key="item.id"
                :item="item"
              />
            </TransitionGroup>
          </div>

          <CartInstallation
            :checked="isInstallationSelected"
            @toggle="toggleAllInstallation"
          />
        </div>

        <aside class="cart-page__sidebar">
          <CartSummary />
        </aside>
      </div>

      <div v-else class="cart-page__empty">
        <span class="cart-page__empty-icon">🛒</span>
        <p class="cart-page__empty-text">Корзина пуста</p>
        <p v-if="cart.orderSuccess" class="cart-page__empty-sub">
          Спасибо за заказ!
        </p>
      </div>

      <ProductSlider />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()

const itemWord = computed(() => {
  const n = cart.totalItems
  const mod10 = n % 10
  const mod100 = n % 100

  if (mod100 >= 11 && mod100 <= 19) return 'товаров'
  if (mod10 === 1) return 'товар'
  if (mod10 >= 2 && mod10 <= 4) return 'товара'
  return 'товаров'
})

const isInstallationSelected = computed(() =>
  cart.items.some((i) => i.installationSelected)
)

const toggleAllInstallation = () => {
  const newValue = !isInstallationSelected.value
  cart.items.forEach((item) => {
    if (item.installationAvailable) {
      item.installationSelected = newValue
    }
  })
}

const clearCart = () => {
  if (confirm('Очистить корзину?')) {
    cart.items = []
  }
}
</script>

<style scoped>
.cart-page {
  padding: 32px 0 80px;
}

.cart-page__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.cart-page__header {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  margin-bottom: 50px;
  position: relative;
}

.cart-page__header-left {
  display: flex;
  align-items: baseline;
  gap: 22px;
}

.cart-page__title {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 120.52%;
  color: #1F2432;
  margin: 0;
}

.cart-page__count {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 145%;
  color: #797B86;
}

.cart-page__clear {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: right;
  text-decoration-line: underline;
  color: #797B86;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  padding: 0;
  transition: color 0.2s;
}

.cart-page__clear:hover {
  color: #e53935;
}

.cart-page__layout {
  display: flex;
  gap: 36px;
  align-items: flex-start;
}

.cart-page__main {
  flex: 1;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 44px;
}

.cart-page__list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.cart-page__sidebar {
  flex-shrink: 0;
  width: 425px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.list-move {
  transition: transform 0.3s ease;
}

.cart-page__empty {
  text-align: center;
  padding: 64px 20px;
}

.cart-page__empty-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.cart-page__empty-text {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #797B86;
}

.cart-page__empty-sub {
  margin-top: 8px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  color: #43a047;
  font-weight: 500;
}

@media (max-width: 1100px) {
  .cart-page__layout {
    flex-direction: column;
  }

  .cart-page__sidebar {
    width: 100%;
    order: -1;
  }

  .cart-page__main {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .cart-page__header {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
  }

  .cart-page__header-left {
    flex-direction: column;
    gap: 5px;
  }

  .cart-page__title {
    font-size: 32px;
  }

  .cart-page__clear {
    margin-left: 0;
  }
}
</style>