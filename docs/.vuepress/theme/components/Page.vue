<template>
  <main class="page">
    <slot name="top" />
    <Content class="theme-default-content" style="padding-bottom: 0;" />
    <div v-if="!$page.frontmatter.sourceHidden" style="max-width: 740px; margin: 0 auto; padding: 0rem 2.5rem 2rem;">
      <h2 id="致谢">
        <a href="#致谢" class="header-anchor">#</a> 致谢
      </h2>
      <p>感谢大家阅读我的文章，如果对我感兴趣可以点击页面右上角，帮我点个star。</p>
      <p>作者：{{ sourceOption.author }}</p>
      <p>
        链接：
        <a :href="sourceOption.link" target="_blank" rel="noopener noreferrer">
          {{ sourceOption.link }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            width="15"
            height="15"
            class="icon outbound"
          >
            <path
              fill="currentColor"
              d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
            />
            <polygon
              fill="currentColor"
              points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
            />
          </svg>
        </a>
      </p>
      <p v-if="sourceOption.source && typeof sourceOption.source == 'string'">来源：{{ sourceOption.source }}</p>
      <p v-if="!sourceOption.source">来源：前端小然子的博客</p>
      <p>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>
    </div>
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";
import AuthorList from "../util/author-list.js";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"],
  computed: {
    sourceOption() {
      return {
        author: this.$page.frontmatter.sourceAuthor
          ? this.$page.frontmatter.sourceAuthor
          : "前端小然子",
        link: this.$page.frontmatter.sourceLink
          ? this.$page.frontmatter.sourceLink
          : this.PageUrl,
        source: this.$page.frontmatter.source
      };
    },
    PageUrl() {
      return "https://xiaoranzife.com" + this.$route.path;
    }
  }
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}
</style>
