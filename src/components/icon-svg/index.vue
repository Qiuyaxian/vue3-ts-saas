<template>
  <i class="el-icon system-icon">
    <svg
      :class="getClassName"
      :width="width"
      :height="height"
      aria-hidden="true">
      <use :xlink:href="getName"></use>
    </svg>
  </i>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'icon-svg',
    props: {
      name: {
        type: String,
        required: true
      },
      className: {
        type: String
      },
      width: {
        type: String
      },
      height: {
        type: String
      }
    },
    computed: {
      getName () {
        return `#icon-${this.name}`
      },
      getClassName () {
        return [
          'icon-svg',
          `icon-svg__${this.name}`,
          this.className && /\S/.test(this.className) ? `${this.className}` : ''
        ]
      }
    }
  })
</script>

<style lang="scss">
.system-icon {
  .icon-svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
