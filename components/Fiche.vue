<template>
  <section class="container content">
    <div class="main">
      <h2 class="title">
      {{ fiche.Titel }}
      </h2>
      <div class="beschrijving box box-shadow box-padding">
        <article class="media">
          <div class="media-left">
            <span class="icon">
              <i class="fa fa-3x" :class="fiche.BeschrijvingIcoon"></i>
            </span>
          </div>
          <div class="media-content">
            <h3 class="subtitle">Beschrijving</h3>
            <div v-html="fiche.Beschrijving"></div>
          </div>
        </article>
      </div>
      <div class="werking box box-shadow box-padding">
        <article class="media">
          <div class="media-left">
            <span class="icon">
              <i class="fa fa-3x" :class="fiche.WerkingIcoon"></i>
            </span>
          </div>
          <div class="media-content">
            <h3 class="subtitle">Werking</h3>
            <div v-html="fiche.Werking"></div>
          </div>
        </article>
      </div>
      <div class="tips box box-shadow box-padding">
        <article class="media">
          <div class="media-left">
            <span class="icon">
              <i class="fa fa-3x" :class="fiche.TipsIcoon"></i>
            </span>
          </div>
          <div class="media-content">
            <h3 class="subtitle">Tips</h3>
            <div v-html="fiche.Tips"></div>
          </div>
        </article>
      </div>
      <div class="voorbeelden box box-shadow box-padding">
        <article class="media">
          <div class="media-left">
            <span class="icon">
              <i class="fa fa-3x" :class="fiche.VoorbeeldenIcoon"></i>
            </span>
          </div>
          <div class="media-content">
            <h3 class="subtitle">Voorbeelden</h3>
            <div v-html="fiche.Voorbeelden"></div>
          </div>
        </article>
      </div>
    </div>
    <div class="tags">
      <div class="kern-thema button">
        {{ fiche.Kernthemas.display }}
      </div>
      <div class="sub-cat">
        <a v-for="cat in fiche.Subcategorie" href="" :key="cat._id" class="button">{{ cat.display }}</a>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    props: ['fiche']
  }
</script>