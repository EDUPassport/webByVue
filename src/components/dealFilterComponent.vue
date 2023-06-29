<template>
    <div class="container">

        <div class="filter-bg-container">

            <el-scrollbar class="filter-bg">
                <div class="filter-container">
                    <div class="filter-t">
                        <span>Filter</span>
                        <el-button link @click="clearAll()">Clear all</el-button>
                    </div>
                    <div class="filter-b">

                        <div class="filter-item">
                            <div class="filter-label">Date Range</div>
                            <div class="filter-c">
                                <el-select
                                        style="width: 100%;"
                                        size="small"
                                        v-model="datePosted"
                                        clearable
                                        filterable
                                        placeholder="Anytime"
                                        @change="datePostedChange"
                                >
                                    <el-option
                                            v-for="item in datePostedOptions"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">

                                    </el-option>

                                </el-select>
                            </div>
                        </div>

                        <div class="filter-item">
                            <div class="filter-label">Location</div>
                            <div class="filter-c">
                                <el-select class="filter-select"
                                           v-model="locationValue"
                                           size="small"
                                           filterable
                                           clearable
                                           placeholder="Search Location"
                                           @change="locationChange"
                                >
                                    <el-option
                                            v-for="item in locationOptions"
                                            :key="item.id"
                                            :label="item.Pinyin"
                                            :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                                <el-checkbox @change="selectIsOnline" v-model="filterIsOnlineValue" label="Online(Virtual\Digital)"/>
                            </div>
                        </div>

                        <div class="filter-item">
                            <div class="filter-label">Deal Category</div>
                            <div class="filter-c">
                                <el-checkbox-group
                                    @change="dealCategoryChange"
                                    v-model="checkedCateData"
                                    :max="1">
                                    <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                        <div v-for="(item,i) in subCateOptions" :key="i" style="flex-basis: 100%;">
                                            <el-checkbox :label="item.id">
                                                {{ item.identity_name }}
                                            </el-checkbox>
                                        </div>
                                    </div>
                                </el-checkbox-group>
                            </div>
                        </div>

                        <div class="filter-item">
                            <div class="filter-label">Tags</div>
                            <div class="filter-c">
                                <el-select class="filter-select"
                                           v-model="tagValue"
                                           clearable
                                           multiple
                                           placeholder="Tags"
                                           size="small"
                                           @change="tagChange"
                                >
                                    <el-option
                                        v-for="item in tagsOptions"
                                        :key="item.id"
                                        :label="item.name_en"
                                        :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>

                    </div>

                </div>

            </el-scrollbar>

        </div>

    </div>
</template>

<script setup>
import {defineProps, defineEmits, ref, onMounted} from 'vue'
import {DEALS_AREA_LIST, TAGS_LIST, USER_SUB_IDENTITY_V2} from "@/api/api";

defineProps(['identity'])
const emit = defineEmits(['search'])

const tagsOptions = ref([])
const subCateOptions = ref([])
const locationOptions = ref([])

const locationValue = ref('')
const filterIsOnlineValue = ref(false)
const onlineValue = ref(-1)
const tagValue = ref([])
const checkedCateData = ref([])
const datePosted = ref(0)

const datePostedOptions = ref([
    {
        name:'Anytime',
        value:0
    },
    {
        name:'7 Days',
        value: 7
    },
    {
        name:'14 Days',
        value: 14
    },
    {
        name:'21 Days',
        value: 21
    },
    {
        name:'30 Days',
        value: 30
    }
])

const locationChange = ()=> {
    search()
}
const datePostedChange = ()=>{
    search()
}

const selectIsOnline = (e)=> {
    if (e) {
        onlineValue.value = 1
    } else {
        onlineValue.value = 0
    }
    search()
}

const tagChange = ()=> {
    search()
}
const dealCategoryChange = ()=> {
    search()
}

const search = ()=> {

    let params = {}

    if (locationValue.value) {
        params.city = locationValue.value
    }

    if (onlineValue.value) {
        params.is_online = onlineValue.value
    }

    if (tagValue.value.length > 0) {
        params.tag_name = tagValue.value
    }

    if (checkedCateData.value.length > 0) {
        params.company_category_id = checkedCateData.value[0]
    }

    emit('search', params)

}

const clearAll = ()=>{
    locationValue.value = ''
    onlineValue.value = -1
    tagValue.value = []
    checkedCateData.value = []
    search()
}

const getTagsList = ()=> {
    let params = {
        page: 1,
        limit: 1000
    }
    TAGS_LIST(params).then(res => {
        if (res.code == 200) {
            tagsOptions.value = res.message.data;
        }
    }).catch(err => {
        console.log(err)
    })
}

const getSubIdentityList = ()=> {
    let params = {
        pid: 5,
        tree: 1
    }

    USER_SUB_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            subCateOptions.value = res.message
        }
    }).catch(err => {
        console.log(err)
    })
}

const getDealsAreaList = ()=> {

    DEALS_AREA_LIST({}).then(res => {
        console.log(res)
        if (res.code == 200) {
            locationOptions.value = res.message
        }
    }).catch(err => {
        console.log(err)
    })
}

onMounted(()=>{
    getDealsAreaList()
    getSubIdentityList()
    getTagsList()
})

</script>

<style scoped>
:deep(.el-checkbox__label) {
    font-size: 11px;
}

.container {
    width: 100%;
}

.filter-container {
    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 11px;
}

.filter-t {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid #D0D5DD;
    padding: 0 20px;
}

.filter-t span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
}

.filter-b {
    padding: 16px 16px 0 16px;
}

.filter-item {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #D0D5DD;
}

.filter-item:last-child {
    border: none;
}

.filter-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #344054;

}

.filter-select {
    width: 100%;
}

@media screen and (min-width: 769px) {

}

@media screen and (max-width: 768px) {

}
</style>