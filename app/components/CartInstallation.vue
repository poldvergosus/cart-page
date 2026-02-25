<template>
  <div class="cart-installation">
    <label class="cart-installation__label">
      <input
        type="checkbox"
        class="cart-installation__input"
        :checked="checked"
        @change="$emit('toggle')"
      />
      <span class="cart-installation__checkbox"></span>
    </label>

    <div class="cart-installation__icon-wrapper">
      <img
        src="/images/installation-icon.svg"
        alt="Установка"
        class="cart-installation__icon"
      />
    </div>

    <div class="cart-installation__text">
      <h4 class="cart-installation__title">Установка</h4>
      <p class="cart-installation__desc">
        Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ checked: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<style scoped>
.cart-installation {
  display: flex;
  align-items: center;
  gap: 0;
  background: #F6F8FA;
  border-radius: 5px;
  padding: 26px 25px;
  width: 100%;
}

.cart-installation__label {
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  margin-right: 20px;
}

.cart-installation__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.cart-installation__checkbox {
  display: block;
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  border: 1px solid #797B86;
  box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  position: relative;
}

.cart-installation__input:checked + .cart-installation__checkbox {
  background: #0069B4;
  border-color: #0069B4;
}

.cart-installation__input:checked + .cart-installation__checkbox::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.cart-installation__icon-wrapper {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: #FFFFFF;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.cart-installation__icon {
  width: 30px;
  height: 30px;
}

.cart-installation__text {
  flex: 1;
}

.cart-installation__title {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 145%;
  color: #1F2432;
  margin: 0 0 2px 0;
}

.cart-installation__desc {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #797B86;
  margin: 0;
}

@media (max-width: 500px) {
  .cart-installation {
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
  }
}
</style>