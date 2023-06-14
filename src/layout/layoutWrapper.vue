// LayoutWrapper.vue
<template>
    <component :is="layout">
        <slot></slot>
    </component>
</template>

<script>
import DashboardLayout from './dashboardLayout.vue'
import Layout from './index.vue'

export default {
    components: {
        DashboardLayout,
        Layout
    },
    computed: {
        layout() {
            // replace this with your actual logic to check if the user is logged in
            const isLoggedIn = localStorage.getItem('token') ? true : false
            return isLoggedIn ? 'DashboardLayout' : 'Layout'
        }
    }
}
</script>
