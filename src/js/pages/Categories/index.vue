<template lang="html">
  <div>
    <category-post />
    <category-list
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
        delete: false,
      },
    };
  },
  created() {
    this.categories = [{ id: 1, name: 'hoge' }];
  },
};
</script>
