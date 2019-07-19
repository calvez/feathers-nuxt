<template>
  <div>
    <Navigation/>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
import Navigation from '../components/navigation';
import Footer from '../components/footer';
export default {
  components: { Navigation, Footer }
}
</script>
