<template>
  <div>
    <iframe
      id="hireflix"
      name="hireflix"
      src="https://admin.hireflix.com/es/jobs"
      :height="altura"
      :width="anchura"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      altura: null,
      anchura: null,
    };
  },
  methods: {},
  created() {
    this.altura = screen.height - 200;
    this.anchura = screen.width - 40;
  },
};
</script>
