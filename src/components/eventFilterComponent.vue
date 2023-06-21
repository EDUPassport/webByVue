<template>
    <div class="container">

        <div class="filter-bg-container">

            <div class="filter-container">

                <div class="filter-t">
                    <span>Filter</span>
                    <el-button link @click="clearAll()">Clear all</el-button>
                </div>

                <div class="filter-b">

                    <div class="filter-item">
                        <div class="filter-label">Search</div>
                        <div class="filter-c">
                            <el-input
                                v-model="eventName"
                                size="small"
                                placeholder="Search for events name"
                                @input="eventNameChange"
                                @change="eventNameChange"
                            >
                            </el-input>
                        </div>
                    </div>

                    <div class="filter-item">
                        <div class="filter-label">By Date Range</div>
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
                        <div class="filter-label">By Event Format</div>
                        <div class="filter-c">

                            <el-checkbox-group
                                @change="eventFormatChange"
                                v-model="eventFormat">
                                <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                    <div v-for="(item,i) in eventFormatOptions" :key="i" style="flex-basis: 50%;">
                                        <el-checkbox :label="item.value">
                                            {{ item.name }}
                                        </el-checkbox>
                                    </div>
                                </div>

                            </el-checkbox-group>

                        </div>

                    </div>

                    <div class="filter-item">
                        <div class="filter-label">By Event Category</div>
                        <div class="filter-c">

                            <el-checkbox-group
                                @change="eventTypeChange"
                                v-model="checkedCateData">
                                <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                    <div v-for="(item,i) in categoryOptions" :key="i" style="flex-basis: 50%;">
                                        <el-checkbox :label="item.id">
                                            {{ item.name_en }}
                                        </el-checkbox>
                                    </div>
                                </div>

                            </el-checkbox-group>

                        </div>

                    </div>

                    <div class="filter-item">
                        <div class="filter-label">By Event Type</div>
                        <div class="filter-c">

                            <el-checkbox-group
                                @change="tagChange"
                                v-model="tag">
                                <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                    <div v-for="(item,i) in tagsOptions" :key="i" style="flex-basis: 50%;">
                                        <el-checkbox :label="item.id">
                                            {{ item.name_en }}
                                        </el-checkbox>
                                    </div>
                                </div>

                            </el-checkbox-group>

                        </div>

                    </div>

                    <div class="filter-item">
                        <div class="filter-label">Location</div>
                        <div class="filter-c">
                            <el-select class="filter-select"
                                       v-model="location"
                                       filterable
                                       clearable
                                       placeholder="Filter by location"
                                       size="small"
                                       @change="locationChange"
                            >
                                <el-option
                                    v-for="item in locationOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </div>

                    </div>


                </div>

            </div>


        </div>

    </div>
</template>

<script setup>
import {ref, defineProps, defineEmits,onMounted} from 'vue'
import {EVENT_LOCATION_LIST, EVENTS_CATEGORY, TAGS_LIST} from "@/api/api";
import {formatDateYmdHis} from "@/utils/tools";

defineProps(['identity'])

const emit = defineEmits(['search'])

const categoryOptions = ref([])
const locationOptions = ref([])
const tagsOptions = ref([])

const eventName = ref('')
const location = ref('')
const tag = ref([])
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

const eventFormat = ref([])
const eventFormatOptions = ref([
    {
        name:"Online(Virtual/Digital)",
        value:1
    },
    {
        name:"Offline(In-Person)",
        value:2
    }
])

const clearAll = ()=>{
    eventName.value = ''
    datePosted.value = 0
    eventFormat.value = []
    checkedCateData.value = []
    tag.value = []
    location.value = ''
    search()
}

const search = () => {

    let params = {}

    if(eventName.value){
        params.event_name = eventName.value
    }

    if (datePosted.value) {
        let nowDate = new Date()
        nowDate.setDate(nowDate.getDate() - datePosted.value)
        params.c_time = formatDateYmdHis(nowDate)
    }

    // console.log(eventFormat.value)
    if(eventFormat.value && eventFormat.value.length){
        if(eventFormat.value.indexOf(1) !== -1 && eventFormat.value.length === 1){
            params.is_online = 1
        }
    }

    if(checkedCateData.value &&  checkedCateData.value.length > 0) {
        params.category_id = checkedCateData.value[0]
    }

    if (tag.value && tag.value.length > 0) {
        params.tag_name = tag.value
    }

    if (location.value) {
        params.city = location.value
    }
    // console.log(params)
    emit('search', params)

}

const eventNameChange = ()=>{
    search()
}
const datePostedChange = ()=>{
    search()
}

const eventFormatChange = ()=>{
    search()
}

const locationChange = () => {
    search()
}

const tagChange = () => {
    search()
}
const eventTypeChange = () => {
    search()
}

const getEventCategories = () => {

    let eventCategoryStorage = localStorage.getItem('eventCategory')
    if(eventCategoryStorage){
        categoryOptions.value = JSON.parse(eventCategoryStorage)
    }else{
        let params = {
            page: 1,
            limit: 10000
        }
        EVENTS_CATEGORY(params).then(res => {
            if(res.code === 200){
                localStorage.setItem('eventCategory',JSON.stringify(res.message.data))
                categoryOptions.value = res.message.data;
            }

        }).catch(err => {
            console.log(err)
        })
    }

}

const getEventLocationList = () => {
    let eventLocationStorage = localStorage.getItem('eventLocation')
    if(eventLocationStorage){
        locationOptions.value = JSON.parse(eventLocationStorage)
    }else{
        let params = {}
        EVENT_LOCATION_LIST(params).then(res => {
            console.log(res)
            if (res.code == 200) {
                localStorage.setItem('eventLocation', JSON.stringify(res.message))
                locationOptions.value = res.message;
            }
        }).catch(err => {
            console.log(err)
        })
    }

}

const getEventTags = () => {
    let eventTagsStorage = localStorage.getItem('eventTags')
    if(eventTagsStorage){
        tagsOptions.value = JSON.parse(eventTagsStorage)
    }else{
        let params = {
            type: 2,
            page: 1,
            limit: 10000
        }
        TAGS_LIST(params).then(res => {
            if (res.code == 200) {
                localStorage.setItem('eventTags', JSON.stringify(res.message.data))
                tagsOptions.value = res.message.data;
            }
        }).catch(err => {
            console.log(err)
        })
    }

}

onMounted(()=>{
    getEventCategories()
    getEventTags()
    getEventLocationList()
})

</script>

<style scoped>
:deep(.el-checkbox__label){
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

.filter-item:last-child{
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