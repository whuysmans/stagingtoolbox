<template>
  <div class="column" ref="subcatfilter">
    <h2 class="subtitle">Filter op de fiche-categorieën</h2>
    <div class="filter content tile is-ancestor ie-no-flex">
      <div class="tile is-vertical is-parent ie-no-flex">
        <article v-show="showFilter" class="tile is-child box tags">
          <h5>Fiches voor <em class="tag is-white is-medium">{{ searchText }}</em></h5>
          <nuxt-link v-for="(fiche, index) in filteredFiches" 
            :to="fiche.Slug" 
            :key="index"
            :class="backgroundColor(fiche.Kernthemas.display)" 
            class="tag is-medium">{{ fiche.Titel }}
          </nuxt-link>
        </article>
        <article v-for="thema in themas" class="box tile is-child" :key="thema._id">
          <h3 class=""><i class="fa" :class="[thema.Icoon, 'tekst-' + thema.Slug]"></i> {{ thema.Titel }}</h3>
          <div v-html="thema.Content"></div>
          <a v-if="thema.ExtraContent" @click.prevent="showThemaNotification(thema._id)">Lees meer...</a>
          <div v-if="thema._id === showCurrent" class="notification">
            <button class="delete" @click.prevent="showCurrent = 0">
            </button>
            <div v-html="thema.ExtraContent"></div>
          </div>
          <div class="tags subcat-tags">
            <a v-for="subcat in thema.Subcat" :key="subcat._id" class="tag is-medium" :class="thema.Slug" href="" @click.prevent.stop="handleSubcatClick">
              {{ subcat.display }}
            </a>
          </div>
        </article>
      </div> 
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  props: ['themas', 'fiches'],
  filters: {
    'classify': (val) => {
      return val.replace(/\s/ig, '-')
    }
  },
  data () {
    return {
      searchText: '',
      isThemaSearch: false,
      showCurrent: 0
    }
  },
  methods: {
    ...mapActions([
      'setActiveFilter'
    ]),
    ...mapGetters([
      'getActiveFilter',
      'getClassSlug'
    ]),
    handleSubcatClick (event) {
      let text = event.target.outerText
      this.isThemaSearch = false
      this.setActiveFilter(text)
      this.searchText = text
      Vue.nextTick(() => {
        this.$refs.subcatfilter.scrollIntoView(true)
      })
    },
    handleKernthemaClick (event) {
      let text = event.target.outerText
      this.isThemaSearch = true
      this.setActiveFilter(text)
      this.searchText = text
    },
    showThemaNotification (id) {
      this.showCurrent = id
    }
  },
  computed: {
    filteredFiches () {
      let ficheArray = this.fiches
      if (this.getActiveFilter() !== '') {
        this.searchText = this.getActiveFilter()
      }
      return ficheArray.filter((fiche) => {
        return !this.isThemaSearch ? fiche.Subcategorie.filter((cat) => {
          return cat.display.trim() === this.searchText.trim()
        })[0] : (fiche.Kernthemas.display === this.searchText)
      })
    },
    showFilter () {
      return this.filteredFiches.length !== 0
    },
    backgroundColor (title) {
      return this.getClassSlug(title)
    }
  }
}
</script>
<style scoped>


</style>