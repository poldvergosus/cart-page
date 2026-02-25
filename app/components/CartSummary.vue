<template>
  <div class="cart-summary">

    <h3 class="cart-summary__title">Итого</h3>

    <div class="cart-summary__info">
      <div class="cart-summary__row">
        <span class="cart-summary__label">Сумма заказа</span>
        <span class="cart-summary__value">{{ formatPrice(cart.productsTotal) }}</span>
      </div>

      <div class="cart-summary__row">
        <span class="cart-summary__label">Количество</span>
        <span class="cart-summary__value">{{ cart.totalItems }} шт</span>
      </div>

      <div class="cart-summary__row">
        <span class="cart-summary__label">Установка</span>
        <span class="cart-summary__value">
          {{ cart.installationTotal > 0 ? formatPrice(cart.installationTotal) : 'Нет' }}
        </span>
      </div>
    </div>

    <div class="cart-summary__divider"></div>

    <div class="cart-summary__total">
      <span class="cart-summary__total-label">Стоимость товаров</span>
      <span class="cart-summary__total-value">{{ formatPrice(cart.totalPrice) }}</span>
    </div>

    <div class="cart-summary__actions">
      <button
        class="cart-summary__button cart-summary__button--primary"
        :class="{ 'cart-summary__button--loading': cart.orderLoading }"
        :disabled="cart.orderLoading || cart.items.length === 0"
        @click="cart.submitOrder()"
      >
        <span v-if="cart.orderLoading" class="cart-summary__spinner"></span>
        <span v-else>Оформить заказ</span>
      </button>

      <button
        class="cart-summary__button cart-summary__button--secondary"
        :disabled="cart.items.length === 0"
      >
        Купить в 1 клик
      </button>
    </div>

    <Transition name="fade">
      <div v-if="cart.orderSuccess" class="cart-summary__success">
         Заказ успешно оформлен!
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()
const { formatPrice } = useFormatPrice()
</script>

<style scoped>
.cart-summary {
  background: #F6F8FA;
  border-radius: 5px;
  padding: 35px 30px 30px;
  position: sticky;
  top: 80px;
  width: 100%;
}

.cart-summary__title {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 120.52%;
  color: #1F2432;
  margin: 0 0 30px 0;
}

.cart-summary__info {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-summary__label {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #1F2432;
}

.cart-summary__value {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 145%;
  text-align: right;
  color: #1F2432;
}

.cart-summary__divider {
  width: 100%;
  height: 1px;
  background: #AEB0B6;
  margin: 25px 0;
}

.cart-summary__total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.cart-summary__total-label {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 145%;
  color: #1F2432;
}

.cart-summary__total-value {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 130%;
  text-align: right;
  letter-spacing: 0.005em;
  color: #1F2432;
}

.cart-summary__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-summary__button {
  width: 100%;
  height: 54px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 145%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, opacity 0.2s;
}

.cart-summary__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-summary__button--primary {
  background: #0069B4;
  color: #FFFFFF;
}

.cart-summary__button--primary:hover:not(:disabled) {
  background: #005a9e;
}

.cart-summary__button--primary:active:not(:disabled) {
  background: #004d87;
}

.cart-summary__button--secondary {
  background: #FFFFFF;
  color: #0069B4;
  border: 1px solid #0069B4;
}

.cart-summary__button--secondary:hover:not(:disabled) {
  background: #f0f7fc;
}

.cart-summary__button--secondary:active:not(:disabled) {
  background: #e0eef7;
}


.cart-summary__button--loading {
  pointer-events: none;
}

.cart-summary__spinner {
  width: 22px;
  height: 22px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


.cart-summary__success {
  margin-top: 16px;
  padding: 12px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 4px;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


@media (max-width: 900px) {
  .cart-summary {
    position: static;
  }

  .cart-summary__total-value {
    font-size: 22px;
  }
}
</style>