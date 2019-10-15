<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <img v-if="heroImage" :src="$withBase(heroImage)" :alt="heroAlt || 'hero'" />

      <h1 v-if="heroText !== null" id="main-title">{{ heroText || $title || 'Hello' }}</h1>

      <p class="description">{{ tagline || $description || 'Welcome to your VuePress site' }}</p>

      <p class="action" v-if="actionText && actionLink">
        <NavLink class="action-button" :item="actionLink" />
      </p>
    </header>

    <div class="features" v-if="features && features.length">
      <div class="feature" v-for="(feature, index) in features" :key="index">
        <h2>{{ feature.title }}</h2>
        <p v-for="(details, index) in feature.details" :key="index">{{ details }}</p>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div class="footer" v-if="footerContent">{{ footerContent }}</div>
  </main>
</template>

<script>
import NavLink from "./NavLink.vue";

export default {
  components: { NavLink },
  data() {
    return {
      heroImage: "/images/xiaoer.png",
      heroAlt: "客官里面请～",
      heroText: "",
      tagline: "",
      actionText: "贵宾一位 →",
      actionLinks: "/guide/",
      features: [
        // {
        //   title: "任君挑选",
        //   details: ["本店有各大菜系", "都是由上好的材料制作而成"]
        // },
        // {
        //   title: "二楼雅间",
        //   details: ["雅间更加精致", ""]
        // },
        // {
        //   title: "厨师进阶",
        //   details: ["开源项目", "从最后的起跑线开始，指天求虐。"]
        // }
      ],
      footerContent: "MIT Licensed | Copyright © 2018-present xiaoranzi"
    };
    // this.$page.frontmatter
  },
  computed: {
    actionLink() {
      return {
        link: this.actionLinks,
        text: this.actionText
      };
    }
  }
};
</script>

<style lang="stylus">
.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 280px;
      display: block;
      margin: 1.5rem auto;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    width 100%;
    position: absolute;
    left: 0;
    bottom: 1rem;
    padding: 2rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
    box-sizing: border-box;
    line-height: 1.5em;
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
