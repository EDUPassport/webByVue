<template>
    <div>
        <el-dialog :model-value="mapDialogLoading"
                   width="auto"
                   center
                   custom-class="event-xll-dialog"
                   :show-close="false"
                   :before-close="beforeClose">

            <div class="event-dialog-container" v-if="info">
                <div class="event-dialog-l">
                    <el-image class="event-dialog-l-img" fit="cover" :preview-src-list="[info.file]"
                              :src="info.file != '' ? info.file : ''">
                    </el-image>
                </div>
                <div class="event-dialog-r">
                    <div class="event-dialog-close-container">
                        <el-icon class="event-dialog-close-icon" @click="close()" :size="20">
                            <CloseBold/>
                        </el-icon>
                    </div>
                    <el-scrollbar always class="event-dialog-r-bg">
                        <div class="event-dialog-r-1">
                            {{ info.company_name }}
                        </div>
                        <div class="event-dialog-r-2">
                            {{ info.location }}
                        </div>
                        <div class="event-dialog-r-3">
                            {{ $filters.ymdFormatEvent(info.date) }},
                            {{ $filters.timeFormatEvent(info.start_time, info.end_time) }}
                        </div>
                        <div class="event-dialog-r-4">
                            {{ info.name }}
                        </div>
                        <el-scrollbar class="event-dialog-r-5" max-height="120px" always>
                            {{ info.desc }}
                        </el-scrollbar>
                        <div class="event-dialog-r-lc" v-if="info.type_desc">
                            <div class="event-dialog-r-lc-label">
                                For EDU Passport members
                            </div>
                            <el-scrollbar class="event-dialog-r-lc-type-desc" max-height="70px" always>
                                {{ info.type_desc }}
                            </el-scrollbar>
                        </div>
                        <div class="event-dialog-r-lc" v-if="info.pay_money">
                            <div class="event-dialog-r-lc-label">Price</div>
                            <div class="event-dialog-r-lc-content">
                                {{ info.currency }} {{ info.pay_money }}
                            </div>
                        </div>
                        <div class="event-dialog-r-btn-container">

                            <el-button link @click="showBookEvent(info)">
                                <el-icon :size="20">
                                    <CollectionTag/>
                                </el-icon>
                                RSVP
                            </el-button>
                        </div>
                    </el-scrollbar>

                    <div class="event-dialog-r-b">
                        <div class="event-dialog-r-b-l">
                            <el-space :size="5" wrap spacer="·">
                                <span v-if="info.company_category_name">{{ info.company_category_name }}</span>
                                <span v-if="info.is_online == 1">online</span>
                                <span v-if="info.is_online == 2">offline</span>
                                <span v-if="info.is_online == 3">both</span>
                                <span v-if="info.is_online == 2 || info.is_online == 3">
                  <el-icon :size="20" style="cursor: pointer" color="#9173ff" @click="showMap(info.lng, info.lat)">
                    <IconMaterialSymbolsMap/>
                  </el-icon>
                </span>
                            </el-space>
                        </div>
                        <div class="event-dialog-r-b-r">
                            Posted by: <span>{{ info.company_name }}</span>
                        </div>
                    </div>

                </div>
            </div>
        </el-dialog>

        <el-dialog v-model="mapDialogVisible" width="auto" center :show-close="false"
                   :before-close="beforeMapDialogClose">
            <div class="map-container" v-loading="mapDialogLoading">
                <div class="event-dialog-close-container">
                    <el-icon class="event-dialog-close-icon" @click="beforeMapDialogClose()" :size="20">
                        <CloseBold/>
                    </el-icon>
                </div>
                <div id="mapContainer" class="basemap"></div>
            </div>

        </el-dialog>

        <bookEventForm :visible="bookEventDialogVisible"
                       :info="eventDetailData"
                       @close="bookEventDialogVisible=false">
        </bookEventForm>

    </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {EVENT_DETAIL, USER_BROWSING_HISTORY_ADD} from "@/api/api";
import BookEventForm from "@/components/bookEventForm.vue";

export default {
    name: "EventDetailInfo",
    components: {BookEventForm},
    setup() {
        const bookEventDialogVisible = ref(false)
        const eventDetailData = ref({})
        const mapDialogVisible = ref(false)
        const mapDialogLoading = ref(false)
        const info = ref([])
        const route = useRoute()
        const router = useRouter()
        const accessToken = process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN
        const mapStyle = process.env.VUE_APP_MAP_BOX_STYLE

        function initMap(lng, lat) {
            mapboxgl.accessToken = accessToken;

            const map = new mapboxgl.Map({
                container: "mapContainer",
                center: [lng, lat],
                style: mapStyle,
                zoom: 12
            });
            const nav = new mapboxgl.NavigationControl();
            map.addControl(nav, "top-right");

            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            });

            map.addControl(geolocate, "top-right")

            const geocoder = new MapboxGeocoder({
                "accessToken": accessToken,
                "mapboxgl": mapboxgl
            })

            map.addControl(geocoder, 'top-left')
            const marker = new mapboxgl.Marker()
            marker.setLngLat([lng, lat]).addTo(map)

        }

        function showMap(lng, lat) {
            mapDialogVisible.value = true;
            mapDialogLoading.value = true;
            setTimeout(function () {
                initMap(lng, lat)
                mapDialogLoading.value = false;
            }, 2000)

        }

        function beforeMapDialogClose() {
            mapDialogVisible.value = false;
            mapDialogLoading.value = false;
        }

        function  addUserBrowsingHistory(id){
            let params = {
                type:3,
                type_id:id
            }
            USER_BROWSING_HISTORY_ADD(params).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })

        }

        function showBookEvent(info){

            addUserBrowsingHistory(info.id)

            if(info.online_url){
                window.open(info.online_url,'_blank')
            }else{
                eventDetailData.value = info
                bookEventDialogVisible.value = true
            }

        }

        onMounted(() => {
            let params = {
                event_id: route.query.event_id
            }

            EVENT_DETAIL(params).then(res => {
                info.value = res.message;
                mapDialogLoading.value = true;
            }).catch(err => {
                    console.log(err)
                    router.push('/noFound')
                }
            )
        })

        return {
            mapDialogLoading,
            mapDialogVisible,
            info,
            showMap,
            beforeMapDialogClose,
            bookEventDialogVisible,
            eventDetailData,
            addUserBrowsingHistory,
            showBookEvent
        }
    },
    methods: {
        close() {
            this.mapDialogLoading = false
            this.$router.push('/events')
        },
        beforeClose(done) {
            done()
        },


    }

}
</script>

<style scoped>

.event-dialog-container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;

    background-color: #FFFFFF;
    box-shadow: 0 3px 10px #0000001A;

    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;

    width: 1038px;
    height: 720px;
    margin: 0 auto;

}

.event-dialog-l {
    width: 480px;
}

.event-dialog-l-img {
    width: 100%;
    height: 100%;
}

.event-dialog-r {
    width: 558px;
    position: relative;
}

.event-dialog-close-container {
    text-align: right;
    padding: 15px 25px 0 0;

}

.event-dialog-close-icon {
    cursor: pointer;
}

.event-dialog-r-bg {
    padding-left: 25px;
    padding-right: 25px;

    height: 590px;
}

.event-dialog-r-1 {
    font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: #262626;
}

.event-dialog-r-2 {
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #262626;
    margin-top: 10px;
    word-break: break-word;
}

.event-dialog-r-3 {
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #262626;
    margin-top: 10px;
}

.event-dialog-r-4 {
    font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 30px;
    color: #262626;
    margin-top: 25px;
    word-break: break-word;

}

.event-dialog-r-5 {
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #262626;
    margin-top: 10px;

    word-break: break-word;
    /*height: 70px;*/
}

.event-dialog-r-lc {
    margin-top: 25px;
}

.event-dialog-r-lc-label {
    font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: #262626;
}

.event-dialog-r-lc-type-desc {
    margin-top: 10px;
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #262626;
    word-break: break-word;
    /*height: 70px;*/

}

.event-dialog-r-lc-content {
    margin-top: 10px;
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #262626;
}

.event-dialog-r-btn-1-container {
    margin-top: 25px;
}

.event-dialog-r-btn-container {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.event-dialog-r-btn-container span {
    font-size: 20px;
    font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    color: #262626;
    margin-left: 10px;
    cursor: pointer;
}

.event-dialog-r-btn-container span:hover {
    color: #808080;

}

.event-dialog-r-btn {
}

.event-dialog-r-b {

    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #262626;
    padding: 15px 25px;
    height: 50px;

    background-color: #FFFFFF;
    border-bottom-right-radius: 40px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.event-dialog-r-b-l {
}

.event-dialog-r-b-r {
}

.event-dialog-r-b-r span {
    font-family: BCM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: #262626;
}

/deep/ .el-overlay {
    background-color: rgba(0, 0, 0, 0.9);
}

.map-container {
    width: 1038px;
    height: 720px;
    margin: 0 auto;
    background-color: #FFFFFF;
    border-radius: 10px;
}

#mapContainer {
    height: 720px;
}

@media screen and (max-width: 768px) {
    .map-container {
        width: 100%;
        height: auto;
    }

    #mapContainer {
        height: 400px;
    }

    .event-dialog-container {
        width: 100%;
        flex-direction: column;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-radius: 20px;
        overflow: hidden;
        align-items: flex-start;
        justify-content: flex-start;
        height: auto;
    }

    .event-dialog-r-bg {
        height: auto;
        padding-left: 15px;
        padding-right: 15px;
    }

    .event-dialog-l {
        width: 100%;
        height: 140px;
    }

    .event-dialog-r {
        width: 100%;
    }

    .event-dialog-close-container {
        padding: 15px 15px 0 0;
    }

    .event-dialog-r-1 {
        font-size: 14px;
    }

    .event-dialog-r-2 {
        font-size: 14px;
    }

    .event-dialog-r-3 {
        font-size: 12px;
    }

    .event-dialog-r-4 {
        font-size: 18px;
        margin-top: 15px;
    }

    .event-dialog-r-5 {
        font-size: 12px;
        height: 60px;
    }

    .event-dialog-r-lc {
        margin-top: 15px;
    }

    .event-dialog-r-lc-label {
        font-size: 14px;
    }

    .event-dialog-r-lc-type-desc {
        font-size: 12px;
        height: 60px;
    }

    .event-dialog-r-btn-container {
        margin-top: 15px;
    }


    .event-dialog-r-b {
        font-size: 12px;
        bottom: 0;
        padding: 0;
        position: unset;
        margin: 15px;
        flex-direction: column;
        align-items: flex-start;
    }

}
</style>