<template lang="html">
  <div class="category-area">
    <category-post
      class="category-post"
      :access="access"
    />
    <category-list
      class="category-list"
      :theads="theads"
      :categories="categories"
      :delete-category-name="deleteCategoryName"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    CategoryList,
    CategoryPost,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
      categories: [],
      deleteCategoryName: 'hogehoge',
      access: {
        delete: true,
        create: true,
      },
    };
  },
  created() {
    this.categories = [{ id: 1, name: 'hoge' }];
  },
};
</script>

<style scoped>
  .category-area {
    display: flex;
    height: 87vh;
  }

  .category-post {
    width: 40%;
    border-right: 1px solid #ccc;
    padding-right: 2%;
  }

  .category-list {
    width: 60%;
    margin-left: 2%;
  }
</style>
