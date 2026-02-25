<template>
  <div class="cart-item">
    <div class="cart-item__content">
      <div class="cart-item__image-wrapper">
        <img :src="item.image" :alt="item.name" class="cart-item__image" />
      </div>

      <div class="cart-item__info">
        <h3 class="cart-item__name">{{ item.name }}</h3>
        <p class="cart-item__description">{{ item.description }}</p>
        <p class="cart-item__article">Артикул: {{ item.article }}</p>
      </div>

      <div class="cart-item__quantity">
        <div class="cart-item__quantity-control">
          <button
            class="cart-item__quantity-btn"
            :class="{ 'cart-item__quantity-btn--disabled': item.quantity <= 1 }"
            @click="cart.decrement(item.id)"
          >
            <span class="cart-item__quantity-icon cart-item__quantity-icon--minus"></span>
          </button>

          <span class="cart-item__quantity-value">{{ item.quantity }}</span>

          <button
            class="cart-item__quantity-btn"
            @click="cart.increment(item.id)"
          >
            <span class="cart-item__quantity-icon cart-item__quantity-icon--plus"></span>
          </button>
        </div>

        <span v-if="item.quantity > 1" class="cart-item__price-per-unit">
          {{ formatPrice(item.price) }}/шт.
        </span>
      </div>

      <div class="cart-item__price">
        {{ formatPrice(item.price * item.quantity) }}
      </div>

      <button
        class="cart-item__delete"
        @click="cart.removeItem(item.id)"
        title="Удалить"
      >
        <svg class="cart-item__delete-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="1" y1="1" x2="11" y2="11" stroke="#1F2432" stroke-width="1.5" />
          <line x1="11" y1="1" x2="1" y2="11" stroke="#1F2432" stroke-width="1.5" />
        </svg>
      </button>
    </div>

    <div class="cart-item__divider"></div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, type CartItem } from '~/stores/cart'

defineProps<{ item: CartItem }>()
const cart = useCartStore()
const { formatPrice } = useFormatPrice()
</script>

<style scoped>
.cart-item {
  position: relative;
  width: 100%;
}

.cart-item__content {
  display: flex;
  align-items: flex-start;
  gap: 0;
  padding: 0 0 20px 0;
  position: relative;
  min-height: 100px;
}

.cart-item__image-wrapper {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 2px;
  overflow: hidden;
  margin-right: 31px;
}

.cart-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item__info {
  flex: 1;
  min-width: 0;
  padding-top: 4px;
}

.cart-item__name {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 145%;
  color: #1F2432;
  margin: 0 0 6px 0;
}

.cart-item__description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #2C3242;
  margin: 0 0 7px 0;
  max-width: 263px;
}

.cart-item__article {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #797B86;
  margin: 0;
}

.cart-item__quantity {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: 40px;
  padding-top: 29px;
}

.cart-item__quantity-control {
  display: flex;
  align-items: center;
  background: #F6F8FA;
  border-radius: 4px;
  height: 34px;
  width: 102px;
}

.cart-item__quantity-btn {
  width: 32px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.cart-item__quantity-btn--disabled {
  opacity: 0.3;
  cursor: default;
  pointer-events: none;
}

.cart-item__quantity-icon {
  position: relative;
  display: block;
  width: 8px;
  height: 8px;
}

.cart-item__quantity-icon--minus::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 8px;
  height: 0;
  border-top: 1px solid #33374E;
  transform: translateY(-50%);
}

.cart-item__quantity-icon--plus::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 8px;
  height: 0;
  border-top: 1px solid #33374E;
  transform: translateY(-50%);
}

.cart-item__quantity-icon--plus::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  width: 0;
  height: 8px;
  border-left: 1px solid #33374E;
  transform: translateX(-50%);
}

.cart-item__quantity-value {
  flex: 1;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #1F2432;
  border-left: 2px solid #FFFFFF;
  border-right: 2px solid #FFFFFF;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-item__price-per-unit {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 145%;
  color: #1F2432;
  text-align: center;
  margin-top: 6px;
}

.cart-item__price {
  flex-shrink: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 145%;
  color: #1F2432;
  text-align: right;
  min-width: 80px;
  padding-top: 33px;
  margin-right: 18px;
}

.cart-item__delete {
  position: absolute;
  top: 2px;
  right: 6px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.cart-item__delete:hover .cart-item__delete-icon line {
  stroke: #e53935;
}

.cart-item__divider {
  width: 100%;
  height: 1px;
  background: #C4C4C4;
}

@media (max-width: 650px) {
  .cart-item__content {
    flex-wrap: wrap;
    gap: 12px;
  }

  .cart-item__info {
    flex-basis: calc(100% - 131px);
  }

  .cart-item__quantity {
    margin-left: 0;
    margin-right: 0;
  }

  .cart-item__price {
    margin-right: 0;
  }

  .cart-item__description {
    max-width: 100%;
  }
}
</style>