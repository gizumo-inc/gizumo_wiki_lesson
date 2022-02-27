<template lang="html">
  <div class="category-area">
    <category-post
      class="category-post"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
      :disabled="disabled"
      :category="category"
      @clearMessage="clearMessage"
      @handleSubmit="handleSubmit"
      @updateValue="updateValue"
    />
    <category-list
      class="category-list"
      :theads="theads"
      :categories="categories"
      :delete-category-name="deleteCategoryName"
      :access="access"
      @openModal="openModal"
      @handleClick="handleClick"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    CategoryList,
    CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    disabled() {
      return this.$store.state.categories.loading;
    },
    category() {
      return this.$store.state.categories.category;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      if (this.disabled) return;
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
    updateValue($event) {
      const categoryName = $event.target.value ? $event.target.value : '';
      this.$store.dispatch('categories/udpateValue', categoryName);
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch(
        'categories/confirmDeleteCategory',
        { categoryId, categoryName },
      );
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
      this.toggleModal();
    },
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
