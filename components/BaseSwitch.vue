<template>
  <div
    class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate"
    :class="switchClass"
  >
    <div class="bootstrap-switch-container" @click="triggerToggle()">
      <span class="bootstrap-switch-handle-on">
        <slot name="on">{{ onText }}</slot>
      </span>
      <span class="bootstrap-switch-label"></span>
      <span class="bootstrap-switch-handle-off bootstrap-switch-default">
        <slot name="off">{{ offText }}</slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-switch',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    onText: {
      type: String,
      default: 'On'
    },
    offText: {
      type: String,
      default: 'Off'
    }
  },
  computed: {
    switchClass() {
      return this.value ? 'bootstrap-switch-on' : 'bootstrap-switch-off';
    }
  },
  methods: {
    triggerToggle() {
      this.$emit('input', !this.value);
    }
  }
};
</script>

<style>
.bootstrap-switch {
  /* Estilos base del interruptor */
}

.bootstrap-switch.bootstrap-switch-on {
  /* Estilos cuando el interruptor está encendido */
}

.bootstrap-switch.bootstrap-switch-off {
  /* Estilos cuando el interruptor está apagado */
}
</style>
