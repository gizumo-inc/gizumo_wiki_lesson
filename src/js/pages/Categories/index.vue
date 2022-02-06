<template lang="html">
  <div>
    <category-post />
    <category-list
      :theads="theads"
      :categories="categories"
      :deleteCategoryName="deleteCategoryName"
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
      categories: [
        {
          id: 1,
          name: 'hogehoge',
        },
      ],
      deleteCategoryName: 'hogehoge',
      access: {
        delete: false,
      },
    };
  },
};
</script>
