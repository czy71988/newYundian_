<template>
   <el-drawer
    title="拾取地址"
    class="drawer-panel"
    size="800"
    :visible.sync="showDrawer"
    direction="rtl"
    :wrapperClosable="false"
    :withHeader="false"
    :before-close="onCloseDrawer">
    <div class="title">选择所在地址</div>
    <el-button type="text" size="medium" icon="el-icon-close" class="close-btn" @click="onCloseDrawer"></el-button>
    <div class="drawer-panel__bd">
      <!-- <div class="row row--title" v-show="selectedAddress.address">
        <p>当前定位位置：{{selectedAddress.address}}</p>
        <p>当前经纬度：{{selectedAddress.location | locationFormatFilter}}</p>
      </div> -->
      <div class="row row--search">
        <el-select class="address-select" v-model="address" filterable remote placeholder="快捷搜索位置" :loading="addressLoading"
          no-data-text="没有搜索到"
          popper-class="address-select-dropdown"
          @change="onAddressSelectChange"
          :remote-method="getSuggestionAddressList">
          <el-option
            v-for="item in suggestionAddressList"
            :key="item.id"
            :label="item.address+ '' + item.title"
            :value="item">
            <div class="row address-item">
              <div class="address-item__title">{{item.title}}</div>
              <div class="address-item__address"> {{item.address}}</div>
            </div>
          </el-option>
        </el-select>
        <el-button class="btn" type="primary" @click="updateMap(selectedAddress.location)">定位</el-button>
        <!-- <el-button class="btn" type="primary" @click="updateMapByResetLocation">重新定位</el-button> -->
      </div>
      <div ref="mapCtn" id="mapContainer" class="map-container"></div>
      <p class="row row--label">{{selectedAddress.address}}</p>
      <p class="row row--label">{{selectedAddress.location | locationFormatFilter}}</p>
      <div class="row row--btn">
        <el-button type="primary" @click="onSure">确认当前位置</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { getLocationByIp, getSuggestionAddressList, getAddressByLatLng } from '@/api/map'
export default {
  filters: {
    locationFormatFilter (val) {
      if (!val) return ''
      return `(${val.lat}，${val.lng})`
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDrawer: true,
      suggestionAddressList: null,
      location: null,
      address: '',
      addressLoading: true,
      currentAddress: '',
      selectedAddress: {}
    }
  },
  created () {
    this.showDrawer = this.value
  },
  mounted () {
    if (this.showDrawer) {
      this.initMap()
    } else {
      this.getLocationByIp()
    }
  },
  watch: {
    showDrawer (val) {
      // this.$emit('input', val)
      // if (val) {
      //   if (this.$refs.mapCtn) {
      //     this.initMap()
      //   } else {
      //     this.$nextTick(() => {
      //       this.$refs.mapCtn && this.initMap()
      //     })
      //   }
      // }
    },
    value (val) {
      this.showDrawer = val
      if (val) {
        if (this.$refs.mapCtn) {
          this.initMap()
        } else {
          this.$nextTick(() => {
            this.$refs.mapCtn && this.initMap()
          })
        }
      }
    }
  },
  methods: {
    // 初始话map
    initMap () {
      if (this.location) {
        this.updateMap(this.location)
      } else {
        this.updateMapByResetLocation()
      }
    },
    onSure () {
      this.showDrawer = false
      this.$emit('input', false)
      this.$emit('ok', this.selectedAddress)
    },
    // 重新定位，更新地图
    updateMapByResetLocation () {
      this.address = ''
      this.getLocationByIp(true)
    },
    // 获取定位信息
    getLocationByIp (synToMap) {
      getLocationByIp().then(data => {
        // 更新当前定位地址
        // 和定位信息
        this.updateCurrentAddressByIp(data.ad_info)
        this.location = data.location
        this.getAddressByLatLng(data.location)
        if (synToMap) {
          this.updateMap(data.location)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    updateCurrentAddressByIp ({ province, city, district }) {
      this.currentAddress = `${province}${province === city ? '' : city}${district}`
    },
    // 获取suggestion地址列表
    getSuggestionAddressList (query) {
      if (query !== '') {
        this.addressLoading = true
        getSuggestionAddressList(query).then(data => {
          this.addressLoading = false
          this.suggestionAddressList = data.data || []
        })
      }
    },
    // 获取地址通过location
    getAddressByLatLng (location) {
      getAddressByLatLng(location).then(data => {
        console.log(data)
        const { formatted_addresses: { recommend }, address_component: { province, city, district } } = data
        // let addresPrefix = `${province}${province.indexOf(city) > -1 ? '' : city}${district}`
        // recommend.indexOf(province) >
        console.log(recommend)
        const address = recommend
        let addressPrefix = ''
        if (address.indexOf(province) < 0) {
          if (address.indexOf(city) < 0) {
            addressPrefix = province.indexOf(city) > -1 ? city : `${province}${city}`
            if (address.indexOf(district) < 0) {
              addressPrefix += district
            }
          }
        }
        this.selectedAddress = {
          address: addressPrefix + address,
          location: data.location
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onCloseDrawer () {
      this.showDrawer = false
      this.$emit('input', false)
    },
    onGetAddressList (query) {
      if (query !== '') {
        this.addressLoading = true
        this.fetchAddressList({ keyword: query }).then(data => {
          this.addressLoading = false
          this.addressLoading = false
          this.addressList = data || []
        }).catch(err => {
          console.log(err)
          this.addressLoading = false
        })
      }
    },
    onAddressSelectChange (item) {
      console.log(item)
      this.address = item.address + item.title
      this.updateMap(item.location)
      this.selectedAddress = {
        address: item.address + item.title,
        location: item.location
      }
      // this.getAddressByLatLng(item.location)
    },
    createMap (location) {
      const center = new TMap.LatLng(location.lat, location.lng)
      const map = new TMap.Map('mapContainer', {
        center: center,
        // mapTypeId: qq.maps.MapTypeId.ROADMAP,
        zoom: 17,
        rotation: 40,
        pitch: 30,
        viewMode: '3D'
      })
      map.on('click', (evt) => {
        // 标记marker
        console.log(evt)
        this.address = ''
        const lat = evt.latLng.lat
        const lng = evt.latLng.lng
        this.updateMarker(map, { lat, lng })
        this.getAddressByLatLng({ lat, lng })
      })
      return map
    },
    updateMap (location) {
      if (!location) return
      let map = this._map
      if (map) {
        const { lat, lng } = location
        // console.log('upsate' + location)
        this.updateMarker(map, { lat, lng })
        map.setCenter(new TMap.LatLng(lat, lng))
        return map
      }
      map = this.createMap(location)
      this._map = map
      const timeId = setTimeout(() => {
        clearTimeout(timeId)
        this.updateMarker(map, location)
      }, 500)
      return map
    },
    updateMarker (map, location) {
      const { lat, lng } = location
      let positon = map.getCenter()
      if (location) {
        positon = new TMap.LatLng(lat, lng)
      }
      let markerLayer = this._markerLayer
      if (markerLayer) {
        markerLayer.updateGeometries([
          {
            id: 'marker1',
            position: positon
          }
        ])
        return markerLayer
      }
      markerLayer = new TMap.MultiMarker({
        id: 'marker-layer', // 图层id
        map: map,
        zoom: 100,
        geometries: [{ // 点标注数据数组
          position: positon,
          id: 'marker1'
        }]
      })
      this._markerLayer = markerLayer
      return markerLayer
    }
  }
}
</script>

<style lang="less" scoped>

.map-container {
  min-width:700px;
  width: 100%;
  height: 50%;
}
.close-btn {
  position: absolute;
  right: 20px;
  top: 10px
}
.drawer-panel {
  width: 100%;
  .title {
    box-sizing: border-box;
    padding-left: 10px;
    padding-top: 20px;
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 30px;
    color:#dedede;
  }
  &__bd {
    box-sizing: border-box;
    padding: 0px 10px;
    height: 100%;
  }
  .row {
    padding-bottom: 10px;
    // padding-top: 1px;
    &--search {
      .btn {
        margin-left: 10px;
      }
    }
    &--title {
      font-size: 14px;
      padding-top: 30px;
      font-weight: 400;
      color:#888;
      padding-top: 40px;
    }
    &--label {
      text-align: center;
      // padding-top: 30px;
      &:nth-of-type(1) {
        padding-top: 30px;
      }
    }
    &--btn {
      text-align: right;
    }
  }
}
.address-select {
  width: 70%;
}
.address-select-dropdown {
  width: 60%;
  color: red;
  .el-select-dropdown__item {
    height: auto;
    &:last-of-type {
      .address-item {
        border-bottom: none;
      }
    }
  }
  .address-item {
    padding-bottom: 5px;
    border-bottom: 1px solid #dedede;
    &__address {
      line-height: 24px;
    }
    &__title {
      font-size: 12px;
      color: #888;
      line-height: 16px;
    }
  }
}
@media screen and (max-width: 700) {
  .map-container {
    width: 100%;
  }
}
</style>
