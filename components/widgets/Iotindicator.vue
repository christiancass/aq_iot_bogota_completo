<template>
    <card>
      <div slot="header">
        <h4 class="card-title">
          {{ config.selectedDevice.name }} - {{ config.variableFullName }}
        </h4>
      </div>
  
      <i
        class="fa "
        :class="[config.icon, getIconColorClass()]"
        style="font-size: 30px"
      ></i>
    </card>
  </template>
  
  <script>
  export default {
    props: ['config'],
    data() {
      return {
        value: false,
        topic: "",
        props: ['config']      
      };
    },
    watch:  {
              config: {
                  immediate: true,
                  deep: true,
                  handler() {
                      setTimeout(() => {
                          this.value = false;
  
                          this.$nuxt.$off(this.topic);
  
                          //userId/dId/uniquestr/sdata
                          const topic = this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata";
                          this.$nuxt.$on(topic, this.processReceivedData);
  
                      }, 300);
                  }
              }
          },
    mounted(){
      const topic = this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata";
      this.$nuxt.$on(topic, this.processReceivedData);
    },
    beforeDestroy(){
      this.$nuxt.$off(this.topic);
    },
    methods: {
  
      processReceivedData(data){
        try {
          console.log("received");
          console.log(data);
          this.value = data.value;
        } catch (error) {
          console.log(error);
        }
      },
        
      getIconColorClass() {
        if (!this.value) {
          return "text-dark";
        }
  
        if (this.config.class == "success") {
          return "text-success";
        }
        if (this.config.class == "primary") {
          return "text-primary";
        }
        if (this.config.class == "warning") {
          return "text-warning";
        }
        if (this.config.class == "danger") {
          return "text-danger";
        }
      }
  
    }
  };
  
  
  </script>