<template>
  <div class="article-meta">
    <nuxt-link :to="{name:'profile-username',params:{username:article.author.username}}">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{name:'profile-username',params:{username:article.author.username}}"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createdAt|dayjs}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>