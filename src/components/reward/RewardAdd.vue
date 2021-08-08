<template>
    <div class="mb-4" id="flex-content">
        <modal name="add" :width="500" :height="650" :adaptive="true">
            <form class="container mt-3" v-on:submit.prevent="onAdd">
                <div class="mb-3 col-9 mx-auto">
                    <label class="form-label">Name of New Reward</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="addRewardForm.name"
                        placeholder="Enter Name (text)"
                    />
                </div>
                <div class="mb-3 col-9 mx-auto">
                    <label class="form-label">Amount of Point to Redeem it</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="addRewardForm.point"
                        placeholder="Enter Point (number)"
                    />
                </div>
                <div class="mb-3 col-9 mx-auto">
                    <label class="form-label">amount of Stock of Reward</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="addRewardForm.stock"
                        placeholder="Enter Stock (number)"
                    />
                </div>
                <div class="ml-2 col-9 mx-auto mt-4">
                    <div id="msg"></div>
                    <div class="input-group my-3">
                        <input
                            type="file"
                            id="img"
                            ref="img"
                            class="file"
                            accept="image/*"
                            @change="uploadImageFinish"
                        />
                        <input
                            type="text"
                            class="form-control"
                            disabled
                            placeholder="Upload File"
                            id="file"
                            :value="imageName"
                        />
                        <div class="input-group-append">
                            <button
                                type="button"
                                class="browse btn btn-primary"
                                @click="uploadImage"
                            >
                                Browse...
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ml-2 col-6 mx-auto mb-3">
                    <img
                        src="https://via.placeholder.com/250x250"
                        ref="preview"
                        class="img-thumbnail"
                    />
                </div>
            </form>
            <button class="btn btn-success d-inline w-25 mx-5" @click="onAdd">Add</button>
            <button class="btn btn-danger d-inline w-25 mx-5" @click="onCancel">Cancel</button>
        </modal>
        <button class="w-100 h-100 btn btn-outline-dark" id="add-button" @click="showAdd">
            <svg width="100" height="500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
            </svg>
        </button>
    </div>
</template>

<script>
import ShopStore from '@/store/Shop';

export default {
    name: 'RewardAdd',

    data() {
        return {
            imageName: '',
            addRewardForm: {
                name: '',
                point: '',
                stock: '',
                image: '',
            },
            uploadedImage: '',
            newReward: '',
        };
    },
    methods: {
        update() {
            this.$emit('send', 'update sent from RewardAdd');
        },
        showAdd() {
            this.$modal.show('add');
        },

        hideAdd() {
            this.$modal.hide('add');
        },

        uploadImage() {
            this.$refs.img.click();
        },

        uploadImageFinish(event) {
            const file = event.target.files[0];
            this.imageName = file.name;
            var reader = new FileReader();
            const self = this;
            reader.onload = function(event) {
                // get loaded data and render thumbnail.
                self.setImage(event);
            };
            // read the image file as a data URL.
            reader.readAsDataURL(file);
            this.addRewardForm.image = file;
            console.log(file);
        },

        setImage(event) {
            this.$refs.preview.src = event.target.result;
        },

        async createNewReward(body) {
            // console.log('What the fuck');
            // console.log(body.image);
            await ShopStore.dispatch('uploadImage', body.image);
            // console.log('test', this.uploadedImage);
            this.uploadedImage = ShopStore.getters.getNewImage;
            // console.log('test', this.uploadedImage);
            body.image = this.uploadedImage;

            //check if Image really uploaded
            if (this.uploadedImage) {
                await ShopStore.dispatch('addReward', body);
                this.newReward = ShopStore.getters.getNewReward;
            } else {
                console.error('upload image fail');
            }
        },

        async onAdd() {
            if (this.checkInput()) {
                try {
                    await this.createNewReward(this.addRewardForm);
                    this.$swal('Add success', '', 'success').then(() => this.update());
                    this.resetForm();
                    this.hideAdd();
                } catch {
                    this.$swal('Something went wrong Sorry', '', 'error');
                }
            } else {
                this.$swal('Invalid input', '', 'error');
            }
        },

        onCancel() {
            this.resetForm();
            this.$swal('You cancel add new reward', '', 'error');
            this.hideAdd();
        },

        resetForm() {
            this.addRewardForm = {
                name: '',
                point: '',
                stock: '',
                image: '',
            };
            this.imageName = '';
            this.uploadedImage = '';
        },

        checkInput() {
            const name = this.addRewardForm.name;
            const point = this.addRewardForm.point;
            const stock = this.addRewardForm.stock;
            const image = this.addRewardForm.image;

            return (
                name !== '' &&
                point !== '' &&
                parseFloat(point) &&
                point >= 0 &&
                stock !== '' &&
                parseFloat(stock) &&
                stock >= 0 &&
                image !== ''
            );
        },
    },
};
</script>
<style lang="scss" scoped>
#flex-content {
    position: relative;
    width: 29%;
    display: flex;
    margin-left: 4%;
    text-align: center;
    font-family: 'Questrial', sans-serif;
}

#add-button:hover {
    background-color: white;
}

.file {
    visibility: hidden;
    position: absolute;
}
</style>
