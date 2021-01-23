<template>
  <span :class="['badge', status]">
    {{ statusText  }}
  </span>
</template>

<script>
import {computed} from "vue";

export default {
  props: {
    type: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'done', 'active', 'cancelled', 'pending'].includes(value)
      }
    },
    statusText: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const status = computed(() => {
      if(props.type === 'done' || props.type === 'active') {
        return 'primary'
      } else if (props.type === 'pending') {
        return 'warning'
      } else {
        return 'danger'
      }
    })
    return {
      status
    }
  }
}
</script>
