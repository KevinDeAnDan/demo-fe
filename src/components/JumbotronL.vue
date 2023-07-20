<template>
  <div class="container-fluid ">
  <div>
    <div>
      <div v-for="(item, index) in items" :key="index">
        <div @click="toggleItem(index)" class="li" href="">{{ index + 1}}
        </div>
        <div v-if="item" class="li-child">
          Check
        <check-pt></check-pt>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
// import { MessageOutlined } from '@ant-design/icons-vue';
import CheckPt from './CheckPt.vue';
export default {
  components: { 
    CheckPt,
   },
  name: 'JumbotronL',
  data() {
    return {
      items: [false, false, false,false, false, false,false, false, false,false], // Mảng lưu trạng thái ẩn hiện của các "li"
    };
  },
  methods: {
    toggleItem(index) {
      // Đảo ngược giá trị của "li" hiện tại khi click vào
      this.items[index] = !this.items[index];
      
      // Ẩn tất cả các "li" khác
      for (let i = 0; i < this.items.length; i++) {
        if (i !== index) {
          this.items[i] = false;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.li {
  background-color: #9a989b;
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
}
.container-fluid{
  padding: 0 0;
}
/* .li-child {
  padding: 90px;
} */
</style>