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

            <p><strong>Images</strong></p>

            <div style="margin-bottom: 1em" v-if="value.images">
                <div class="card" v-for="(image, idx) of value.images" :key="image" style="width: 200px; display: inline-block">
                    <div class="card-image">
                        <figure class="image" style="width: 200px; height: auto">
                            <img :src="'http://localhost:3030/blobs/' + image" alt="Placeholder image">
                        </figure>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item" @click.prevent="deleteImage(idx)">Delete</a>
                    </footer>
                </div>
            </div>

            <b-field>
                <b-upload drag-drop accept="image/*" @input="imageAdded" :loading="uploadingImage">
                    <section class="section">
                        <div class="content has-text-centered">
                            <p>
                                <b-icon icon="plus" size="is-large"/>
                            </p>
                            <p>Add image</p>
                        </div>
                    </section>
                </b-upload>
            </b-field>

            <b-field v-if="!value.attachment" label="Attachment file">
                <b-upload drag-drop @input="attachmentAdded" :loading="uploadingAttachment">
                    <section class="section">
                        <div class="content has-text-centered">
                            <p>
                                <b-icon icon="plus" size="is-large"/>
                            </p>
                            <p>Upload attachment file</p>
                        </div>
                    </section>
                </b-upload>
            </b-field>
            <div v-else>
                <p style="margin-bottom: 1em">
                    <b-button type="is-info" icon-right="download" tag="a" :href="'http://localhost:3030/blobs/' + value.attachment">Download Attachment</b-button>
                    <b-button type="is-danger" icon-right="delete" style="margin-left: 0.5em" @click.prevent="value.attachment = ''">Delete Attachment</b-button>
                </p>
            </div>


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
    data: () => ({
        uploadingImage: false,
        uploadingAttachment: false
    }),
    computed: {
        isNew () {
            return !this.value._id;
        }
    },
    methods: {
        /**
         * save the entry to db
         */
        async saveEntry () {
            try {
                await this.value.save();
                // emit event
                this.$emit('change', this.value);
            } catch (e) {
                this.$buefy.toast.open({ message: 'Error on save:' + e, type: 'is-danger', duration: 5000 });
            }
        },
        /**
         * event - image added
         */
        imageAdded (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            const me = this;
            me.uploadingImage = true;

            // upload finished...
            reader.onload = () => {
                // upload file to service
                this.$store.dispatch('uploads/create', { uri: reader.result }).then((response) => {
                    this.value.images.push(response.id);
                }).catch((err) => {
                    console.log(err);
                    this.$buefy.toast.open({ message: 'Upload failed - see console.log!', type: 'is-danger', duration: 5000 });
                });

                me.uploadingImage = false;
            };
        },
        /**
         * event - attachment added
         */
        attachmentAdded (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            const me = this;
            me.uploadingAttachment = true;

            // upload finished...
            reader.onload = () => {
                // upload file to service
                this.$store.dispatch('uploads/create', { uri: reader.result }).then((response) => {
                    this.value.attachment = response.id;
                }).catch((err) => {
                    console.log(err);
                    this.$buefy.toast.open({ message: 'Upload failed - see console.log!', type: 'is-danger', duration: 5000 });
                });

                me.uploadingAttachment = false;
            };
        },
        /**
         * delete image by index
         */
        deleteImage (idx) {
            this.value.images.splice(idx, 1);
            // this.$emit('change', this.value);
        }
    }
};
</script>
