<template>
  <section class="product-slider">

    <div class="product-slider__header">
      <h2 class="product-slider__title">Просмотренные товары</h2>

      <div class="product-slider__nav">
        <button
          ref="prevBtn"
          class="product-slider__arrow product-slider__arrow--prev"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <span class="product-slider__counter">
          {{ currentSlide }} / {{ totalSlides }}
        </span>

        <button
          ref="nextBtn"
          class="product-slider__arrow product-slider__arrow--next"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1 1L7 7L1 13" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>


    <ClientOnly>
      <Swiper
        :modules="[Navigation]"
        :slides-per-view="4"
        :space-between="20"
        :navigation="{
          prevEl: prevBtn,
          nextEl: nextBtn,
        }"
        :breakpoints="{
          0: { slidesPerView: 1.2 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }"
        class="product-slider__swiper"
        @slide-change="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide
          v-for="product in cart.sliderProducts"
          :key="product.id"
        >
          <div class="product-card">

            <div class="product-card__image-wrapper">
              <img
                :src="product.image"
                :alt="product.name"
                class="product-card__image"
              />
            </div>

            <div class="product-card__content">
              <div class="product-card__info">
                <h3 class="product-card__name">{{ product.name }}</h3>
                <p class="product-card__description">{{ product.fullName }}</p>
              </div>

              <div class="product-card__bottom">
                <div class="product-card__prices">
                  <span class="product-card__price-range">
                    {{ product.priceRange }}
                  </span>
                  <span class="product-card__price-eur">
                    {{ product.priceEur }}
                  </span>
                </div>

                <button
                  class="product-card__button"
                  @click="cart.addToCart(product)"
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <template #fallback>
        <div class="product-slider__loading">Загрузка...</div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

import { useCartStore } from '~/stores/cart'

const cart = useCartStore()

const prevBtn = ref<HTMLElement | null>(null)
const nextBtn = ref<HTMLElement | null>(null)

const currentSlide = ref(1)
const totalSlides = ref(cart.sliderProducts.length)

const onSwiper = (swiper: SwiperType) => {
  totalSlides.value = swiper.slides.length
}

const onSlideChange = (swiper: SwiperType) => {
  currentSlide.value = swiper.activeIndex + 1
}
</script>

<style scoped>
.product-slider {
  margin-top: 60px;
}

.product-slider__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 47px;
}

.product-slider__title {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 30px;
  line-height: 120.52%;
  color: #1F2432;
}

.product-slider__nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-slider__arrow {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #90A2B5;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}

.product-slider__arrow:hover {
  background: #7a8fa3;
}

.product-slider__arrow.swiper-button-disabled {
  opacity: 0.4;
  cursor: default;
}

.product-slider__counter {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 150%;
  color: #212121;
  min-width: 44px;
  text-align: center;
}

.product-slider__swiper {
  width: 100%;
}

.product-slider__loading {
  text-align: center;
  padding: 40px;
  color: #797B86;
}

.product-card {
  background: #F6F8FA;
  border-radius: 5px;
  height: 563px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.product-card__image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 30px 0;
}

.product-card__image {
  width: 245px;
  height: 245px;
  object-fit: contain;
}

.product-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 5px 25px 25px;
}

.product-card__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-card__name {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 120.52%;
  color: #1F2432;
}

.product-card__description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 145%;
  color: #1F2432;
}

.product-card__bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-card__prices {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.product-card__price-range {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 130%;
  letter-spacing: 0.005em;
  color: #1F2432;
}

.product-card__price-eur {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 145%;
  color: #797B86;
}

.product-card__button {
  width: 100%;
  height: 52px;
  background: #0069B4;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 145%;
  text-align: center;
  color: #FFFFFF;
  transition: background 0.2s;
}

.product-card__button:hover {
  background: #005a9e;
}

@media (max-width: 768px) {
  .product-slider__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 30px;
  }

  .product-slider__title {
    font-size: 24px;
  }

  .product-slider__counter {
    font-size: 18px;
  }

  .product-slider__arrow {
    width: 40px;
    height: 40px;
  }

  .product-card {
    height: auto;
    min-height: 480px;
  }

  .product-card__image {
    width: 200px;
    height: 200px;
  }

  .product-card__name {
    font-size: 18px;
  }

  .product-card__price-range {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .product-card__image-wrapper {
    padding: 15px 20px 0;
  }

  .product-card__content {
    padding: 5px 15px 15px;
  }

  .product-card__button {
    height: 44px;
    font-size: 14px;
  }
}
</style>