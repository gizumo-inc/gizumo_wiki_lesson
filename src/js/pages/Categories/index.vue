<template lang="html">
  <div>
    <category-post />
    <category-list />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    CategoryList,
    CategoryPost,
  },
};
</script>
