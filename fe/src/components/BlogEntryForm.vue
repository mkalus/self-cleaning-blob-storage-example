<template>
    <div style="margin-top: 1em">
        <h2 class="subtitle">{{isNew ? 'Create new ' : 'Edit existing'}} Blog Entry</h2>

        <form>
            <b-field label="Title">
                <b-input v-model="value.title" required></b-input>
            </b-field>

            <b-field label="Text">
                <b-input maxlength="200" type="textarea" v-model="value.text"></b-input>
            </b-field>

            <b-button type="is-success" @click="saveEntry">Save</b-button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'blog-entry-form',
    props: {
        // current model
        value: {
            type: Object,
            required: true
        }
    },
    computed: {
        isNew () {
            return !this.value._id;
        }
    },
    methods: {
        saveEntry () {
            this.value.save();
            // emit event
            this.$emit('change', this.value);
        }
    }
};
</script>
