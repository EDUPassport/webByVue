<template>

    <div class="msg-container">
        <el-dialog :model-value="visible"
                   width="400px"
                   :title="title"
                   :before-close="beforeClose"
        >

            <p>{{ description }}</p>


            <template #footer>
                <el-button   type="primary"   @click="close()">
                    OK
                </el-button>

            </template>
        </el-dialog>

    </div>

</template>

<script>

export default {
    name: "successMessage",
    props: ['title', 'description', 'visible'],
    components: {},
    data() {
        return {}
    },
    methods: {
        close() {
            this.$emit('close')
        },
        beforeClose(done) {
            this.$emit('close')
            done()
        },

    }

}
</script>

<style scoped>

.msg-container{
    text-align: left;
}

/deep/ .el-dialog__header{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
}
p {
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #262626;
    word-break: normal;

    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 3;*/
    /*-webkit-box-orient: vertical;*/

}

@media screen and (max-width: 768px) {
}

</style>