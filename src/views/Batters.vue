<template>
  <div class="Batters">
    <BAnalysis msg="Batters'' Analysis" />
  </div>
</template>

<script>
// @ is an alias to /src
import BAnalysis from '@/components/BAnalysis.vue'

export default {
  name: 'Batters',
  components: {
    BAnalysis
  }
}
</script>
