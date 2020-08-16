<template>
  <div class="Pitchers">
    <PAnalysis msg="Pitchers' Analysis" />
  </div>
</template>

<script>
// @ is an alias to /src
import PAnalysis from '@/components/PAnalysis.vue'

export default {
  name: 'Pitchers',
  components: {
    PAnalysis
  }
}
</script>
