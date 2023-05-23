<template>
  <div class="base-chart">

    <template v-if="percent > 0">
      <svg style="position:relative;top:4px" width="20" height="20" viewBox="0 0 20 20" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99935 15.8333V4.16663M9.99935 4.16663L4.16602 9.99996M9.99935 4.16663L15.8327 9.99996"
          stroke="#12B76A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <span style="color: #027A48;">{{ percent }}%</span>
    </template>
    <template v-else-if="percent === 0">

      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99935 12.8333V1.16663M6.99935 1.16663L1.16602 6.99996M6.99935 1.16663L12.8327 6.99996"
          stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>


      <span style="color: #667085;">{{ percent }}%</span>
    </template>
    <template v-else>

      <svg style="position:relative;top:4px" width="20" height="20" viewBox="0 0 20 20" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99935 4.16663V15.8333M9.99935 15.8333L15.8327 9.99996M9.99935 15.8333L4.16602 9.99996"
          stroke="#F04438" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span style="color: #B42318;">{{ percent }}%</span>
    </template>

    <span>vs last month</span>

    <div v-if="percent > 0" style="display: inline;">


      <svg width="65" height="33" viewBox="0 0 65 33" fill="none" xmlns="http://www.w3.org/2000/svg" style="top: 5px;left: 11px;position: relative;">
        <path
          d="M64 1C53.7645 1.83942 53.1307 21.9356 43 24.25C34.646 26.1585 30.4158 15.3248 22 16.5C12.8717 17.7747 9.95067 29.0638 1 32H64V1Z"
          fill="#ECFDF3" />
        <path
          d="M64 1C53.7645 1.83942 53.1307 21.9356 43 24.25C34.646 26.1585 30.4158 15.3248 22 16.5C12.8717 17.7747 9.95067 29.0638 1 32H64V1Z"
          fill="url(#paint0_linear_1975_39975)" />
        <path
          d="M1 32C9.95067 29.0638 12.8717 17.7747 22 16.5C30.4158 15.3248 34.646 26.1585 43 24.25C53.1307 21.9356 53.7645 1.83942 64 1"
          stroke="#12B76A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <defs>
          <linearGradient id="paint0_linear_1975_39975" x1="32.5" y1="1" x2="32.5" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0.641167" stop-color="white" stop-opacity="0" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
        </defs>
      </svg>

    </div>

    <div v-else-if="percent === 0" style="display: inline;">


      <svg width="65" height="33" viewBox="0 0 65 33" fill="none" xmlns="http://www.w3.org/2000/svg" style="top: 5px;left: 11px;position: relative;">
        <path
          d="M64 1C53.7645 1.83942 53.1307 21.9356 43 24.25C34.646 26.1585 30.4158 15.3248 22 16.5C12.8717 17.7747 9.95067 29.0638 1 32H64V1Z"
          fill="#F2F4F7" />
        <path
          d="M64 1C53.7645 1.83942 53.1307 21.9356 43 24.25C34.646 26.1585 30.4158 15.3248 22 16.5C12.8717 17.7747 9.95067 29.0638 1 32H64V1Z"
          fill="url(#paint0_linear_1975_39975)" />
        <path
          d="M1 32C9.95067 29.0638 12.8717 17.7747 22 16.5C30.4158 15.3248 34.646 26.1585 43 24.25C53.1307 21.9356 53.7645 1.83942 64 1"
          stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <defs>
          <linearGradient id="paint0_linear_1975_39975" x1="32.5" y1="1" x2="32.5" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0.641167" stop-color="white" stop-opacity="0" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
        </defs>
      </svg>

    </div>
    <div v-else style="display: inline;">


      <svg width="65" height="34" viewBox="0 0 65 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="top: 4px;position: relative;left: 5px;">
        <path
          d="M1 1C11.2355 1.8665 11.8693 22.6109 22 25C30.354 26.9701 34.5842 15.7869 43 17C52.1283 18.3158 55.0493 29.9691 64 33H1V1Z"
          fill="#FEF3F2" />
        <path
          d="M1 1C11.2355 1.8665 11.8693 22.6109 22 25C30.354 26.9701 34.5842 15.7869 43 17C52.1283 18.3158 55.0493 29.9691 64 33H1V1Z"
          fill="url(#paint0_linear_1975_40066)" />
        <path
          d="M64 33C55.0493 29.9691 52.1283 18.3158 43 17C34.5842 15.7869 30.354 26.9701 22 25C11.8693 22.6109 11.2355 1.8665 1 1"
          stroke="#F04438" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <defs>
          <linearGradient id="paint0_linear_1975_40066" x1="32.5" y1="1" x2="32.5" y2="33" gradientUnits="userSpaceOnUse">
            <stop offset="0.641167" stop-color="white" stop-opacity="0" />
            <stop offset="1" stop-color="white" />
          </linearGradient>
        </defs>
      </svg>


    </div>
  </div>
</template>
<script>
export default {
  name: "LastMonthChartsTwo",
  props: {
    percent: String || Number,
  },
  setup() {
   return {

    }
  }

}
</script>

<style scoped>


.base-chart span {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
  margin-left: 6px;
}

.base-chart {
  width: 100%;
  position: relative;
  top: -21px;
  
}

.chart {
  height: 100px;
  width: 100px;
  position: relative;
  left: 153px;
  top: -68px;
}</style>
