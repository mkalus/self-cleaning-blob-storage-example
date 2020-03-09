<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Manage Your Blog Entries</h1>

      <FeathersVuexFind service="blog-entry" :query="{}" watch="query">
        <section slot-scope="{ items: blogEntries }">
          <b-table :data="blogEntries">
            <template slot-scope="props">
              <b-table-column field="blogEntry.title" label="Title">
                {{ props.row.title }}
              </b-table-column>
              <b-table-column field="blogEntry.text" label="Text">
                {{ props.row.text }}
              </b-table-column>
              <b-table-column field="blogEntry.text" label="Images">
                {{ props.row.images.length }}
              </b-table-column>
              <b-table-column field="blogEntry.text" label="Attachment">
                {{ props.row.images.attachment ? 'yes' : 'no' }}
              </b-table-column>
              <b-table-column>
                <div class="field has-addons">
                  <p class="control">
                    <b-button icon-left="pencil" type="is-info" @click="editBlogEntry(props.row)">Edit</b-button>
                  </p>
                  <p class="control">
                    <b-button icon-left="delete" type="is-danger" @click="deleteBlogEntry(props.row)">Delete</b-button>
                  </p>
                </div>
              </b-table-column>
            </template>
          </b-table>
        </section>
      </FeathersVuexFind>

      <b-button icon-right="plus" type="is-primary" @click="addNewBlogEntry">Create new Entry</b-button>

      <blog-entry-form v-if="currentBlogEntry" v-model="currentBlogEntry" @change="blogEntryChanged" />
    </div>
  </section>
</template>

<script>
  import BlogEntryForm from "./components/BlogEntryForm";
  import {FeathersVuexFind} from 'feathers-vuex';

  export default {
  components: {BlogEntryForm, FeathersVuexFind},
  data: () => ({
    currentBlogEntry: undefined // current entry in form
  }),
  methods: {
    /**
     * create new blog entry instance
     */
    addNewBlogEntry () {
      const { BlogEntry } = this.$FeathersVuex.api;
      this.currentBlogEntry = new BlogEntry();
    },
    /**
     * called, when blog entry changes
     */
    blogEntryChanged () {
      // close form
      this.currentBlogEntry = undefined;
      this.$buefy.toast.open('Entry saved.');
    },
    editBlogEntry (blogEntry) {
      this.currentBlogEntry = blogEntry;
    },
    deleteBlogEntry (blogEntry) {
      this.$buefy.dialog.confirm({
        message: 'Really delete ' + blogEntry.title,
        onConfirm: () => {
          blogEntry.remove();
          this.$buefy.toast.open('Entry deleted.');
        }
      });
    }
  }
};
</script>
