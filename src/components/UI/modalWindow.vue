<script setup>
import { defineProps } from 'vue';

defineProps({
    show: {
        type: Boolean,
        default: false
    }
})

</script>



<template>

    <main v-if="show" @click="$emit('update:show', false)">
        <div @click.stop>
            <slot></slot>
        </div>
    </main>

</template>

<style lang="scss" scoped>
main {
    cursor: pointer;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    filter: drop-shadow(5px 5px 10px #000);

    div {
        margin: auto;
        background-color: white;
        width: 600px;
        height: 250px;
        border-radius: 12px;
        background-color: #352f5b;
        padding: 20px;
    }

    button {
        background: inherit;
        border: none;
        cursor: pointer;
        position: fixed;
        top: 0;
        right: 0;
        margin: 12px;
    }
}
</style>